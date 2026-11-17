"use client";

import { BonusCoin } from "@/components/game/BonusCoin";
import { useGame } from "@/components/game/GameProvider";
import { PixelIcon } from "@/components/game/pixel";
import { Reveal } from "@/components/motion/Reveal";
import { COLLECTOR_TARGET, TOTAL_COINS } from "@/data/profile";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { StageSection } from "./StageSection";

export function Achievements() {
  const { unlocked, collected } = useGame();
  const { t, c } = useI18n();
  const { awards, siteAchievements } = c;
  const s = t.sections.achievements;

  return (
    <StageSection id="achievements" title={s.title} description={s.description}>
      <BonusCoin id="bonus-trophy" className="right-[6%] top-5" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl">{t.achievements.awards}</h3>
          <ul className="mt-4 space-y-4">
            {awards.map((award, i) => (
              <Reveal key={award.id} tag="li" kind="slide" delay={i * 0.1} className="panel flex gap-4 p-4">
                <span className="panel-inset grid h-14 w-14 flex-none place-items-center">
                  <PixelIcon name="trophy" size={4} />
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-pixel text-xl font-semibold leading-tight">{award.title}</span>
                    <span className="chip chip-flat">{award.year}</span>
                  </p>
                  <p className="mt-1 text-soft">{award.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">{t.achievements.site}</h3>
          <p className="mt-1 text-soft">
            {t.achievements.progress(unlocked.length, siteAchievements.length, collected.length, TOTAL_COINS)}
          </p>
          <ul className="mt-4 space-y-4">
            {siteAchievements.map((item, i) => {
              const done = unlocked.includes(item.id);
              return (
                /* Opasitas trofi terkunci dipasang pada panel di dalam, bukan pada pembungkus animasi. */
                <Reveal key={item.id} tag="li" kind="pop" delay={i * 0.08}>
                  <div className={cn("panel flex items-center gap-4 p-4", !done && "opacity-80")}>
                    <span className="panel-inset grid h-14 w-14 flex-none place-items-center">
                      <PixelIcon name={done ? "trophy" : "lock"} size={4} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-pixel text-xl font-semibold leading-tight">{item.title}</p>
                      <p className="text-sm text-soft">
                        {item.id === "collector" ? t.achievements.collector(COLLECTOR_TARGET) : item.description}
                      </p>
                    </div>
                    <span className={done ? "chip" : "chip chip-flat"}>
                      {done ? t.achievements.unlocked : t.achievements.locked}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </StageSection>
  );
}
