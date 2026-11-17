"use client";

import { useI18n } from "@/i18n/use-i18n";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main"
      className="btn btn-sm sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70]"
    >
      {t.skip}
    </a>
  );
}
