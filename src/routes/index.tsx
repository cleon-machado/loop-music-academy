import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, Play, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientCanvas } from "@/components/loop/AmbientCanvas";
import { HeroStrings } from "@/components/loop/HeroStrings";
import { PhoneExperience } from "@/components/loop/PhoneExperience";
import { SiteNav } from "@/components/loop/SiteNav";
import { SiteFooter } from "@/components/loop/SiteFooter";
import { WhatsappFab } from "@/components/loop/WhatsappFab";
import { Reveal } from "@/components/loop/Reveal";
import { FounderCard } from "@/components/loop/FounderCard";
import { FounderModal } from "@/components/loop/FounderModal";
import { founders, type Founder } from "@/lib/founders-data";

import blueAmbient from "@/assets/loop/blue-ambient.jpg";
import vocalMic from "@/assets/loop/vocal-mic.png";
import pianoImg from "@/assets/loop/piano.png";
import songwritingImg from "@/assets/loop/songwriting.png";
import micTile from "@/assets/loop/card-mic.png";
import pianoTile from "@/assets/loop/card-piano.png";
import guitarTile from "@/assets/loop/guitar-tile.png";
import songwritingTile from "@/assets/loop/songwriting-cropped.png";

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

const stats: [string, string][] = [
  ["500+", "STUDENTS MENTORED"],
  ["15+", "YEARS TEACHING EXPERIENCE"],
  ["200+", "STAGE PERFORMANCES"],
  ["30+", "LIVE GROUP BATCHES"],
];

const heroTiles = [
  { name: "Piano", label: "First note to full song", image: pianoTile, className: "pos-tl" },
  { name: "Guitar", label: "Lead the room", image: guitarTile, className: "pos-tr" },
  { name: "Vocals", label: "Find your sound", image: micTile, className: "pos-bl" },
  { name: "Songwriting", label: "Write your story", image: songwritingTile, className: "pos-br" },
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
    href: "#book",
  },
  {
    tags: "CONTEMPORARY · CLASSICAL · BOLLYWOOD",
    name: "Piano",
    description:
      "Structured curriculum from first note to full compositions. Three progressive tracks, weekly live sessions.",
    badge: "MOST POPULAR" as string | null,
    image: pianoImg,
    imageClass: "course-image-piano",
    href: "/piano",
  },
  {
    tags: "ACOUSTIC · ELECTRIC · FINGERSTYLE",
    name: "Guitar",
    description:
      "Practical playing ability built through guided, live online sessions — from first chord to consistent technique.",
    badge: null as string | null,
    image: guitarTile,
    imageClass: "course-image-guitar",
    href: "/guitar",
  },
  {
    tags: "LYRICS · MELODY · STRUCTURE",
    name: "Songwriting",
    description:
      "Turn ideas into finished songs. Learn lyric writing, melody craft, song structure and arrangement in live mentor-led sessions.",
    badge: null as string | null,
    image: songwritingImg,
    imageClass: "course-image-songwriting",
    href: "#book",
  },
];

const testimonials: [string, string][] = [
  [
    "LOOP gave me the structure to take my music seriously — and the confidence to put it out there.",
    "Aarav · Vocal student",
  ],
  [
    "The sessions are warm, specific and genuinely inspiring. I look forward to practice now.",
    "Maya · Piano student",
  ],
  [
    "Sixteen sessions in and I finally understand my own instrument. Every class has a purpose.",
    "Rohan · Guitar student",
  ],
  [
    "My mentor still performs on stage — that changes how they teach. It shows in every lesson.",
    "Diya · Vocal student",
  ],
];

