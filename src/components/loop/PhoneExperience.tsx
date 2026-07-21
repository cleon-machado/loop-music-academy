import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Guitar, Mic2, PenLine, Piano } from "lucide-react";
import loopLogo from "@/assets/loop-logo.png";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { name: "Vocals", label: "Find your sound", icon: Mic2, className: "voice-card", metric: "01" },
  { name: "Songwriting", label: "Write your story", icon: PenLine, className: "keys-card", metric: "02" },
  { name: "Piano", label: "First note to full song", icon: Piano, className: "prod-card", metric: "03" },
  { name: "Guitar", label: "Lead the room", icon: Guitar, className: "guitar-card", metric: "04" },
];

export function PhoneExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 801px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1650",
            scrub: 1.25,
            pin: true,
            anticipatePin: 1,
          },
        });
        timeline
          .to(".phone-wrap", { scale: 1.05, rotationY: -4, ease: "power2.inOut" }, 0)
          .to(".phone-glow", { opacity: 1, scale: 1.22, ease: "power2.out" }, 0)
          .to(".floating-card", { filter: "blur(0px)", ease: "power3.out" }, 0)
          .to(".voice-card", { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut" }, 0.12)
          .to(".keys-card", { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut" }, 0.18)
          .to(".prod-card", { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut" }, 0.25)
          .to(".guitar-card", { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut" }, 0.31)
          .to(
            ".phone-screen .screen-logo, .screen-stat, .screen-section-label, .bottom-nav",
            { opacity: 1, y: 0, stagger: 0.07, ease: "power3.out" },
            0.54,
          )
          .to(".phone-wrap", { rotationY: 0, scale: 1.12, ease: "power2.inOut" }, 0.62);
      });
      return () => mm.revert();
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="phone-experience" ref={sectionRef} id="experience">
      <div className="experience-copy">
        <span className="eyebrow">A studio in your pocket</span>
        <h2>
          Every lesson.
          <br />
          <em>In your rhythm.</em>
        </h2>
        <p>Practice with a clear plan, expert feedback and a community that keeps you moving.</p>
      </div>
      <div className="phone-stage">
        <div className="phone-glow" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="phone-wrap">
          <div className="phone-shell">
            <div className="dynamic-island" />
            <div className="phone-screen">
              <div className="screen-head">
                <img src={loopLogo} alt="" className="screen-logo" draggable={false} aria-hidden="true" />
              </div>
              <div className="screen-stat">
                <div className="screen-stat-ring" aria-hidden="true">
                  <svg viewBox="0 0 36 36">
                    <circle className="ring-track" cx="18" cy="18" r="15.5" />
                    <circle className="ring-fill" cx="18" cy="18" r="15.5" />
                  </svg>
                  <span>12</span>
                </div>
                <div className="screen-stat-copy">
                  <strong>12-day streak</strong>
                  <small>4 sessions left this week</small>
                </div>
              </div>
              <div className="screen-courses">
                <span className="screen-section-label">Courses</span>
                <div className="phone-grid">
                  {cards.map(({ name, label, icon: Icon, className, metric }) => (
                    <article className={`floating-card ${className}`} key={name}>
                      <div className="tile-top">
                        <Icon size={15} strokeWidth={1.7} />
                        <span>{metric}</span>
                      </div>
                      <div>
                        <strong>{name}</strong>
                        <small>{label}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="bottom-nav">
                <span>Today</span>
                <i />
                <span>Library</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span /> Scroll to compose
      </div>
    </section>
  );
}
