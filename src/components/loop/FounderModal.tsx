import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Founder } from "@/lib/founders-data";

type FounderModalProps = {
  founder: Founder | null;
  onOpenChange: (open: boolean) => void;
};

export function FounderModal({ founder, onOpenChange }: FounderModalProps) {
  return (
    <DialogPrimitive.Root open={!!founder} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="founder-modal-overlay" />
        <DialogPrimitive.Content className="founder-modal-content" aria-describedby={undefined}>
          {founder && (
            <>
              <div className="founder-modal-photo">
                <img
                  src={founder.photo}
                  alt={`${founder.name} — ${founder.role}`}
                  style={{ objectPosition: founder.focus }}
                  draggable={false}
                />
              </div>
              <div className="founder-modal-body">
                <DialogPrimitive.Close className="founder-modal-close" aria-label="Close">
                  <X size={16} />
                </DialogPrimitive.Close>
                <span className="founder-modal-tag">
                  {founder.instrument.toUpperCase()} · FOUNDER
                </span>
                <DialogPrimitive.Title className="founder-modal-name">
                  {founder.name}
                </DialogPrimitive.Title>
                <p className="founder-modal-bio">{founder.bio}</p>
                <div className="founder-modal-highlights">
                  {founder.highlights.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="founder-modal-actions">
                  {founder.coursePath && (
                    <Link to={founder.coursePath} className="button button-primary">
                      View {founder.instrument} course <ArrowUpRight size={15} />
                    </Link>
                  )}
                  <a href="mailto:hello@loopmusic.academy" className="button button-quiet">
                    Book a session with {founder.name.split(" ")[0]}
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