function LoopHome() {
  const heroSequenceRef = useRef<HTMLDivElement>(null);
  const courseGridRef = useRef<HTMLDivElement>(null);
  const courseCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const founderGridRef = useRef<HTMLDivElement>(null);
  const [activeFounder, setActiveFounder] = useState<Founder | null>(null);

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
        );
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const sequence = heroSequenceRef.current;
    if (!sequence || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = gsap.utils.toArray<HTMLElement>(".hero-tile", sequence);
    const phone = sequence.querySelector<HTMLElement>(".phone-wrap");
    const phoneStage = sequence.querySelector<HTMLElement>(".phone-stage");
    const phoneScreen = sequence.querySelector<HTMLElement>(".phone-screen");
    const courseHeading = sequence.querySelector<HTMLElement>(".screen-courses-label");
    const experienceCopy = sequence.querySelectorAll<HTMLElement>(".experience-copy");
    const heroContent = sequence.querySelector<HTMLElement>(".hero-content");
    const heroFoot = sequence.querySelector<HTMLElement>(".hero-foot");
    const heroAtmosphere = sequence.querySelectorAll<HTMLElement>(
      ".hero-strings, .hero-light, .hero-aurora",
    );
    if (!phone || !phoneStage || !phoneScreen || tiles.length !== 4) return;

    const ctx = gsap.context(() => {
      // Measure the phone in its completed position, then move it down until only its
      // top edge is visible. The tiles remain one set of DOM nodes for the entire move.
      const isMobile = window.innerWidth < 561;
      gsap.set(phoneStage, { y: 0 });

      // Mobile can inherit an inline horizontal transform when the viewport changes
      // from desktop. Center from the phone's actual rendered bounds instead of
      // assuming which transform values GSAP has cached.
      if (isMobile) {
        const phoneBounds = phone.getBoundingClientRect();
        const centerOffset = window.innerWidth / 2 - (phoneBounds.left + phoneBounds.width / 2);
        gsap.set(phoneStage, { x: `+=${centerOffset}` });
      }

      const finishedPhone = phone.getBoundingClientRect();
      const finishedScreen = phoneScreen.getBoundingClientRect();
      const finishedHeading = courseHeading?.getBoundingClientRect();
      const phonePeek = isMobile ? 152 : window.innerWidth < 801 ? 72 : 96;
      const startPhoneY = Math.max(0, window.innerHeight - phonePeek - finishedPhone.top);
      gsap.set(phoneStage, { y: startPhoneY });

      const starts = tiles.map((tile) => {
        const rect = tile.getBoundingClientRect();
        return {
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
          x: Number(gsap.getProperty(tile, "x")),
          y: Number(gsap.getProperty(tile, "y")),
        };
      });

      const targetFor = (index: number) => {
        const tile = tiles[index];
        const cellGutter = window.innerWidth < 801 ? 6 : 8;
        const gridGap = window.innerWidth < 801 ? 10 : 14;
        const usableWidth = finishedScreen.width * 0.84;
        const cellWidth = (usableWidth - cellGutter) / 2;
        const tileScale = Math.min(
          cellWidth / tile.offsetWidth,
          (finishedScreen.height * 0.21) / tile.offsetHeight,
        );
        const tileWidth = tile.offsetWidth * tileScale;
        const tileHeight = tile.offsetHeight * tileScale;
        const isRight = index === 1 || index === 3;
        const isBottom = index === 2 || index === 3;
        const headingBottom = finishedHeading?.bottom;
        const gridTop = headingBottom
          ? headingBottom + gridGap + 8
          : finishedScreen.top + finishedScreen.height * 0.45 + 8;
        const centerX =
          finishedScreen.left +
          (finishedScreen.width - (tileWidth * 2 + gridGap)) / 2 +
          (isRight ? tileWidth * 1.5 + gridGap : tileWidth / 2);
        const centerY = gridTop + tileHeight / 2 + (isBottom ? tileHeight + gridGap : 0);

        return {
          x: starts[index].x + centerX - starts[index].centerX,
          y: starts[index].y + centerY - starts[index].centerY,
          scale: tileScale,
        };
      };

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sequence,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(phoneStage, { y: 0, duration: 1 }, 0);

      timeline.fromTo(
        experienceCopy,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08 },
        0.56,
      );

      timeline.to(
        tiles,
        {
          x: (index) => targetFor(index).x,
          y: (index) => targetFor(index).y,
          scale: (index) => targetFor(index).scale,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: { each: 0.025, from: "center" },
        },
        0.04,
      );

      if (heroContent) {
        timeline.to(heroContent, { yPercent: -12, autoAlpha: 0, duration: 0.38 }, 0.18);
      }
      if (heroFoot) {
        timeline.to(heroFoot, { autoAlpha: 0, duration: 0.22 }, 0.16);
      }
      if (heroAtmosphere.length) {
        timeline.to(heroAtmosphere, { autoAlpha: 0, duration: 0.3 }, 0.2);
      }
    }, sequence);

    return () => ctx.revert();
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
      <SiteNav page="home" />

      <div className="hero-phone-sequence" ref={heroSequenceRef}>
        <section className="hero">
          <div className="hero-light" style={{ backgroundImage: `url(${blueAmbient})` }} />
          <div className="hero-aurora" />
          <HeroStrings />
          <div className="hero-tiles" aria-label="LOOP courses">
            {heroTiles.map(({ name, label, image, className }) => (
              <article className={`feature-tile hero-tile ${className}`} key={name}>
                <div className="tile-image-wrap">
                  <img
                    src={image}
                    alt=""
                    className="tile-image"
                    draggable={false}
                    aria-hidden="true"
                  />
                </div>
                <div className="tile-copy">
                  <strong>{name}</strong>
                  <small>{label}</small>
                </div>
              </article>
            ))}
          </div>
          <div className="hero-content">
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
          <div className="hero-foot">
            <span>EST. 2021 · BENGALURU</span>
            <span>
              SCROLL TO BEGIN <b>↓</b>
            </span>
          </div>
        </section>

        <PhoneExperience />
      </div>

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
        <div className="founder-grid" ref={founderGridRef}>
          {founders.map((founder) => (
            <FounderCard founder={founder} onLearnMore={setActiveFounder} key={founder.id} />
          ))}
        </div>
      </section>

      <FounderModal
        founder={activeFounder}
        onOpenChange={(open) => !open && setActiveFounder(null)}
      />

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
          {courses.map(({ tags, name, description, badge, image, imageClass, href }, index) => (
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
                {name === "Piano" ? (
                  <Link to="/piano" className="course-link">
                    EXPLORE COURSE <ArrowUpRight size={14} />
                  </Link>
                ) : name === "Guitar" ? (
                  <Link to="/guitar" className="course-link">
                    EXPLORE COURSE <ArrowUpRight size={14} />
                  </Link>
                ) : name === "Songwriting" ? (
                  <Link to="/songwriting" className="course-link">
                    EXPLORE COURSE <ArrowUpRight size={14} />
                  </Link>
                ) : (
                  <Link to="/vocal" className="course-link">
                    EXPLORE COURSE <ArrowUpRight size={14} />
                  </Link>
                )}
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
            <Link
              className="button button-book"
              to="/founders"
            >
              Book a Session <ArrowUpRight size={16} />
            </Link>
            <span className="book-price-note">No commitment · Cancel anytime</span>
          </div>
        </Reveal>
      </section>

      <SiteFooter page="home" />
      <WhatsappFab />
    </main>
  );
}
