import { useEffect, useRef } from "react";

/**
 * HeroStrings
 * A set of glowing "guitar strings" stretched across the hero section.
 * They idle with a subtle shimmer and physically vibrate when plucked —
 * by the cursor crossing them, a click/tap, or a gentle auto-strum.
 *
 * Pure canvas, no deps. Respects prefers-reduced-motion.
 */

const STRING_COUNT = 6;

class GuitarString {
  index: number;
  phase = Math.random() * Math.PI * 2;
  energy = 0;
  impulseX = 0.72;
  waveAge = 0;
  lastPointerPluckAt = -Infinity;
  direction: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
  frequency: number;
  decay: number;
  baseAlpha: number;
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  thickness = 1;

  constructor(index: number) {
    this.index = index;
    this.frequency = 2 + index * 0.24;
    this.decay = 4.4 + index * 0.14;
    this.baseAlpha = 0.16 + index * 0.022;
  }

  setGeometry(width: number, height: number) {
    const mobile = width < 720;

    // All strings share one direction (truly parallel, like a real set of
    // strings) and are only offset sideways from a shared centerline —
    // never fanned or converged. This is also what makes pointer-crossing
    // detection work consistently everywhere, not just near the edges.
    const angleDeg = mobile ? 32 : 22; // degrees up from horizontal
    const rad = (angleDeg * Math.PI) / 180;
    const dirX = Math.cos(rad);
    const dirY = -Math.sin(rad); // travels up-and-right
    const perpX = Math.sin(rad);
    const perpY = Math.cos(rad);

    // Anchor the bundle over the right side of the hero (where the vinyl
    // used to sit) rather than spanning edge-to-edge horizontally.
    const anchorX = width * (mobile ? 0.56 : 0.64);
    const anchorY = height * (mobile ? 0.5 : 0.48);

    const gap = mobile ? Math.max(26, width * 0.085) : Math.max(46, Math.min(78, width * 0.05));
    const offset = (this.index - (STRING_COUNT - 1) / 2) * gap;
    const px = anchorX + perpX * offset;
    const py = anchorY + perpY * offset;

    // Clip the infinite line to a slightly-overscanned viewport rect so
    // every string still spans corner-to-corner regardless of its offset.
    const xmin = -width * 0.1;
    const xmax = width * 1.1;
    const ymin = -height * 0.14;
    const ymax = height * 1.18;

    const sx1 = (xmin - px) / dirX;
    const sx2 = (xmax - px) / dirX;
    const sxlo = Math.min(sx1, sx2);
    const sxhi = Math.max(sx1, sx2);
    const sy1 = (ymin - py) / dirY;
    const sy2 = (ymax - py) / dirY;
    const sylo = Math.min(sy1, sy2);
    const syhi = Math.max(sy1, sy2);
    const slo = Math.max(sxlo, sylo);
    const shi = Math.min(sxhi, syhi);

    this.x1 = px + dirX * slo;
    this.y1 = py + dirY * slo;
    this.x2 = px + dirX * shi;
    this.y2 = py + dirY * shi;
    this.thickness = Math.max(0.6, 0.7 + this.index * 0.14);
  }

  yAt(x: number) {
    const t = (x - this.x1) / (this.x2 - this.x1);
    return this.y1 + (this.y2 - this.y1) * t;
  }

  pluck(x: number, strength = 1, direction: 1 | -1 = 1) {
    const t = Math.min(0.94, Math.max(0.06, (x - this.x1) / (this.x2 - this.x1)));
    this.pluckAt(t, strength, direction);
  }

  pluckAt(t: number, strength = 1, direction: 1 | -1 = 1) {
    this.impulseX = t;
    this.energy = Math.min(1.4, this.energy + strength);
    this.direction = direction || 1;
    this.phase = 0;
    this.waveAge = 0;
  }

  canPointerPluck(now: number) {
    // One crossing produces one strum. A string must settle first so tiny
    // cursor jitter around its centerline cannot repeatedly retrigger it.
    return now - this.lastPointerPluckAt > 140 && this.energy < 0.16;
  }

