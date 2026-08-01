import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, Layers, MonitorPlay, Sparkles, ArrowUpRight, Play } from "lucide-react";
import { AmbientCanvas } from "@/components/loop/AmbientCanvas";
import { SiteNav } from "@/components/loop/SiteNav";
import { SiteFooter } from "@/components/loop/SiteFooter";
import { WhatsappFab } from "@/components/loop/WhatsappFab";
import { Reveal } from "@/components/loop/Reveal";
import { Faq, type FaqItem } from "@/components/loop/Faq";
import blueAmbient from "@/assets/loop/blue-ambient.jpg";
import vocalImg from "@/assets/loop/vocal-mic.png";
import instructorVocalsImg from "@/assets/founders/mithilesh-panchal.png";

export const Route = createFileRoute("/vocal")({
  head: () => ({
    meta: [
      { title: "Hindustani Vocal Course — LOOP Music Academy" },
      {
        name: "description",
        content:
          "Structured online Hindustani vocal training at LOOP Music Academy — live mentor-led sessions, three progressive levels, and a curriculum built around your voice.",
      },
      { name: "theme-color", content: "#030815" },
      { property: "og:title", content: "Hindustani Vocal Course — LOOP Music Academy" },
      {
        property: "og:description",
        content:
          "Structured online Hindustani vocal training — live sessions, progressive levels, 1:1 mentoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VocalPage,
});

const facts = [
  { icon: CalendarClock, label: "DURATION", value: "2 Months" },
  { icon: Layers, label: "SESSIONS", value: "16 Live Classes" },
  { icon: MonitorPlay, label: "FORMAT", value: "Live, Online via Zoom" },
  { icon: Sparkles, label: "LEVELS", value: "Beginner → Advanced" },
];

const levels = [
  {
    tag: "LEVEL 01",
    name: "Beginner",
    description:
      "For learners new to Hindustani vocals or rebuilding their foundations — swaras, basic raagas, breath control and building a comfortable singing voice.",
  },
  {
    tag: "LEVEL 02",
    name: "Intermediate",
    description:
      "For students who understand the basics and want to sharpen pitch, taal, alankaars and their musical understanding of raag-based singing.",
  },
  {
    tag: "LEVEL 03",
    name: "Advanced",
    description:
      "For experienced vocalists ready for focused, performance-level training across raag exploration, bandish and expressive stage singing.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Is the vocal course suitable for absolute beginners?",
    answer:
      "Yes. The beginner track assumes no prior training and is built to give you a solid, structured foundation — swaras, breath, pitch and your first raagas — before moving on.",
  },
  {
    question: "How long is the course, and how many sessions do I get?",
    answer:
      "The structured Hindustani vocals programme runs for two months and includes 16 live sessions with your mentor, plus recorded classes for revision in between.",
  },
  {
    question: "Are the classes live, or pre-recorded?",
    answer:
      "Classes are live and conducted online over Zoom with your assigned vocal mentor. Sessions may also be recorded so you can revise and practise between live classes.",
  },
  {
    question: "Can I join at an intermediate or advanced level?",
    answer:
      "Yes. If you already have singing experience, you can join at the level that matches your current ability. If you're unsure which level fits, our team will help you figure that out after you enquire.",
  },
  {
    question: "Do you offer 1:1 vocal sessions instead of a group batch?",
    answer:
      "Customised one-to-one vocal sessions may be available depending on mentor availability. These are tailored to your voice, goals and pace — reach out and we'll confirm availability.",
  },
  {
    question: "What happens after I enrol or submit an enquiry?",
    answer:
      "You'll typically get a confirmation email, followed by outreach on WhatsApp and a short call with our team to understand your goals before confirming your batch and mentor.",
  },
];

const instructor = {
  name: "Mithilesh Panchal",
  role: "Hindustani Vocals · LOOP Music Academy",
  bio: "Mithilesh built Loop's vocals programme the way he wishes he'd been taught — structured, stage-focused, and centred on your voice as it actually is. He still performs regularly across the live circuit, and brings that same stage discipline into every mentor session, from first raag to full performance.",
  highlights: [
    "15+ yrs performing",
    "Hindustani & Bollywood",
    "Founding vocal mentor",
  ],
};

function VocalPage() {
  return (
    <main id="top" className="loop-main vocal-page">
      <div className="page-noise" />
      <AmbientCanvas />
      <SiteNav page="vocal" />

      <section className="course-hero">
        <div className="hero-light" style={{ backgroundImage: `url(${blueAmbient})` }} />
        <div className="hero-aurora" />
        <div className="course-hero-content">
          <span className="hero-kicker">
            <i /> SWARAS · RAAG · TAAL
          </span>
          <h1 className="course-hero-title">
            <span className="line">Find your voice,</span>
            <span className="line italic">one swara at a time.</span>
          </h1>
          <p className="course-hero-copy">
            A structured, mentor-led Hindustani vocals programme — from your first swara to raag-based
            singing. Live online sessions, sixteen weeks of progress, and a mentor who still performs.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/founders">
              Enroll Now <ArrowUpRight size={16} /></Link>
            <a className="button button-quiet" href="#instructor">
              <span className="play-icon">
                <Play size={12} fill="currentColor" />
              </span>{" "}
              Meet your mentor
            </a>
          </div>
        </div>
        <div className="course-hero-art">
          <div className="course-hero-art-glow" />
          <img src={vocalImg} alt="Vocal microphone" draggable={false} />
        </div>
      </section>

      <section className="course-facts">
        <div className="course-facts-grid">
          {facts.map(({ label, value }) => (
            <Reveal className="course-fact" key={label}>
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="instructor" id="instructor">
        <Reveal className="instructor-card">
          <div className="instructor-photo">
            <img src={instructorVocalsImg} alt={instructor.name} draggable={false} />
          </div>
          <div className="instructor-info">
            <span className="eyebrow">YOUR MENTOR</span>
            <h2>{instructor.name}</h2>
            <p className="instructor-role">{instructor.role}</p>
            <p className="instructor-bio">{instructor.bio}</p>
            <div className="instructor-highlights">
              {instructor.highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="instructor-cta">
              <Link className="button button-primary" to="/founders">
                Enroll Now <ArrowUpRight size={15} /></Link>
              <Link className="button button-outline" to="/founders">Book a 1:1 Session</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="levels" id="levels">
        <Reveal className="levels-head">
          <span className="eyebrow">STRUCTURED FOR WHERE YOU ARE</span>
          <h2>
            Three levels.
            <br />
            <span className="muted">One clear path.</span>
          </h2>
        </Reveal>
        <div className="level-grid">
          {levels.map(({ tag, name, description }) => (
            <Reveal className="level-card" key={name}>
              <span className="level-tag">{tag}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="book-session" id="enroll">
        <Reveal className="book-card">
          <div className="book-copy">
            <span className="book-kicker">VOCALS · GROUP &amp; 1:1</span>
            <h2>
              Open up,
              <br />
              and start singing.
            </h2>
            <p>
              Join the next live vocals batch, or book a private session directly with Ananya
              Deshpande. Either way, your first step starts with a quick enquiry.
            </p>
            <div className="book-tags">
              <span>Beginner to advanced</span>
              <span>Live mentor-led sessions</span>
              <span>Batch pricing shared at enquiry</span>
            </div>
          </div>
          <div className="book-price">
            <span className="book-price-label">1:1 SESSIONS FROM</span>
            <span className="book-price-value">
              ₹799<small>/session</small>
            </span>
            <Link className="button button-book" to="/founders">Enroll Now <ArrowUpRight size={16} /></Link>
            <span className="book-price-note">No commitment · Cancel anytime</span>
          </div>
        </Reveal>
      </section>

      <section className="faq-section" id="faq">
        <Reveal className="faq-head">
          <span className="eyebrow">QUESTIONS, ANSWERED</span>
          <h2>
            Before you
            <br />
            <em>begin.</em>
          </h2>
        </Reveal>
        <Reveal className="faq-wrap">
          <Faq items={faqItems} />
        </Reveal>
      </section>

      <SiteFooter page="vocal" />
      <WhatsappFab />
    </main>
  );
}
