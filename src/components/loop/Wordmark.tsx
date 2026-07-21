import loopLogo from "@/assets/loop-logo.png";

type WordmarkProps = { compact?: boolean };

export function Wordmark({ compact = false }: WordmarkProps) {
  return (
    <a
      className={`wordmark${compact ? " wordmark--compact" : ""}`}
      href="#top"
      aria-label="LOOP Music Academy home"
    >
      <img
        src={loopLogo}
        alt="LOOP Music Academy"
        className="wordmark-image"
        draggable={false}
      />
    </a>
  );
}