  pointerPluck(t: number, strength: number, direction: 1 | -1, now: number) {
    if (!this.canPointerPluck(now)) return;
    this.lastPointerPluckAt = now;
    this.pluckAt(t, strength, direction);
  }

  update(dt: number, reducedMotion: boolean) {
    if (reducedMotion) {
      this.energy = 0;
      return;
    }
    this.phase += dt * this.frequency * Math.PI * 2;
    this.waveAge += dt;
    this.energy *= Math.exp(-this.decay * dt);
    if (this.energy < 0.001) this.energy = 0;
  }

  // Reused across frames to avoid allocating an array of point objects
  // (and therefore garbage-collector churn) 60 times a second.
  private static readonly SEGMENTS = 64;
  private xs = new Float32Array(GuitarString.SEGMENTS + 1);
  private ys = new Float32Array(GuitarString.SEGMENTS + 1);

  draw(ctx: CanvasRenderingContext2D, time: number, height: number, reducedMotion: boolean) {
    const dx = this.x2 - this.x1;
    const dy = this.y2 - this.y1;
    const length = Math.hypot(dx, dy);
    const nx = -dy / length;
    const ny = dx / length;
    const segments = GuitarString.SEGMENTS;

    const idleAmplitude = reducedMotion ? 0 : 0.045;
    const activeAmplitude = Math.min(11, height * 0.013) * this.energy;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = this.x1 + dx * t;
      const y = this.y1 + dy * t;
      const distance = Math.abs(t - this.impulseX);
      const envelope = Math.sin(Math.PI * t);
      // Let the disturbance travel outward from the cursor contact before it
      // reaches the rest of the string, rather than starting everywhere at once.
      const arrival = Math.min(1, Math.max(0, (this.waveAge - distance / 5.5) / 0.055));
      const travelling = Math.sin(this.phase - distance * Math.PI * 10.5);
      const harmonic = 0.22 * Math.sin(this.phase * 1.82 - distance * Math.PI * 15.0);
      const idle = Math.sin(t * Math.PI * 2 + time * 0.00042 + this.index * 0.8) * idleAmplitude;
      const offset =
        (travelling + harmonic) * activeAmplitude * envelope * arrival * this.direction +
        idle * envelope;
      this.xs[i] = x + nx * offset;
      this.ys[i] = y + ny * offset;
    }

    const trace = () => {
      ctx.beginPath();
      ctx.moveTo(this.xs[0], this.ys[0]);
      for (let i = 1; i <= segments; i++) ctx.lineTo(this.xs[i], this.ys[i]);
    };

    // shadowBlur is extremely expensive when applied to every stroke on
    // every frame (the previous version did it 3x per string, 18x per
    // frame total) — that was the source of the FPS drop. We only pay for
    // a blurred glow pass while a string actually has energy (i.e. was
    // just plucked), and skip it entirely while idle/resting.
    if (this.energy > 0.01) {
      ctx.save();
      trace();
      ctx.strokeStyle = `rgba(90, 190, 255, ${0.05 + this.energy * 0.1})`;
      ctx.lineWidth = this.thickness * 7;
      ctx.shadowColor = "rgba(90, 190, 255, 0.75)";
      ctx.shadowBlur = 16 + this.energy * 12;
      ctx.stroke();
      ctx.restore();
    }

    // core body — cheap, no shadow
    ctx.beginPath();
    ctx.moveTo(this.xs[0], this.ys[0]);
    for (let i = 1; i <= segments; i++) ctx.lineTo(this.xs[i], this.ys[i]);
    ctx.strokeStyle = `rgba(214, 236, 255, ${this.baseAlpha + this.energy * 0.32})`;
    ctx.lineWidth = this.thickness * 2.1;
    ctx.stroke();

