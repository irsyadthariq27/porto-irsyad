"use client";

import { AnimatePresence } from "motion/react";
import { useCallback } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { useI18n } from "@/i18n/use-i18n";
import { useGame } from "./GameProvider";

function Switch({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-semibold leading-snug">{label}</p>
        <p className="text-sm text-soft">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="switch"
      >
        <span className="switch-knob" />
      </button>
    </div>
  );
}

export function SettingsDialog() {
  const {
    settingsOpen,
    setSettingsOpen,
    theme,
    toggleTheme,
    sound,
    setSound,
    reduceMotion,
    setReduceMotion,
    retro,
    setRetro,
    resetProgress,
  } = useGame();
  const { t } = useI18n();
  const s = t.settings;

  const close = useCallback(() => setSettingsOpen(false), [setSettingsOpen]);

  return (
    <AnimatePresence>
      {settingsOpen && (
        <Dialog title={s.title} onClose={close}>
          <div className="space-y-5 p-5">
            <Switch label={s.night.label} hint={s.night.hint} checked={theme === "night"} onChange={toggleTheme} />
            <Switch label={s.sound.label} hint={s.sound.hint} checked={sound} onChange={setSound} />
            <Switch label={s.motion.label} hint={s.motion.hint} checked={reduceMotion} onChange={setReduceMotion} />
            <Switch label={s.retro.label} hint={s.retro.hint} checked={retro} onChange={setRetro} />
            <div className="border-t-[3px] border-line pt-5">
              <p className="font-semibold">{s.resetTitle}</p>
              <p className="text-sm text-soft">{s.resetHint}</p>
              <button type="button" onClick={resetProgress} className="btn btn-sm btn-berry mt-3">
                {s.resetButton}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
