"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/use-i18n";
import { useGame } from "./GameProvider";
import { LangSwitch } from "./LangSwitch";
import { PixelIcon, PlayerSprite } from "./pixel";

const CELLS = 12;

/** Layar pembuka: memuat aset palsu sebentar, lalu menunggu pemain menekan mulai. */
export function BootScreen() {
  const { ready, booted, start, sound, setSound, reduceMotion } = useGame();
  const { t, c } = useI18n();
  const [progress, setProgress] = useState(0);
  const startButton = useRef<HTMLButtonElement>(null);
  const startedHere = useRef(false);
  const done = progress >= 100;
  const messages = t.boot.messages;

  useEffect(() => {
    if (!ready || booted) return;
    if (reduceMotion) {
      setProgress(100);
      return;
    }
    const timer = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + 6 + Math.random() * 10));
    }, 110);
    return () => window.clearInterval(timer);
  }, [ready, booted, reduceMotion]);

  /* Kunci scroll dan nonaktifkan halaman di belakang selama layar pembuka tampil. */
  useEffect(() => {
    if (!ready || booted) return;
    const root = document.getElementById("app-root");
    const prevOverflow = document.documentElement.style.overflow;
    root?.setAttribute("inert", "");
    document.documentElement.style.overflow = "hidden";
    return () => {
      root?.removeAttribute("inert");
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [ready, booted]);

  useEffect(() => {
    if (done && !booted) startButton.current?.focus();
  }, [done, booted]);

  const filled = Math.round((Math.min(progress, 100) / 100) * CELLS);
  const message = messages[Math.min(messages.length - 1, Math.floor((progress / 100) * messages.length))];

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => {
        if (startedHere.current) document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      {!booted && (
        <motion.div
          key="boot"
          className="boot"
          role="dialog"
          aria-modal="true"
          aria-label={t.boot.dialog}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
        >
          {/* Teks disembunyikan sampai bahasa tersimpan terbaca, supaya tidak berkedip dari bahasa lain. */}
          <div
            className="absolute inset-x-4 top-4 flex items-start justify-between gap-3"
            style={{ visibility: ready ? "visible" : "hidden" }}
          >
            <LangSwitch />
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              aria-pressed={sound}
              onClick={() => setSound(!sound)}
            >
              <PixelIcon name={sound ? "speaker" : "mute"} size={2} />
              {sound ? t.boot.soundOn : t.boot.soundOff}
            </button>
          </div>

          <div
            className="mx-auto w-full max-w-xl py-10 text-center"
            style={{ visibility: ready ? "visible" : "hidden" }}
          >
            <PlayerSprite size={6} className="mx-auto" />
            <p className="title-3d mt-8" style={{ fontSize: "clamp(2.4rem, 10vw, 4.75rem)" }}>
              {c.profile.name}
            </p>
            <p className="mt-6 text-lg text-[#c4bef2]">{t.boot.subtitle(c.profile.role)}</p>

            <div
              className="mt-10"
              role="progressbar"
              aria-label={t.boot.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(Math.min(progress, 100))}
            >
              <div className="boot-cells">
                {Array.from({ length: CELLS }, (_, i) => (
                  <i key={i} data-on={i < filled} />
                ))}
              </div>
            </div>
            <p className="mt-3 min-h-7 font-pixel text-lg" aria-live="polite">
              {done ? t.boot.ready : `${message}...`}
            </p>

            <div className="mt-8 min-h-[7.5rem]">
              {done && (
                <>
                  <button
                    ref={startButton}
                    type="button"
                    className="btn btn-coin px-8 py-4 text-2xl"
                    onClick={() => {
                      startedHere.current = true;
                      start();
                    }}
                  >
                    <span className="blink" aria-hidden="true">
                      <PixelIcon name="arrowR" size={3} />
                    </span>
                    {t.boot.start}
                  </button>
                  <p className="mt-4 text-sm text-[#c4bef2]">{t.boot.hint}</p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
