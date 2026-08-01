import { Wordmark } from "@/components/loop/Wordmark";

type SiteFooterProps = {
  page?: "home" | "piano" | "guitar" | "songwriting" | "vocal" | "founders";
};

export function SiteFooter({ page = "home" }: SiteFooterProps) {
  const isHome = page === "home";
  const coursesHref = isHome ? "#courses" : "/#courses";
  const foundersHref = "/founders";
  const bookHref = isHome ? "#book" : "/#book";

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Wordmark />
          <p>A modern music academy for the curious, the committed and everyone in between.</p>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Founders</span>
          <span>Mithilesh Panchal · Vocals</span>
          <span>Garvit Soni · Guitar</span>
          <span>Priyansh Srivastava · Piano</span>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Explore</span>
          <a href={coursesHref}>Courses</a>
          <a href={foundersHref}>Founders</a>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Follow</span>
          <a href="/#top">Instagram</a>
          <a href="/#top">YouTube</a>
          <a href="mailto:hello@loopmusic.academy">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 LOOP Music Academy</span>
        <span>Bengaluru, India</span>
      </div>
    </footer>
  );
}
