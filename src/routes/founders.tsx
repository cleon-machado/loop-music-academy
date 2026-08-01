import { createFileRoute } from "@tanstack/react-router";
import { Music2, Sparkles } from "lucide-react";
import { AmbientCanvas } from "@/components/loop/AmbientCanvas";
import { SiteNav } from "@/components/loop/SiteNav";
import { SiteFooter } from "@/components/loop/SiteFooter";
import { WhatsappFab } from "@/components/loop/WhatsappFab";
import { Reveal } from "@/components/loop/Reveal";
import { founders } from "@/lib/founders-data";
import blueAmbient from "@/assets/loop/blue-ambient.jpg";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founders — LOOP Music Academy" },
      {
        name: "description",
        content:
          "Meet the three artists behind LOOP Music Academy — Mithilesh Panchal, Garvit Soni and Priyansh Srivastava. Performing musicians, mentors, and founders.",
      },
      { name: "theme-color", content: "#030815" },
      { property: "og:title", content: "Founders — LOOP Music Academy" },
      {
        property: "og:description",
        content:
          "Three performing musicians. One academy. Meet the founders behind LOOP Music Academy.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FoundersPage,
});

const priyansh = founders.find((f) => f.id === "priyansh")!;
const garvit = founders.find((f) => f.id === "garvit")!;
const mithilesh = founders.find((f) => f.id === "mithilesh")!;

const trio = [mithilesh, priyansh, garvit];

const milestones: { year: string; title: string; detail: string }[] = [
  {
    year: "2020",
    title: "First release",
    detail: "Priyansh's debut single arrives after years of Indian classical training.",
  },
  {
    year: "2021",
    title: "Garvit–Priyansh forms",
    detail: "Meeting his musical partner marks the turning point of the journey.",
  },
  {
    year: "2022",
    title: "Mechanical Engineering, KIT",
    detail: "Graduates from Karlsruhe Institute of Technology in Germany.",
  },
  {
    year: "2023",
    title: "Signed with T-Series",
    detail: "The duo signs with T-Series. Sanware, Theher Ja and Kagaz find their audience.",
  },
  {
    year: "2025",
    title: "Kahe Mose · Arijit Singh",
    detail: "Arijit Singh performs their 2025 release live at one of his concerts.",
  },
  {
    year: "2026",
    title: "Loop Music Academy",
    detail: "Co-founds LOOP. Featured in YouTube Foundry's Class of 2026.",
  },
];

const priyanshHighlights = [
  "Co-founder · Loop Music Academy",
  "Garvit–Priyansh · T-Series",
  "YouTube Foundry · Class of 2026",
  "Performed at NH7 Weekender",
  "Music on Netflix · Musafir Cafe",
  "B.Sc. Mechanical Engineering · KIT, Germany",
];

