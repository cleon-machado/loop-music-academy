import { Link } from "@tanstack/react-router";
import loopLogo from "@/assets/loop-logo.png";

type WordmarkProps = { compact?: boolean };

export function Wordmark({ compact = false }: WordmarkProps) {
  return (
    <Link
      className={`wordmark${compact ? " wordmark--compact" : ""}`}
      to="/"
      aria-label="LOOP Music Academy home"
    >
      <img src={loopLogo} alt="LOOP Music Academy" className="wordmark-image" draggable={false} />
    </Link>
  );
}
