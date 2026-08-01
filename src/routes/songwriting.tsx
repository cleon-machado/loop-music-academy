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
import songwritingImg from "@/assets/loop/songwriting.png";
import founderVocalsImg from "@/assets/founders/mithilesh-panchal.png";

export const Route = createFileRoute("/songwriting")({
  head: () => ({
    meta: [
      { title: "Songwriting Course — LOOP Music Academy" },
      {
        name: "description",
        content:
          "Structured online songwriting programme at LOOP Music Academy — turn ideas, lyrics and melodies into finished songs across eight mentor-led live sessions.",
      },
      { name: "theme-color", content: "#030815" },
      { property: "og:title", content: "Songwriting Course — LOOP Music Academy" },
      {
        property: "og:description",
        content:
          "A focused online songwriting programme — live sessions, lyric and melody craft, 1:1 mentoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SongwritingPage,
});

const facts = [
  { icon: CalendarClock, label: "DURATION", value: "1 Month" },
  { icon: Layers, label: "SESSIONS", value: "8 Live Classes" },
  { icon: MonitorPlay, label: "FORMAT", value: "Live, Online via Zoom" },
  { icon: Sparkles, label: "LEVELS", value: "Idea → Finished Song" },
];

const levels = [
  {
    tag: "STAGE 01",
    name: "Foundations",
    description:
      "Turn scattered ideas, emotions and lyrical thoughts into starting points — hooks, themes and the seed of a song.",
  },
  {
    tag: "STAGE 02",
    name: "Craft",
    description:
      "Shape lyrics, melody and structure together — verses, choruses, phrasing and the musical logic that holds a song up.",
  },
  {
    tag: "STAGE 03",
    name: "Finished Song",
    description:
      "Refine arrangement, story and delivery so you walk out of the programme with a song you can actually play, share or record.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Is the songwriting course suitable for absolute beginners?",
    answer:
      "Yes. The programme is designed for people who want to develop their ideas, emotions and lyrical thoughts into structured songs — no prior songwriting experience is required.",
  },
  {
    question: "How long is the course, and how many sessions do I get?",
    answer:
      "The structured songwriting programme runs for one month and includes 8 live sessions with your mentor, with two sessions each week.",
  },
  {
    question: "Are the classes live, or pre-recorded?",
    answer:
      "Classes are live and conducted online over Zoom with your assigned mentor. Sessions may also be recorded so you can revise and keep writing between live classes.",
  },
  {
    question: "Do I need to play an instrument to join?",
    answer:
      "No. The course focuses on ideas, lyrics, melody and structure. If you already play an instrument it helps, but it isn't required to start.",
  },
  {
    question: "Do you offer 1:1 songwriting sessions instead of a group batch?",
    answer:
      "Customised one-to-one sessions may be available depending on mentor availability. These are tailored to your goals, pace, and the kind of songs you want to write — reach out and we'll confirm availability.",
  },
  {
    question: "What happens after I enrol or submit an enquiry?",
    answer:
      "You'll typically get a confirmation email, followed by outreach on WhatsApp and a short call with our team to understand your goals before confirming your batch and mentor.",
  },
];

function SongwritingPage() {
  const mithilesh = founders.find((founder) => founder.id === "mithilesh")!;

  return (
    <main id="top" className="loop-main songwriting-page">
      <div className="page-noise" />
      <AmbientCanvas />
      <SiteNav page="songwriting" />

      <section className="course-hero">
        <div className="hero-light" style={{ backgroundImage: `url(${blueAmbient})` }} />
        <div className="hero-aurora" />
        <div className="course-hero-content">
          <span className="hero-kicker">
            <i /> LYRICS · MELODY · STRUCTURE
          </span>
          <h1 className="course-hero-title">
            <span className="line">Write songs,</span>
            <span className="line italic">one idea at a time.</span>
          </h1>
          <p className="course-hero-copy">
            A focused, mentor-led songwriting programme — turn your ideas, emotions and lyrical
            thoughts into finished songs across eight live sessions with a working musician.
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
          <img src={songwritingImg} alt="Songwriting" draggable={false} />
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
            <img src={founderVocalsImg} alt={mithilesh.name} draggable={false} />
          </div>
          <div className="instructor-info">
            <span className="eyebrow">YOUR MENTOR</span>
            <h2>{mithilesh.name}</h2>
            <p className="instructor-role">Songwriting · LOOP Music Academy</p>
            <p className="instructor-bio">{mithilesh.bio}</p>
            <div className="instructor-highlights">
              {mithilesh.highlights.map((item) => (
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
            Three stages.
            <br />
            <span className="muted">One finished song.</span>
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
            <span className="book-kicker">SONGWRITING · GROUP &amp; 1:1</span>
            <h2>
              Sit down,
              <br />
              and start writing.
            </h2>
            <p>
              Join the next live songwriting batch, or book a private session directly with
              Mithilesh Panchal. Either way, your first step starts with a quick enquiry.
            </p>
            <div className="book-tags">
              <span>No experience required</span>
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

      <SiteFooter page="songwriting" />
      <WhatsappFab />
    </main>
  );
}
