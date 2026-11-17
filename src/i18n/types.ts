import type { IconName } from "@/components/game/pixel";
import type { AchievementId, Project, Quest, Rarity, Skill, StageId } from "@/data/profile";

export type Lang = "id" | "en";
export const LANGS: readonly Lang[] = ["id", "en"];

/** Bentuk konten yang dipakai komponen, apa pun bahasanya. */
export type Content = {
  stages: readonly { id: StageId; label: string; icon: IconName }[];
  profile: {
    name: string;
    handle: string;
    role: string;
    tagline: string;
    availability: string;
    location: string;
    email: string;
    resumeUrl: string;
    responseTime: string;
    socials: readonly { label: string; short: string; href: string }[];
    heroFacts: readonly string[];
  };
  about: {
    paragraphs: readonly string[];
    sheet: readonly { key: string; value: string }[];
    attributes: readonly { name: string; value: number }[];
  };
  rarityInfo: Record<Rarity, { label: string; meaning: string; pips: number }>;
  skillGroups: readonly { id: string; label: string; items: readonly Skill[] }[];
  experience: readonly Quest[];
  projects: readonly Project[];
  awards: readonly { id: string; title: string; year: string; note: string }[];
  siteAchievements: readonly { id: AchievementId; title: string; description: string }[];
};

/**
 * Lapisan terjemahan. Hanya teks yang perlu diterjemahkan, dikunci dengan `id`
 * yang sama seperti di profile.ts. Angka, tautan, email, dan teknologi tetap
 * diambil dari profile.ts. Entri yang tidak ada di sini memakai teks aslinya.
 */
export type Overlay = {
  stageLabels?: Partial<Record<StageId, string>>;
  profile?: {
    role?: string;
    tagline?: string;
    availability?: string;
    location?: string;
    responseTime?: string;
    heroFacts?: readonly string[];
  };
  about?: {
    paragraphs?: readonly string[];
    /** Urutannya sama dengan `about.sheet` di profile.ts. */
    sheet?: readonly { key: string; value: string }[];
    /** Urutannya sama dengan `about.attributes` di profile.ts. */
    attributes?: readonly string[];
  };
  rarity?: Partial<Record<Rarity, { label?: string; meaning?: string }>>;
  /** Kunci: id grup skill. */
  skillGroups?: Record<string, string>;
  /** Kunci: id skill. */
  skills?: Record<string, { name?: string; note?: string }>;
  /** Kunci: id misi. */
  experience?: Record<
    string,
    { role?: string; org?: string; period?: string; summary?: string; rewards?: readonly string[] }
  >;
  /** Kunci: id proyek. `results` urutannya sama dengan di profile.ts. */
  projects?: Record<
    string,
    {
      title?: string;
      category?: string;
      blurb?: string;
      role?: string;
      challenge?: string;
      solution?: string;
      results?: readonly { value?: string; label: string }[];
    }
  >;
  /** Kunci: id penghargaan. */
  awards?: Record<string, { title?: string; year?: string; note?: string }>;
  /** Kunci: id trofi situs. */
  siteAchievements?: Record<string, { title?: string; description?: string }>;
};
