"use client";

import { useRef, useState } from "react";
import { BonusCoin } from "@/components/game/BonusCoin";
import { useGame } from "@/components/game/GameProvider";
import { Reveal } from "@/components/motion/Reveal";
import type { Rarity } from "@/data/profile";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { StageSection } from "./StageSection";

function Pips({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {Array.from({ length: 4 }, (_, i) => (
        <i
          key={i}
          className="h-2.5 w-2.5 border-2 border-line"
          style={{ background: i < count ? "var(--rarity)" : "transparent" }}
        />
      ))}
    </span>
  );
}

export function Skills() {
  const { play } = useGame();
  const { t, c } = useI18n();
  const { skillGroups, rarityInfo } = c;
  const s = t.sections.skills;

  const [groupId, setGroupId] = useState(skillGroups[0].id);
  const [selectedId, setSelectedId] = useState(skillGroups[0].items[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const group = skillGroups.find((g) => g.id === groupId) ?? skillGroups[0];
  const selected = group.items.find((i) => i.id === selectedId) ?? group.items[0];

  const selectGroup = (index: number) => {
    const next = skillGroups[index];
    setGroupId(next.id);
    setSelectedId(next.items[0].id);
    play("click");
  };

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % skillGroups.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + skillGroups.length) % skillGroups.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = skillGroups.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectGroup(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <StageSection id="skills" title={s.title} description={s.description}>
      <BonusCoin id="bonus-skills" className="right-[5%] top-4" />
      <div className="grid gap-6 lg:grid-cols-[1fr_21rem]">
        <Reveal kind="drop" className="panel p-4 sm:p-5 lg:col-start-1 lg:row-start-1">
          <div role="tablist" aria-label={t.skills.categories} className="flex flex-wrap gap-2.5">
            {skillGroups.map((g, i) => {
              const active = g.id === groupId;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`skill-tab-${g.id}`}
                  aria-selected={active}
                  aria-controls="skill-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectGroup(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn("btn btn-sm", !active && "btn-panel")}
                >
                  {g.label}
                </button>
              );
            })}
          </div>

          <ul
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${group.id}`}
            className="mt-5 grid gap-x-3 gap-y-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(4rem, 1fr))" }}
          >
            {/* Item baru "masuk inventori" satu per satu, termasuk saat pindah kategori. */}
            {group.items.map((item, i) => (
              <Reveal
                key={item.id}
                tag="li"
                kind="pop"
                playIfVisible
                rarity={item.rarity}
                delay={Math.min(i, 9) * 0.045}
                className="text-center"
              >
                <button
                  type="button"
                  className="slot"
                  aria-pressed={item.id === selected.id}
                  aria-label={t.skills.slot(item.name, rarityInfo[item.rarity].label)}
                  onClick={() => {
                    setSelectedId(item.id);
                    play("click");
                  }}
                >
                  <span aria-hidden="true">{item.abbr}</span>
                  <span className="slot-pips" aria-hidden="true">
                    {Array.from({ length: rarityInfo[item.rarity].pips }, (_, n) => (
                      <i key={n} />
                    ))}
                  </span>
                </button>
                <span className="mt-1.5 block text-xs font-semibold leading-tight text-soft" aria-hidden="true">
                  {item.name}
                </span>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <Reveal kind="rise" delay={0.08} className="self-start lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <aside
            className="panel p-5"
            data-rarity={selected.rarity}
            aria-live="polite"
            aria-label={t.skills.detail}
            style={{ borderColor: "var(--rarity)" }}
          >
            <div className="flex items-center gap-4">
              <span
                key={selected.id}
                className="item-swap grid h-16 w-16 flex-none place-items-center rounded-[14px] border-[3px] border-line font-pixel text-3xl font-semibold text-[var(--on-color)]"
                style={{ background: "var(--rarity)" }}
                aria-hidden="true"
              >
                {selected.abbr}
              </span>
              <div className="min-w-0">
                <h3 className="text-2xl leading-tight">{selected.name}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <Pips count={rarityInfo[selected.rarity].pips} />
                  {rarityInfo[selected.rarity].label}
                </p>
              </div>
            </div>
            <p className="mt-4">{selected.note}</p>
            <p className="mt-3 text-sm text-soft">{rarityInfo[selected.rarity].meaning}</p>
          </aside>
        </Reveal>

        <Reveal kind="rise" delay={0.12} className="panel p-4 sm:p-5 lg:col-start-1 lg:row-start-2">
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {(Object.keys(rarityInfo) as Rarity[]).map((key) => (
              <div key={key} data-rarity={key} className="flex items-center gap-2.5">
                <dt className="flex items-center gap-2 font-semibold">
                  <Pips count={rarityInfo[key].pips} />
                  {rarityInfo[key].label}
                </dt>
                <dd className="text-soft">{rarityInfo[key].meaning}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </StageSection>
  );
}
