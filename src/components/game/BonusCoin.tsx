"use client";

import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { useGame } from "./GameProvider";
import { PixelIcon } from "./pixel";

/** Koin bonus tersembunyi. Posisinya diatur lewat className oleh pemanggil (absolute). */
export function BonusCoin({ id, className }: { id: string; className?: string }) {
  const { ready, collected, collect } = useGame();
  const { t } = useI18n();
  if (!ready || collected.includes(id)) return null;

  return (
    <button
      type="button"
      className={cn("bonus-coin", className)}
      onClick={() => collect(id)}
      aria-label={t.bonusCoin}
    >
      <PixelIcon name="coin" size={4} />
    </button>
  );
}
