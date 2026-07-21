import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronRight, Menu, Play, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientCanvas } from "@/components/loop/AmbientCanvas";
import { PhoneExperience } from "@/components/loop/PhoneExperience";
import { Wordmark } from "@/components/loop/Wordmark";
import loopLogo from "@/assets/loop-logo.png";
import blueAmbient from "@/assets/loop/blue-ambient.jpg";
import vocalMic from "@/assets/loop/vocal-mic.png";
import pianoImg from "@/assets/loop/piano.png";
import guitarImg from "@/assets/loop/guitar.png";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOOP — Music Academy" },
      { name: "description", content: "LOOP Music Academy — Make music part of your life." },
      { name: "theme-color", content: "#030815" },
      { property: "og:title", content: "LOOP — Music Academy" },
      { property: "og:description", content: "LOOP Music Academy — Make music part of your life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoopHome,
});

const founders = [
  { name: "Mithilesh Panchal", initials: "MP", role: "Vocals · Founder" },
  { name: "Garvit Soni", initials: "GS", role: "Guitar · Founder" },
  { name: "Priyansh Srivastava", initials: "PS", role: "Piano · Founder" },
];

const stats: [string, string][] = [
  ["500+", "STUDENTS MENTORED"],
  ["15+", "YEARS TEACHING EXPERIENCE"],
  ["200+", "STAGE PERFORMANCES"],
  ["30+", "LIVE GROUP BATCHES"],
];

const courses = [
  {
    tags: "BOLLYWOOD · HINDUSTANI CLASSICAL",
    name: "Vocal",
    description:
      "Structured Hindustani vocal training for beginner, intermediate and advanced singers. Live sessions with a dedicated vocal mentor.",
    badge: null as string | null,
    image: vocalMic,
    imageClass: "course-image-vocal",
  },
  {
    tags: "CONTEMPORARY · CLASSICAL · BOLLYWOOD",
    name: "Piano",
    description:
      "Structured curriculum from first note to full compositions. Three progressive tracks, weekly live sessions.",
    badge: "MOST POPULAR" as string | null,
    image: pianoImg,
    imageClass: "course-image-piano",
  },
  {
    tags: "ACOUSTIC · ELECTRIC · FINGERSTYLE",
    name: "Guitar",
    description:
      "Practical playing ability built through guided, live online sessions — from first chord to consistent technique.",
    badge: null as string | null,
    image: guitarImg,
    imageClass: "course-image-guitar",
  },
];

const testimonials: [string, string][] = [
  ["LOOP gave me the structure to take my music seriously — and the confidence to put it out there.", "Aarav · Vocal student"],
  ["The sessions are warm, specific and genuinely inspiring. I look forward to practice now.", "Maya · Piano student"],
  ["Sixteen sessions in and I finally understand my own instrument. Every class has a purpose.", "Rohan · Guitar student"],
  ["My mentor still performs on stage — that changes how they teach. It shows in every lesson.", "Diya · Vocal student"],
];

function Reveal({
  children,
  className = "",
  ...rest
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const item = ref.current;
    if (!item || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        item,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
        },
      );
    }, item);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}

