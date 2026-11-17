"use client";

import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/i18n/use-i18n";
import { useGame } from "./GameProvider";
import { PixelIcon } from "./pixel";

/** Notifikasi singkat: trofi terbuka, mode rahasia, dan semacamnya. */
export function Toasts() {
  const { toasts, dismissToast } = useGame();
  const { t } = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed right-3 top-[4.75rem] z-50 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col gap-3"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 48, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="toast panel pointer-events-auto flex items-start gap-3 px-3.5 py-3"
          >
            <span className="mt-0.5 flex-none">
              <PixelIcon name={toast.icon} size={4} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-pixel text-lg font-semibold leading-tight">{toast.title}</p>
              {toast.body && <p className="mt-0.5 text-sm text-soft">{toast.body}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="flex-none rounded-md px-1.5 text-sm font-semibold text-soft hover:text-ink"
              aria-label={t.toast.dismiss}
            >
              {t.toast.close}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