    // bright hairline — cheap, no shadow
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + this.energy * 0.5})`;
    ctx.lineWidth = Math.max(0.5, this.thickness * 0.6);
    ctx.stroke();
  }
}

export function HeroStrings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch/coarse-pointer devices (phones, most tablets) skip tap/drag
    // plucking entirely — mobile should only ever show the idle shimmer
    // and the gentle automatic strum, never gesture-driven interaction.
    const canInteract = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastTime = performance.now();
    let autoTimer = 0;
    let rafId = 0;
    let running = false;
    let isVisible = true;
    let previousPointer: { x: number; y: number } | null = null;

    const strings: GuitarString[] = Array.from(
      { length: STRING_COUNT },
      (_, i) => new GuitarString(i),
    );

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      strings.forEach((s) => s.setGeometry(width, height));
    }

    function strum(x: number, direction: 1 | -1 = 1) {
      strings.forEach((s, i) => {
        window.setTimeout(() => {
          s.pluck(x + i * 6, 0.2 + Math.random() * 0.1, direction);
        }, i * 50);
      });
    }

    function pointerPosition(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function cursorPathIntersection(
      from: { x: number; y: number },
      to: { x: number; y: number },
      string: GuitarString,
    ) {
      const pathX = to.x - from.x;
      const pathY = to.y - from.y;
      const stringX = string.x2 - string.x1;
      const stringY = string.y2 - string.y1;
      const denominator = pathX * stringY - pathY * stringX;

      if (Math.abs(denominator) < 0.0001) return null;

      const startX = string.x1 - from.x;
      const startY = string.y1 - from.y;
      const pathT = (startX * stringY - startY * stringX) / denominator;
      const stringT = (startX * pathY - startY * pathX) / denominator;

      if (pathT < 0 || pathT > 1 || stringT < 0 || stringT > 1) return null;
      return stringT;
    }

    function onPointerMove(e: PointerEvent) {
      if (reducedMotion) return;
      const point = pointerPosition(e);
      if (previousPointer) {
        const speed = Math.hypot(point.x - previousPointer.x, point.y - previousPointer.y);
        const direction = (Math.sign(point.y - previousPointer.y) || 1) as 1 | -1;
        const now = performance.now();
        for (const s of strings) {
          const contact = cursorPathIntersection(previousPointer, point, s);
          if (contact !== null)
            s.pointerPluck(contact, Math.min(0.45, 0.16 + speed / 95), direction, now);
        }
      }
      previousPointer = point;
    }

    function onPointerLeave() {
      previousPointer = null;
    }

    function onPointerDown(e: PointerEvent) {
      const point = pointerPosition(e);
      strum(point.x, Math.random() > 0.5 ? 1 : -1);
    }

    function animate(now: number) {
      const dt = Math.min(0.034, (now - lastTime) / 1000);
      lastTime = now;
      ctx!.clearRect(0, 0, width, height);

      strings.forEach((s) => {
        s.update(dt, reducedMotion);
        s.draw(ctx!, now, height, reducedMotion);
      });

      if (!reducedMotion && isVisible && !document.hidden) {
        autoTimer += dt;
        if (autoTimer > 7 + Math.random() * 4) {
          autoTimer = 0;
          const s = strings[Math.floor(Math.random() * strings.length)];
          s.pluck(
            width * (0.55 + Math.random() * 0.3),
            0.09 + Math.random() * 0.07,
            Math.random() > 0.5 ? 1 : -1,
          );
        }
        rafId = requestAnimationFrame(animate);
      } else {
        running = false;
      }
    }

    function startLoop() {
      if (running || reducedMotion) return;
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(animate);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only run the animation while the hero is actually on screen — no
    // point burning frames drawing strings the user has scrolled past.
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    function onVisibilityChange() {
      if (document.hidden) stopLoop();
      else if (isVisible) startLoop();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!reducedMotion && canInteract) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("pointerdown", onPointerDown);
    }

    const kickoff = window.setTimeout(() => strum(width * 0.6, 1), 700);
    startLoop();

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearTimeout(kickoff);
      stopLoop();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-strings" aria-hidden="true" />;
}
