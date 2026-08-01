import mithileshPhoto from "@/assets/founders/mithilesh-panchal.png";
import priyanshPhoto from "@/assets/founders/priyansh.jpeg";
import garvitPhoto from "@/assets/founders/garvit.png";

// Preload founder photos as soon as this module is imported so the cards
// never render with a blank placeholder while the image is fetching.
if (typeof window !== "undefined") {
  [mithileshPhoto, priyanshPhoto, garvitPhoto].forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
}


export type SlideDirection = "left" | "right" | "top";

export type Founder = {
  id: string;
  name: string;
  initials: string;
  role: string;
  instrument: string;
  photo: string;
  focus: string;
  slideFrom: SlideDirection;
  bio: string;
  highlights: string[];
  coursePath?: string;
};

export const founders: Founder[] = [
  {
    id: "mithilesh",
    name: "Mithilesh Panchal",
    initials: "MP",
    role: "Vocals · Founder",
    instrument: "Vocals",
    photo: mithileshPhoto,
    focus: "50% 20%",
    slideFrom: "right",
    bio: "Mithilesh built Loop's vocals programme the way he wishes he'd been taught — structured, stage-focused, and centred on your voice as it actually is. He still performs regularly across the live circuit, and brings that same stage discipline into every mentor session, from first raag to full performance.",
    highlights: ["15+ yrs performing", "Hindustani & Bollywood", "Founding vocal mentor"],
  },
  {
    id: "garvit",
    name: "Garvit Soni",
    initials: "GS",
    role: "Guitar · Founder",
    instrument: "Guitar",
    photo: garvitPhoto,
    focus: "50% 18%",
    slideFrom: "top",
    bio: "Garvit founded Loop's guitar programme around one idea: technique should serve the song, not the other way round. Across acoustic, electric and fingerstyle styles, he builds each learner's plan around the music they actually want to play — and the stage they want to eventually play it on.",
    highlights: [
      "Acoustic · Electric · Fingerstyle",
      "Founding guitar mentor",
      "Practical, stage-first teaching",
    ],
  },
  {
    id: "priyansh",
    name: "Priyansh Srivastava",
    initials: "PS",
    role: "Piano · Founder",
    instrument: "Piano",
    photo: priyanshPhoto,
    focus: "50% 28%",
    slideFrom: "left",
    bio: "Priyansh has spent over a decade at the piano — from classical foundations to composing for contemporary sets — and founded Loop's piano programme to make that same structured, stage-tested learning available online. He still performs regularly, which is why every lesson is built around what actually works when you sit down to play, not just what looks good on paper.",
    highlights: [
      "10+ yrs performing",
      "Contemporary & classical",
      "Designed the 16-session piano curriculum",
    ],
    coursePath: "/piano",
  },
];
