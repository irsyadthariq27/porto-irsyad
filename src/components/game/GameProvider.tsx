"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  COLLECTOR_TARGET,
  siteAchievements,
  stages,
  type AchievementId,
  type StageId,
} from "@/data/profile";
import { contents } from "@/i18n/content";
import { LANGS, type Lang } from "@/i18n/types";
import { ui } from "@/i18n/ui";
import { playSfx, type SfxName } from "@/lib/sfx";
import type { IconName } from "./pixel";

export type Theme = "day" | "night";

export type ToastItem = {
  id: number;
  title: string;
  body?: string;
  icon: IconName;
};

type GameContextValue = {
  /** True setelah state tersimpan selesai dibaca di browser. */
  ready: boolean;
  booted: boolean;
  start: () => void;
  lang: Lang;
  setLang: (value: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  sound: boolean;
  setSound: (value: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  retro: boolean;
  setRetro: (value: boolean) => void;
  collected: string[];
  /** Mengambil koin. Mengembalikan true kalau koin ini baru pertama kali diambil. */
  collect: (id: string) => boolean;
  unlocked: AchievementId[];
  activeId: StageId;
  visited: StageId[];
  goTo: (id: StageId) => void;
  play: (name: SfxName) => void;
  toasts: ToastItem[];
  dismissToast: (id: number) => void;
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
  resetProgress: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame harus dipakai di dalam <GameProvider>.");
  return ctx;
}

const STORE_KEY = "pg:v1";
const THEME_KEY = "pg:theme";
const BOOT_KEY = "pg:booted";

type Stored = {
  lang?: Lang;
  sound?: boolean;
  reduceMotion?: boolean;
  retro?: boolean;
  collected?: string[];
  unlocked?: AchievementId[];
};

const ACHIEVEMENT_IDS = new Set<string>(siteAchievements.map((a) => a.id));

function readStore(): Stored {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Stored;
    return {
      lang: LANGS.includes(data.lang as Lang) ? data.lang : undefined,
      sound: typeof data.sound === "boolean" ? data.sound : undefined,
      reduceMotion: typeof data.reduceMotion === "boolean" ? data.reduceMotion : undefined,
      retro: typeof data.retro === "boolean" ? data.retro : undefined,
      collected: Array.isArray(data.collected)
        ? data.collected.filter((v): v is string => typeof v === "string")
        : [],
      unlocked: Array.isArray(data.unlocked)
        ? data.unlocked.filter((v): v is AchievementId => ACHIEVEMENT_IDS.has(v))
        : [],
    };
  } catch {
    return {};
  }
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [booted, setBooted] = useState(false);
  const [lang, setLangState] = useState<Lang>("id");
  const [theme, setTheme] = useState<Theme>("day");
  const [sound, setSoundState] = useState(false);
  const [reduceChoice, setReduceChoice] = useState<boolean | null>(null);
  const [osReduce, setOsReduce] = useState(false);
  const [retro, setRetro] = useState(false);
  const [collected, setCollected] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);
  const [activeId, setActiveId] = useState<StageId>("start");
  const [visited, setVisited] = useState<StageId[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const reduceMotion = reduceChoice ?? osReduce;

  const langRef = useRef<Lang>("id");
  const soundRef = useRef(false);
  const reduceRef = useRef(false);
  const collectedRef = useRef(new Set<string>());
  const unlockedRef = useRef(new Set<AchievementId>());
  const toastId = useRef(0);

  /* Baca state tersimpan satu kali setelah hidrasi. */
  useEffect(() => {
    const stored = readStore();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    collectedRef.current = new Set(stored.collected ?? []);
    unlockedRef.current = new Set(stored.unlocked ?? []);
    soundRef.current = stored.sound ?? false;
    langRef.current = stored.lang ?? "id";

    setLangState(langRef.current);
    setTheme(document.documentElement.dataset.theme === "night" ? "night" : "day");
    setSoundState(stored.sound ?? false);
    setReduceChoice(stored.reduceMotion ?? null);
    setOsReduce(media.matches);
    setRetro(stored.retro ?? false);
    setCollected([...collectedRef.current]);
    setUnlocked([...unlockedRef.current]);

    let alreadyBooted = false;
    try {
      alreadyBooted = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      /* penyimpanan sesi tidak tersedia */
    }
    setBooted(alreadyBooted);
    setReady(true);

    const onChange = (e: MediaQueryListEvent) => setOsReduce(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  /* Terapkan pengaturan ke elemen <html>. */
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.motion = reduceMotion ? "reduced" : "full";
    root.dataset.retro = String(retro);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* abaikan */
    }
  }, [ready, theme, reduceMotion, retro]);

  /* Bahasa aktif: atribut lang, judul tab, dan deskripsi halaman ikut berganti. */
  useEffect(() => {
    if (!ready) return;
    const c = contents[lang];
    document.documentElement.lang = lang;
    document.title = `${c.profile.name} | ${c.profile.role}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", c.profile.tagline);
  }, [ready, lang]);

  /* Simpan progres. */
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          lang,
          sound,
          reduceMotion: reduceChoice ?? undefined,
          retro,
          collected,
          unlocked,
        } satisfies Stored),
      );
    } catch {
      /* abaikan */
    }
  }, [ready, lang, sound, reduceChoice, retro, collected, unlocked]);

  useEffect(() => {
    reduceRef.current = reduceMotion;
  }, [reduceMotion]);

  const play = useCallback((name: SfxName) => {
    if (soundRef.current) playSfx(name);
  }, []);

  const setSound = useCallback((value: boolean) => {
    soundRef.current = value;
    setSoundState(value);
    if (value) playSfx("click");
  }, []);

  const setLang = useCallback((value: Lang) => {
    langRef.current = value;
    setLangState(value);
    if (soundRef.current) playSfx("click");
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), 4600);
    },
    [dismissToast],
  );

  const unlock = useCallback(
    (id: AchievementId, silent = false) => {
      if (unlockedRef.current.has(id)) return;
      unlockedRef.current.add(id);
      setUnlocked([...unlockedRef.current]);
      if (silent) return;
      const info = contents[langRef.current].siteAchievements.find((a) => a.id === id);
      pushToast({
        title: ui[langRef.current].toast.trophy(info?.title ?? id),
        body: info?.description,
        icon: "trophy",
      });
      play("unlock");
    },
    [pushToast, play],
  );

  const collect = useCallback(
    (id: string) => {
      if (collectedRef.current.has(id)) return false;
      collectedRef.current.add(id);
      setCollected([...collectedRef.current]);
      play("coin");
      return true;
    },
    [play],
  );

  const start = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* abaikan */
    }
    setBooted(true);
    play("start");
    /* Trofi pertama dibuka diam-diam supaya notifikasi tidak menutupi hero saat halaman baru muncul. */
    unlock("start", true);
  }, [play, unlock]);

  const goTo = useCallback(
    (id: StageId) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduceRef.current ? "auto" : "smooth", block: "start" });
      el.focus({ preventScroll: true });
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {
        /* abaikan */
      }
      play("click");
    },
    [play],
  );

  const resetProgress = useCallback(() => {
    collectedRef.current = new Set();
    unlockedRef.current = new Set();
    setCollected([]);
    setUnlocked([]);
    setRetro(false);
    const t = ui[langRef.current].toast;
    pushToast({ title: t.resetTitle, body: t.resetBody, icon: "check" });
  }, [pushToast]);

  /* Stage yang sedang aktif: bagian yang melewati garis tengah layar. */
  useEffect(() => {
    if (!ready || !booted) return;
    const targets = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id as StageId;
          setActiveId(id);
          setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]));
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready, booted]);

  useEffect(() => {
    if (visited.length >= stages.length) unlock("explorer");
  }, [visited, unlock]);

  useEffect(() => {
    if (collected.length >= COLLECTOR_TARGET) unlock("collector");
  }, [collected, unlock]);

  /* Kode rahasia klasik. */
  useEffect(() => {
    let index = 0;
        const onKey = (e: KeyboardEvent) => {
      if (typeof e.key !== "string") return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[index]) {
        index += 1;
        if (index === KONAMI.length) {
          index = 0;
          setRetro(true);
          unlock("secret");
          const t = ui[langRef.current].toast;
          pushToast({ title: t.retroTitle, body: t.retroBody, icon: "star" });
        }
      } else {
        index = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock, pushToast]);

  const value = useMemo<GameContextValue>(
    () => ({
      ready,
      booted,
      start,
      lang,
      setLang,
      theme,
      toggleTheme: () => setTheme((t) => (t === "day" ? "night" : "day")),
      sound,
      setSound,
      reduceMotion,
      setReduceMotion: (v: boolean) => setReduceChoice(v),
      retro,
      setRetro,
      collected,
      collect,
      unlocked,
      activeId,
      visited,
      goTo,
      play,
      toasts,
      dismissToast,
      settingsOpen,
      setSettingsOpen,
      resetProgress,
    }),
    [
      ready,
      booted,
      start,
      lang,
      setLang,
      theme,
      sound,
      setSound,
      reduceMotion,
      retro,
      collected,
      collect,
      unlocked,
      activeId,
      visited,
      goTo,
      play,
      toasts,
      dismissToast,
      settingsOpen,
      resetProgress,
    ],
  );

  return (
    <GameContext.Provider value={value}>
      <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>{children}</MotionConfig>
    </GameContext.Provider>
  );
}