function LoopHome() {
  const vinylRef = useRef<HTMLDivElement>(null);
  const courseGridRef = useRef<HTMLDivElement>(null);
  const courseCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const founderGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = founderGridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".founder-card",
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: grid, start: "top 85%" },
        },
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".nav", { y: -18, opacity: 0, duration: 0.65 })
        .from(
          ".hero-kicker, .hero-title .line, .hero-copy, .hero-actions, .hero-foot",
          { y: 28, opacity: 0, duration: 0.85, stagger: 0.1 },
          "-=0.35",
        )
        .from(".vinyl-composition", { scale: 0.78, opacity: 0, duration: 1.6 }, "-=1");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const vinyl = vinylRef.current;
    if (!vinyl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let angle = 0;
    let lastFrame = performance.now();
    let frame = 0;
    let dragging = false;
    let lastPointerAngle = 0;
    const centerAngle = (event: PointerEvent) => {
      const rect = vinyl.getBoundingClientRect();
      return Math.atan2(
        event.clientY - (rect.top + rect.height / 2),
        event.clientX - (rect.left + rect.width / 2),
      );
    };
    const render = (time: number) => {
      if (!dragging) angle += (time - lastFrame) * 0.015;
      lastFrame = time;
      vinyl.style.setProperty("--vinyl-angle", `${angle}deg`);
      frame = requestAnimationFrame(render);
    };
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastPointerAngle = centerAngle(event);
      vinyl.setPointerCapture(event.pointerId);
      vinyl.classList.add("is-dragging");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const currentAngle = centerAngle(event);
      let delta = currentAngle - lastPointerAngle;
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      angle += delta * (180 / Math.PI);
      lastPointerAngle = currentAngle;
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (vinyl.hasPointerCapture(event.pointerId)) vinyl.releasePointerCapture(event.pointerId);
      vinyl.classList.remove("is-dragging");
    };
    vinyl.addEventListener("pointerdown", onPointerDown);
    vinyl.addEventListener("pointermove", onPointerMove);
    vinyl.addEventListener("pointerup", onPointerEnd);
    vinyl.addEventListener("pointercancel", onPointerEnd);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      vinyl.removeEventListener("pointerdown", onPointerDown);
      vinyl.removeEventListener("pointermove", onPointerMove);
      vinyl.removeEventListener("pointerup", onPointerEnd);
      vinyl.removeEventListener("pointercancel", onPointerEnd);
    };
  }, []);

  useEffect(() => {
    const grid = courseGridRef.current;
    const cards = courseCardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!grid || !cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    gsap.set(cards, { transformPerspective: 1200, transformOrigin: "center", z: 0 });

    const setters = cards.map((card) => ({
      lift: gsap.quickTo(card, "y", { duration: 0.7, ease: "power3.out" }),
      scale: gsap.quickTo(card, "scale", { duration: 0.7, ease: "power3.out" }),
      rotX: gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" }),
      rotY: gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" }),
      opacity: gsap.quickTo(card, "opacity", { duration: 0.6, ease: "power2.out" }),
    }));

    const restAll = () => {
      cards.forEach((card, i) => {
        setters[i].lift(0);
        setters[i].scale(1);
        setters[i].rotX(0);
        setters[i].rotY(0);
        setters[i].opacity(1);
        card.classList.remove("is-hovered");
        card.classList.remove("is-dimmed");
      });
    };

    const activate = (index: number) => {
      cards.forEach((card, i) => {
        const isActive = i === index;
        setters[i].lift(isActive ? -14 : 6);
        setters[i].scale(isActive ? 1.07 : 0.925);
        setters[i].opacity(isActive ? 1 : 0.55);
        card.classList.toggle("is-hovered", isActive);
        card.classList.toggle("is-dimmed", !isActive);
      });
    };

    const cleanups: Array<() => void> = [];

    cards.forEach((card, index) => {
      const onEnter = () => activate(index);
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        setters[index].rotY((px - 0.5) * 12);
        setters[index].rotX((0.5 - py) * 10);
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
      };
      const onLeave = () => restAll();

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main id="top" className="loop-main">
      <div className="page-noise" />
      <AmbientCanvas />
      <nav className="nav">
        <Wordmark compact />
        <div className="nav-links">
          <a href="#courses">Courses</a>
          <a href="#founders">Founders</a>
          <a href="#book">1:1 Session</a>
        </div>
        <div className="nav-right">
          <a href="#book" className="nav-enroll">
            Enroll Now
          </a>
          <button className="menu-button" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-light" style={{ backgroundImage: `url(${blueAmbient})` }} />
        <div className="hero-aurora" />
        <div className="hero-content">
          <span className="hero-kicker">
            <i /> MUSIC IS A PRACTICE
          </span>
          <h1 className="hero-title">
            <span className="line">Made by artists,</span>
            <span className="line italic">for the artists.</span>
          </h1>
          <p className="hero-copy">
            A modern music academy for the curious, the committed and everyone in between.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#courses">
              Find your sound <ChevronRight size={17} />
            </a>
            <a className="button button-quiet" href="#experience">
              <span className="play-icon">
                <Play size={12} fill="currentColor" />
              </span>{" "}
              See how it works
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="vinyl-composition" aria-hidden="true">
            <div className="vinyl-halo" />
            <div
              className="vinyl-record"
              ref={vinylRef}
              aria-label="Spinning LOOP vinyl record. Drag to rotate."
            >
              <div className="vinyl-sheen" />
              <div className="vinyl-grooves" />
              <div className="vinyl-label">
                <img
                  className="label-wordmark"
                  src={loopLogo}
                  alt="LOOP Music Academy"
                  draggable={false}
                />
                <i className="label-spindle" />
                <em className="label-tagline">
                  MAKE MUSIC
                  <br />
                  PART OF YOUR LIFE
                </em>
                <b>
                  SIDE A<br />
                  33⅓ RPM
                </b>
              </div>
            </div>
            <div className="tonearm">
              <i className="tonearm-pivot" />
              <span className="tonearm-tube" />
              <b className="tonearm-head">
                <i />
              </b>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <span>EST. 2021 · BENGALURU</span>
          <span>
            SCROLL TO BEGIN <b>↓</b>
          </span>
        </div>
      </section>

      <PhoneExperience />

      <section className="founders" id="founders">
        <Reveal className="founders-head">
          <div className="founders-head-main">
            <span className="eyebrow">FOUNDED BY ARTISTS</span>
            <h2>
              Three musicians.
              <br />
              <span className="muted">One academy.</span>
            </h2>
          </div>
          <p className="founders-head-copy">
            Loop is built by performing artists who still take the stage — not administrators. Every
            student gets a monthly masterclass with the founders.
          </p>
        </Reveal>
        <Reveal className="founders-banner">
          <div className="founders-banner-overlay" />
          <span className="founders-banner-placeholder">Group photo placeholder</span>
          <span className="founders-banner-label">INSIDE LOOP — ALL THREE FOUNDERS</span>
          
        </Reveal>
        <div className="founder-grid" ref={founderGridRef}>
          {founders.map(({ name, initials, role }) => (
            <div className="founder-card" key={initials}>
              <div className="founder-photo">
                <span className="founder-photo-placeholder">Photo placeholder</span>
                <span className="founder-badge">{initials}</span>
              </div>
              <p className="founder-name">{name}</p>
              <p className="founder-role">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          {stats.map(([value, label]) => (
            <Reveal className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </Reveal>
          ))}
        </div>
        <p className="stats-caption">
          Founding faculty are active performing musicians — not just instructors.
        </p>
      </section>

      <section className="courses" id="courses">
        <Reveal className="courses-head">
          <div>
            <h2>Courses</h2>
          </div>
          <p>Every batch is live, structured, and led by musicians who still take the stage.</p>
        </Reveal>
        <div className="course-grid" ref={courseGridRef}>
          {courses.map(({ tags, name, description, badge, image, imageClass }, index) => (
            <Reveal className="course-card-reveal" key={name}>
              <div
                className="course-card"
                ref={(el) => {
                  courseCardRefs.current[index] = el;
                }}
              >
                {badge && <span className="course-badge">{badge}</span>}
                <div className={`course-image ${imageClass}`} aria-hidden="true">
                  <img src={image} alt="" loading="lazy" />
                </div>
                <span className="course-tags">{tags}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <a href="#book" className="course-link">
                  EXPLORE COURSE <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <Reveal>
          <span className="eyebrow">IN THEIR WORDS</span>
          <h2>
            Made to be
            <br />
            <em>felt.</em>
          </h2>
        </Reveal>
        <div className="marquee">
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map(([quote, person], index) => (
              <div className="marquee-card" key={`${person}-${index}`}>
                <div className="marquee-stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote>“{quote}”</blockquote>
                <p>{person}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="book-session" id="book">
        <Reveal className="book-card">
          <div className="book-copy">
            <span className="book-kicker">1:1 LIVE SESSIONS</span>
            <h2>
              One teacher.
              <br />
              All your attention.
            </h2>
            <p>
              Book a private session directly with Mithilesh Panchal — vocalist, performer, and
              founding faculty. Tailored to your level, your songs, your pace.
            </p>
            <div className="book-tags">
              <span>Personalized curriculum</span>
              <span>Flexible scheduling</span>
              <span>Any instrument level</span>
            </div>
          </div>
          <div className="book-price">
            <span className="book-price-label">STARTING FROM</span>
            <span className="book-price-value">
              ₹799<small>/session</small>
            </span>
            <a className="button button-book" href="mailto:hello@loopmusic.academy">
              Book a Session <ArrowUpRight size={16} />
            </a>
            <span className="book-price-note">No commitment · Cancel anytime</span>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark />
            <p>
              A modern music academy for the curious, the committed and everyone in between.
            </p>
          </div>
          <div className="footer-col">
            <span className="footer-heading">Founders</span>
            <span>Mithilesh Panchal · Vocals</span>
            <span>Garvit Soni · Guitar</span>
            <span>Priyansh Srivastava · Piano</span>
          </div>
          <div className="footer-col">
            <span className="footer-heading">Explore</span>
            <a href="#courses">Courses</a>
            <a href="#founders">Founders</a>
            <a href="#book">1:1 Session</a>
          </div>
          <div className="footer-col">
            <span className="footer-heading">Follow</span>
            <a href="#top">Instagram</a>
            <a href="#top">YouTube</a>
            <a href="mailto:hello@loopmusic.academy">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 LOOP Music Academy</span>
          <span>Bengaluru, India</span>
        </div>
      </footer>

      <button
        type="button"
        className="whatsapp-fab"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="whatsapp-fab-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.44h.006c6.585 0 11.937-5.361 11.94-11.943a11.874 11.874 0 0 0-3.47-8.396" />
          </svg>
        </span>
        <span className="whatsapp-fab-label">Chat with us</span>
        <span className="whatsapp-fab-pulse" aria-hidden="true" />
      </button>
    </main>
  );
}
