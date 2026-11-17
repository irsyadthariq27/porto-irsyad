"use client";

import { useGame } from "@/components/game/GameProvider";
import { contents } from "./content";
import { ui } from "./ui";

/** Bahasa aktif, teks antarmuka (t), dan isi portofolio (c) dalam bahasa tersebut. */
export function useI18n() {
  const { lang, setLang } = useGame();
  return { lang, setLang, t: ui[lang], c: contents[lang] };
}
