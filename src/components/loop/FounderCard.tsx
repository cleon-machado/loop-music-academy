import type { Founder } from "@/lib/founders-data";

type FounderCardProps = {
  founder: Founder;
  onLearnMore?: (founder: Founder) => void;
};

export function FounderCard({ founder }: FounderCardProps) {
  const { name, initials, role, photo, focus, slideFrom } = founder;

  return (
    <div className="founder-card" data-slide={slideFrom}>
      <div className="founder-photo">
        <img
          src={photo}
          alt={`${name} — ${role}`}
          className="founder-photo-img"
          style={{ objectPosition: focus }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />

        <div className="founder-overlay">
          <span className="founder-badge">{initials}</span>
          <div className="founder-meta">
            <p className="founder-name">{name}</p>
            <p className="founder-role">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
