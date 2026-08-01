import { ChevronDown, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/loop/Wordmark";

type SiteNavProps = {
  /** Which page this nav is rendered on — controls whether section links
   * are same-page anchors or cross-page anchors back to "/". */
  page?: "home" | "piano" | "guitar" | "songwriting" | "vocal" | "founders";
};

export function SiteNav({ page = "home" }: SiteNavProps) {
  const isHome = page === "home";
  const coursesHref = isHome ? "#courses" : "/#courses";
  void isHome;

  return (
    <nav className="nav">
      <Wordmark compact />
      <div className="nav-links">
        <div className="nav-dropdown">
          <button type="button" className="nav-dropdown-trigger" aria-haspopup="true">
            Courses <ChevronDown size={13} className="nav-dropdown-chev" />
          </button>
          <div className="nav-dropdown-menu" role="menu">
            <Link to="/piano" role="menuitem" style={{ ["--i" as string]: 0 }}>
              <span className="nav-dropdown-dot" /> Piano
            </Link>
            <Link to="/guitar" role="menuitem" style={{ ["--i" as string]: 1 }}>
              <span className="nav-dropdown-dot" /> Guitar
            </Link>
            <Link to="/vocal" role="menuitem" style={{ ["--i" as string]: 2 }}>
              <span className="nav-dropdown-dot" /> Vocal
            </Link>
            <Link to="/songwriting" role="menuitem" style={{ ["--i" as string]: 3 }}>
              <span className="nav-dropdown-dot" /> Songwriting
            </Link>
          </div>
        </div>
        <Link to="/founders">Founders</Link>
        <span className="nav-link-accent">1:1 Session</span>

      </div>
      <div className="nav-right">
        <button className="menu-button" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