function FoundersPage() {
  return (
    <main id="top" className="loop-main founders-page">
      <div className="page-noise" />
      <AmbientCanvas />
      <SiteNav page="founders" />

      {/* ---------- HERO ---------- */}
      <section className="fp-hero">
        <div className="hero-light" style={{ backgroundImage: `url(${blueAmbient})` }} />
        <div className="hero-aurora" />
        <div className="fp-hero-content">
          <span className="hero-kicker">
            <i /> THE PEOPLE BEHIND LOOP
          </span>
          <h1 className="fp-hero-title">
            <span className="line">Three musicians.</span>
            <span className="line italic">One academy.</span>
          </h1>
          <p className="fp-hero-copy">
            Loop was built by performing artists — not administrators. Meet the three founders
            shaping every batch, every mentor session, and every song that leaves the room.
          </p>
        </div>

        <div className="fp-hero-triptych" aria-hidden="true">
          {trio.map((f, i) => (
            <div className="fp-hero-portrait" key={f.id} style={{ ["--i" as string]: i }}>
              <img
                src={f.photo}
                alt=""
                style={{ objectPosition: f.focus }}
                draggable={false}
                loading="eager"
              />
              <div className="fp-hero-portrait-shade" />
              <span className="fp-hero-portrait-name">
                <b>{f.name.split(" ")[0]}</b>
                <em>{f.instrument}</em>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PRIYANSH — FULL BRIEF ---------- */}
      <section className="fp-brief" id="priyansh">
        <Reveal className="fp-brief-head">
          <div className="fp-brief-portrait">
            <img
              src={priyansh.photo}
              alt={priyansh.name}
              style={{ objectPosition: priyansh.focus }}
              draggable={false}
            />
            <div className="fp-brief-portrait-glow" />
          </div>
          <div className="fp-brief-title">
            <span className="eyebrow">PIANO · CO-FOUNDER</span>
            <h2>
              Priyansh
              <br />
              <em>Srivastava.</em>
            </h2>
            <p className="fp-brief-role">
              Music composer · Lyricist · Singer · Mechanical engineer · Entrepreneur · Educator
            </p>
            <div className="fp-brief-chips">
              {priyanshHighlights.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="fp-brief-body">
          <Reveal className="fp-brief-block">
            <span className="fp-brief-kicker">01 · WHO</span>
            <h3>A composer who never picked between his passions.</h3>
            <p>
              Priyansh Srivastava is a music composer, lyricist, singer, mechanical engineer,
              entrepreneur and educator. He graduated with a degree in Mechanical Engineering from
              the Karlsruhe Institute of Technology (KIT) in Germany, but music has been the
              constant thread through every chapter.
            </p>
            <p>
              One half of the popular duo <em>Garvit–Priyansh</em>, he's driven by a want to create
              meaningful experiences and build communities that grow together. He's also a
              co-founder of Loop Music Academy and Head of Operations and Partnerships at PHE
              Industries.
            </p>
          </Reveal>

          <Reveal className="fp-brief-block">
            <span className="fp-brief-kicker">02 · JOURNEY</span>
            <h3>Urged into classical lessons. Signed to T-Series.</h3>
            <p>
              Urged by his mother to take Indian Classical music lessons, his journey with music
              started very young. Growing up in a family that appreciated art and culture, the
              childhood hobby eventually became a professional pursuit — his first song released in
              2020.
            </p>
            <p>
              The turning point came in 2021, meeting his musical partner Garvit. Their duo
              Garvit–Priyansh signed with <b>T-Series in 2023</b> and went on to release music that
              resonated with millions of listeners — <em>Sanware</em>, <em>Theher Ja</em>,{" "}
              <em>Kagaz</em>. Their 2025 release <em>Kahe Mose</em> was sung by the iconic{" "}
              <b>Arijit Singh</b> at one of his concerts.
            </p>
          </Reveal>

          {/* ---------- TIMELINE ---------- */}
          <Reveal className="fp-timeline">
            <span className="fp-brief-kicker">03 · MILESTONES</span>
            <ol>
              {milestones.map((m) => (
                <li key={m.year}>
                  <span className="fp-timeline-year">{m.year}</span>
                  <div className="fp-timeline-dot" />
                  <div className="fp-timeline-copy">
                    <strong>{m.title}</strong>
                    <p>{m.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* ---------- PULL QUOTE ---------- */}
          <Reveal className="fp-pullquote">
            <Sparkles size={20} className="fp-pullquote-mark" />
            <blockquote>
              There is no <em>“perfect”</em> artist. The goal is to be an <b>honest</b> one.
            </blockquote>
            <span>— Priyansh Srivastava</span>
          </Reveal>

          <Reveal className="fp-brief-block">
            <span className="fp-brief-kicker">04 · TEACHING</span>
            <h3>Music education, beyond notes and scales.</h3>
            <p>
              Priyansh believes music education should go beyond notes, scales and techniques. The
              goal is to help students become more expressive, creative and confident with
              themselves and their art. Learning music should feel interactive and enjoyable.
            </p>
            <p>
              Whether it's songwriting exercises, performance challenges or group discussions,
              every student should leave a class feeling inspired and excited to create. That's why
              Loop is built around mentors with real, active industry experience — not just
              instructors.
            </p>
          </Reveal>

          {/* ---------- SPOTIFY ---------- */}
          <Reveal className="fp-spotify">
            <div className="fp-spotify-head">
              <span className="fp-brief-kicker">05 · LISTEN</span>
              <h3>
                <Music2 size={22} /> Popular tracks
              </h3>
              <p>
                The Garvit–Priyansh catalogue — from <em>Sanware</em> to <em>Kahe Mose</em>,
                streaming on Spotify.
              </p>
            </div>
            <div className="fp-spotify-frame">
              <iframe
                title="Garvit-Priyansh on Spotify"
                src="https://open.spotify.com/embed/artist/6pYc4P7IWYwWttTPzYkDV4?utm_source=generator&theme=0"
                height="600"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal className="fp-brief-block">
            <span className="fp-brief-kicker">06 · IN HIS WORDS</span>
            <p className="fp-brief-close">
              “My experiences in engineering, operations and entrepreneurship have taught me the
              value of discipline, consistency and lifelong learning — qualities I bring into my
              music and teaching. One thing I'd love people to take from my journey is that you
              don't have to choose between your passions. Sometimes, the most fulfilling path is
              the one where you learn to embrace them.”
            </p>
            <p className="fp-brief-close">
              “I'm excited to be a part of your musical journey, and can't wait to see the stories
              you'll tell through your art.”
            </p>
            <span className="fp-brief-sign">— Priyansh Srivastava</span>
          </Reveal>
        </div>
      </section>

      <SiteFooter page="founders" />
      <WhatsappFab />
    </main>
  );
}
