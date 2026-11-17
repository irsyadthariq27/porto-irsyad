"use client";

import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

/** Tombol ganti bahasa: dua sel ID dan EN, yang aktif diberi warna. */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <button
      type="button"
      className={cn("lang-switch", className)}
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      aria-label={t.lang.switchTo}
    >
      <span className="lang-cell" data-active={lang === "id"} aria-hidden="true">
        ID
      </span>
      <span className="lang-cell" data-active={lang === "en"} aria-hidden="true">
        EN
      </span>
    </button>
  );
}
