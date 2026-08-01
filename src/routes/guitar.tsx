import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, Layers, MonitorPlay, Sparkles, ArrowUpRight, Play } from "lucide-react";
import { AmbientCanvas } from "@/components/loop/AmbientCanvas";
import { SiteNav } from "@/components/loop/SiteNav";
import { SiteFooter } from "@/components/loop/SiteFooter";
import { WhatsappFab } from "@/components/loop/WhatsappFab";
import { Reveal } from "@/components/loop/Reveal";
import { Faq, type FaqItem } from "@/components/loop/Faq";
import { founders } from "@/lib/founders-data";
import blueAmbient from "@/assets/loop/blue-ambient.jpg";
import guitarImg from "@/assets/loop/guitar.png";
import founderGuitarImg from "@/assets/founders/garvit.png";

export const Route = createFileRoute("/guitar")({
  head: () => ({
    meta: [
      { title: "Guitar Course — LOOP Music Academy" },
      {
        name: "description",
        content:
          "Structured online guitar lessons at LOOP Music Academy — live mentor-led sessions, three progressive levels, and a founder who still performs.",
      },
      { name: "theme-color", content: "#030815" },
      { property: "og:title", content: "Guitar Course — LOOP Music Academy" },
      {
        property: "og:description",
        content:
          "Structured online guitar lessons — live sessions, progressive levels, 1:1 mentoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuitarPage,
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
      "For learners new to the guitar or looking to rebuild their fundamentals — posture, chord shapes, and your first songs.",
  },
  {
    tag: "LEVEL 02",
    name: "Intermediate",
    description:
      "For students who already understand basic chords and want to sharpen technique, rhythm, and musical understanding.",
  },
  {
    tag: "LEVEL 03",
    name: "Advanced",
    description:
      "For experienced players ready for focused, performance-level training across acoustic, electric and fingerstyle repertoire.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Is the guitar course suitable for absolute beginners?",
    answer:
      "Yes. The beginner track assumes no prior training and is built to give you a solid, structured foundation — posture, chord shapes, and your first songs — before moving on.",
  },
  {
    question: "How long is the course, and how many sessions do I get?",
    answer:
      "The structured guitar programme runs for two months and includes 16 live sessions with your mentor, plus recorded classes for revision in between.",
  },
  {
    question: "Are the classes live, or pre-recorded?",
    answer:
      "Classes are live and conducted online over Zoom with your assigned mentor. Sessions may also be recorded so you can revise and practise between live classes.",
  },
  {
    question: "Can I join at an intermediate or advanced level?",
    answer:
      "Yes. If you already have playing experience, you can join at the level that matches your current ability. If you're unsure which level fits, our team will help you figure that out after you enquire.",
  },
  {
    question: "Do you offer 1:1 guitar sessions instead of a group batch?",
    answer:
      "Customised one-to-one sessions may be available depending on mentor availability. These are tailored to your goals, pace, and current level — reach out and we'll confirm availability.",
  },
  {
    question: "What happens after I enrol or submit an enquiry?",
    answer:
      "You'll typically get a confirmation email, followed by outreach on WhatsApp and a short call with our team to understand your goals before confirming your batch and mentor.",
  },
];

function GuitarPage() {
  const garvit = founders.find((founder) => founder.id === "garvit")!;

  return (
    <main id="top" className="loop-main guitar-page">
      <div className="page-noise" />
      <AmbientCanvas />
      <SiteNav page="guitar" />

      <section className="course-hero">
        <div className="hero-light" style={{ backgroundImage: `url(${blueAmbient})` }} />
        <div className="hero-aurora" />
        <div className="course-hero-content">
          <span className="hero-kicker">
            <i /> ACOUSTIC · ELECTRIC · FINGERSTYLE
          </span>
          <h1 className="course-hero-title">
            <span className="line">Learn guitar,</span>
            <span className="line italic">one chord at a time.</span>
          </h1>
          <p className="course-hero-copy">
            A structured, mentor-led guitar programme — from your first chord to full songs. Live
            online sessions, sixteen weeks of progress, and a founder who still performs.
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
          <img src={guitarImg} alt="Guitar" draggable={false} />
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
            <img src={founderGuitarImg} alt={garvit.name} draggable={false} />
          </div>
          <div className="instructor-info">
            <span className="eyebrow">YOUR MENTOR</span>
            <h2>{garvit.name}</h2>
            <p className="instructor-role">{garvit.role} · LOOP Music Academy</p>
            <p className="instructor-bio">{garvit.bio}</p>
            <div className="instructor-highlights">
              {garvit.highlights.map((item) => (
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
            <span className="book-kicker">GUITAR · GROUP &amp; 1:1</span>
            <h2>
              Pick it up,
              <br />
              and start playing.
            </h2>
            <p>
              Join the next live guitar batch, or book a private session directly with Garvit Soni.
              Either way, your first step starts with a quick enquiry.
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

      <SiteFooter page="guitar" />
      <WhatsappFab />
    </main>
  );
}
