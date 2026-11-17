"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/use-i18n";
import { useGame } from "./GameProvider";
import { PixelIcon } from "./pixel";

/** Navigasi bawah bergaya hotbar. Tombol angka 1 sampai 7 juga berfungsi sebagai pintasan. */
export function Hotbar() {
  const { activeId, goTo } = useGame();
  const { t, c } = useI18n();
  const stages = c.stages;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (document.querySelector("[role='dialog']")) return;
      const index = Number(e.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < stages.length) {
        e.preventDefault();
        goTo(stages[index].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, stages]);

  return (
    <nav
      aria-label={t.hotbar.nav}
      className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2 sm:bottom-4"
    >
      <ul className="panel flex items-center gap-1.5 px-2 py-2 sm:gap-2 sm:px-2.5">
        {stages.map((stage, i) => {
          const active = stage.id === activeId;
          return (
            <li key={stage.id}>
              <a
                href={`#${stage.id}`}
                className="hotbar-item"
                aria-current={active ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(stage.id);
                }}
              >
                <PixelIcon name={stage.icon} size={3} />
                <span className="hotbar-key" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="hotbar-tip" aria-hidden="true">
                  {stage.label}
                </span>
                <span className="sr-only">{stage.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
