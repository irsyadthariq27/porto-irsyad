"use client";

import { useState } from "react";
import { useGame } from "@/components/game/GameProvider";
import { PixelIcon } from "@/components/game/pixel";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/use-i18n";
import { StageSection } from "./StageSection";

export function Experience() {
  const { play } = useGame();
  const { t, c } = useI18n();
  const experience = c.experience;
  const s = t.sections.experience;
  const [openId, setOpenId] = useState<string | null>(experience[0].id);

  return (
    <StageSection id="experience" title={s.title} description={s.description}>
      <ol className="space-y-8">
        {experience.map((quest, index) => {
          const open = openId === quest.id;
          const last = index === experience.length - 1;
          return (
            <Reveal key={quest.id} tag="li" kind="slide" className="quest-item relative pl-12">
              {!last && <span className="quest-line" aria-hidden="true" />}
              <span className="quest-node" aria-hidden="true">
                <PixelIcon name={quest.status === "active" ? "flag" : "check"} size={2} />
              </span>

              <div className="panel">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`quest-${quest.id}`}
                    onClick={() => {
                      setOpenId(open ? null : quest.id);
                      play("click");
                    }}
                    className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-[15px] p-4 text-left sm:px-5"
                  >
                    <span className="min-w-0">
                      <span className="block font-pixel text-2xl font-semibold leading-tight">{quest.role}</span>
                      <span className="mt-0.5 block font-semibold text-soft">{quest.org}</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-soft">{quest.period}</span>
                      <span className={quest.status === "active" ? "chip" : "chip chip-flat"}>
                        {quest.status === "active" && <span className="status-dot" aria-hidden="true" />}
                        {quest.status === "active" ? t.experience.active : t.experience.done}
                      </span>
                    </span>
                  </button>
                </h3>

                <div id={`quest-${quest.id}`} className="quest-body" data-open={open} role="region" aria-label={t.experience.detail(quest.role, quest.org)}>
                  <div inert={!open}>
                    <div className="border-t-[3px] border-line px-4 pb-5 pt-4 sm:px-5">
                      <p className="max-w-[42rem]">{quest.summary}</p>
                      <h4 className="mt-5 text-xl">{t.experience.rewards}</h4>
                      <ul className="mt-2 max-w-[42rem] space-y-2">
                        {quest.rewards.map((reward) => (
                          <li key={reward} className="flex gap-3">
                            <span className="mt-2 h-2.5 w-2.5 flex-none border-2 border-line bg-[var(--coin)]" aria-hidden="true" />
                            <span>{reward}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.experience.stack}>
                        {quest.stack.map((tech) => (
                          <li key={tech} className="chip chip-flat">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </StageSection>
  );
}
