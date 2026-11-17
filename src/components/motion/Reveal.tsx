"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * idle   : keadaan awal (server dan elemen yang sudah terlihat). Elemen tampil biasa.
 * hidden : elemen di bawah layar, disembunyikan menunggu giliran.
 * shown  : elemen sudah masuk layar, animasinya dimainkan satu kali.
 */
export type RevealState = "idle" | "hidden" | "shown";

/**
 * pop   : muncul membesar seperti item yang jatuh ke inventori
 * drop  : jatuh dari atas lalu memantul seperti blok
 * slide : masuk dari kiri
 * rise  : naik pelan
 * head  : judul stage (tombol angka, judul, deskripsi)
 */
export type RevealKind = "pop" | "drop" | "slide" | "rise" | "head";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Mengamati satu elemen. Yang sudah terlihat saat dipasang dibiarkan apa adanya
 * (kecuali playIfVisible), yang di bawah layar disembunyikan lalu dimainkan saat
 * pertama kali masuk layar.
 */
export function useReveal<T extends HTMLElement>(options: { playIfVisible?: boolean } = {}) {
  const { playIfVisible = false } = options;
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("idle");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (visible) {
      if (playIfVisible) setState("shown");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playIfVisible]);

  return { ref, state };
}

type RevealProps = {
  tag?: "div" | "li" | "header";
  kind?: RevealKind;
  /** Jeda dalam detik, untuk menyusun giliran antar item dalam satu baris. */
  delay?: number;
  /** Mainkan animasi walau elemen sudah terlihat saat dipasang (misalnya saat ganti tab). */
  playIfVisible?: boolean;
  className?: string;
  style?: CSSProperties;
  rarity?: string;
  children: ReactNode;
};

export function Reveal({
  tag = "div",
  kind = "rise",
  delay = 0,
  playIfVisible,
  className,
  style,
  rarity,
  children,
}: RevealProps) {
  const { ref, state } = useReveal<HTMLElement>({ playIfVisible });
  const Component = tag as ElementType;

  return (
    <Component
      ref={ref}
      data-rv={state}
      data-rarity={rarity}
      className={cn(`rv-${kind}`, className)}
      style={{ ...style, "--rv-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
