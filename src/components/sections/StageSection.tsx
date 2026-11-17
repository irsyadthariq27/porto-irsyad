"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { StageId } from "@/data/profile";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

type StageSectionProps = {
  id: StageId;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

/**
 * Kerangka tiap stage. Keycap di samping judul menunjukkan tombol angka
 * yang melompat langsung ke stage ini (lihat Hotbar). Judulnya muncul
 * sekali saat stage pertama kali masuk layar.
 */
export function StageSection({ id, title, description, children, className }: StageSectionProps) {
  const { t, c } = useI18n();
  const index = c.stages.findIndex((s) => s.id === id) + 1;

  return (
    <section
      id={id}
      data-stage
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className={cn("section-pad relative", className)}
    >
      <div className="container-x">
        <Reveal tag="header" kind="head" className="stage-head">
          <span className="keycap" title={t.sections.keycap(index)} aria-hidden="true">
            {index}
          </span>
          <div className="min-w-0">
            <h2 id={`${id}-title`}>{title}</h2>
            <p>{description}</p>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
