"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { BonusCoin } from "@/components/game/BonusCoin";
import { PlayerSprite } from "@/components/game/pixel";
import { Reveal, useReveal } from "@/components/motion/Reveal";
import { profilePhoto } from "@/data/site";
import { useI18n } from "@/i18n/use-i18n";
import { StageSection } from "./StageSection";

/** Bar atribut: kotaknya menyala satu per satu seperti layar statistik saat karakter dibuat. */
function SegBar({ value, label }: { value: number; label: string }) {
  const { ref, state } = useReveal<HTMLDivElement>();
  const on = Math.round(value / 10);

  return (
    <div ref={ref} className="seg-bar" role="img" aria-label={label} data-fill={state}>
      {Array.from({ length: 10 }, (_, i) => (
        <i key={i} data-on={i < on} style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

export function About() {
  const { t, c } = useI18n();
  const { profile, about } = c;
  const s = t.sections.about;

  return (
    <StageSection id="about" title={s.title} description={s.description}>
      <BonusCoin id="bonus-about" className="right-[7%] top-6" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
        <Reveal kind="drop" className="panel p-5">
          {profilePhoto ? (
            <div className="panel-inset relative aspect-square overflow-hidden">
              <Image
                src={profilePhoto}
                alt={t.about.photoAlt(profile.name)}
                fill
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="panel-inset relative aspect-square overflow-hidden">
              <Image
                src="/foto-profil.jpeg"
                alt={`Foto ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <h3 className="mt-5 text-3xl leading-tight">{profile.name}</h3>
          <dl className="mt-4">
            {about.sheet.map((row, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-4 border-t-2 border-line py-2.5 first:border-t-0"
              >
                <dt className="text-soft">{row.key}</dt>
                <dd className="text-right font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <div className="max-w-[42rem] space-y-4 text-lg">
            {about.paragraphs.map((text, i) => (
              <Reveal key={i} kind="rise" delay={0.12 + i * 0.1}>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>

          <h3 className="mt-10 text-2xl">{t.about.attributes}</h3>
          <ul className="mt-4 space-y-3.5">
            {about.attributes.map((attr, i) => (
              <Reveal
                key={i}
                tag="li"
                kind="slide"
                delay={i * 0.08}
                className="grid items-center gap-x-4 gap-y-1.5 sm:grid-cols-[13rem_1fr_2.5rem]"
              >
                <span className="font-semibold">{attr.name}</span>
                <SegBar value={attr.value} label={t.about.attribute(attr.name, attr.value)} />
                <span className="hidden text-right font-pixel text-lg tabular-nums sm:block" aria-hidden="true">
                  {attr.value}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </StageSection>
  );
}
