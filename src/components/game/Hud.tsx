"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { TOTAL_COINS } from "@/data/profile";
import { useI18n } from "@/i18n/use-i18n";
import { clamp } from "@/lib/utils";
import { useGame } from "./GameProvider";
import { LangSwitch } from "./LangSwitch";
import { PixelIcon, PlayerSprite } from "./pixel";

/** Bilah status di atas layar: pemain, stage aktif, XP (progres scroll), koin, bahasa, tema, dan pengaturan. */
export function Hud() {
  const { activeId, collected, theme, toggleTheme, setSettingsOpen, goTo, play } = useGame();
  const { t, c } = useI18n();
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => setPercent(Math.round(clamp(v, 0, 1) * 100)));

  const stageIndex = Math.max(
    0,
    c.stages.findIndex((s) => s.id === activeId),
  );
  const stage = c.stages[stageIndex];

  return (
    <header className="hud">
      <div className="container-x flex h-14 items-center gap-2 sm:gap-3">
        <a
          href="#start"
          onClick={(e) => {
            e.preventDefault();
            goTo("start");
          }}
          className="flex min-w-0 items-center gap-2.5 rounded-lg"
          aria-label={t.hud.home(c.profile.handle)}
        >
          <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-xl border-[3px] border-line bg-panel-2">
            <PlayerSprite size={2} />
          </span>
          {/* Di layar sempit nama dan level disembunyikan supaya tombol di kanan tidak terdesak. */}
          <span className="hidden min-w-0 leading-tight min-[440px]:block">
            <span className="block truncate font-pixel text-lg font-semibold">{c.profile.handle}</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-soft">
              <span className="flex-none font-pixel text-sm text-ink">
                {t.hud.level}{" "}
                <span key={stageIndex} className="lv-up">
                  {stageIndex + 1}
                </span>
              </span>
              <span className="truncate">{stage.label}</span>
            </span>
          </span>
        </a>

        <div className="mx-auto hidden w-full max-w-md items-center gap-3 sm:flex">
          <span className="font-pixel text-base font-semibold">{t.hud.xp}</span>
          <div
            className="xp w-full"
            role="progressbar"
            aria-label={t.hud.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div className="xp-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="w-10 text-right font-pixel text-base tabular-nums">{percent}%</span>
        </div>

        <div className="ml-auto flex flex-none items-center gap-1 min-[360px]:gap-1.5 sm:ml-0 sm:gap-2">
          <div
            className="flex items-center gap-1.5 rounded-xl border-[3px] border-line bg-panel-2 px-2 py-1 sm:px-2.5"
            title={t.hud.coinsTitle}
          >
            <PixelIcon name="coin" size={3} />
            <span className="font-pixel text-lg font-semibold tabular-nums">
              <span className="sr-only">{t.hud.coinsSr}</span>
              {collected.length}
              <span className="text-soft max-[359px]:hidden">/{TOTAL_COINS}</span>
            </span>
          </div>
          <LangSwitch />
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              toggleTheme();
              play("click");
            }}
            aria-label={theme === "day" ? t.hud.toNight : t.hud.toDay}
          >
            <PixelIcon name={theme === "day" ? "moon" : "sun"} size={3} />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setSettingsOpen(true)}
            aria-label={t.hud.openSettings}
            aria-haspopup="dialog"
          >
            <PixelIcon name="gear" size={3} />
          </button>
        </div>
      </div>
      <div className="xp-strip sm:hidden" aria-hidden="true">
        <div className="h-full bg-mint transition-[width] duration-200" style={{ width: `${percent}%` }} />
      </div>
    </header>
  );
}
