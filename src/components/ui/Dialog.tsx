"use client";

import { motion } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

/**
 * Dialog modal yang bisa dipakai keyboard: fokus terkunci di dalam,
 * Esc menutup, latar belakang tidak bisa discroll, dan fokus kembali
 * ke tombol pemicu saat ditutup.
 */
export function Dialog({ title, onClose, children, wide = false }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const titleId = useId();
  const { t } = useI18n();

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.getElementById("app-root");
    const prevOverflow = document.documentElement.style.overflow;

    root?.setAttribute("inert", "");
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root?.removeAttribute("inert");
      document.documentElement.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-[rgba(10,8,38,0.68)]" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn("panel relative max-h-[90vh] w-full overflow-y-auto outline-none", wide ? "max-w-3xl" : "max-w-md")}
        initial={{ y: 28, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-[3px] border-line bg-panel px-5 py-3">
          <h2 id={titleId} className="text-2xl font-semibold leading-tight">
            {title}
          </h2>
          <button type="button" onClick={onClose} className="btn btn-sm btn-panel">
            {t.dialog.close}
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
