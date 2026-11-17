import {
  about as baseAbout,
  awards as baseAwards,
  experience as baseExperience,
  profile as baseProfile,
  projects as baseProjects,
  rarityInfo as baseRarity,
  siteAchievements as baseAchievements,
  skillGroups as baseSkillGroups,
  stages as baseStages,
  type Rarity,
} from "@/data/profile";
import { en } from "@/data/profile.en";
import type { Content, Lang, Overlay } from "./types";

/** Bahasa Indonesia: isi profile.ts apa adanya. */
const indonesian: Content = {
  stages: baseStages,
  profile: baseProfile,
  about: baseAbout,
  rarityInfo: baseRarity,
  skillGroups: baseSkillGroups,
  experience: baseExperience,
  projects: baseProjects,
  awards: baseAwards,
  siteAchievements: baseAchievements,
};

/** Menerapkan terjemahan di atas konten dasar. Bagian yang tidak diterjemahkan dibiarkan seperti aslinya. */
function localize(base: Content, o: Overlay): Content {
  const rarities = Object.keys(base.rarityInfo) as Rarity[];

  return {
    stages: base.stages.map((s) => ({ ...s, label: o.stageLabels?.[s.id] ?? s.label })),

    profile: {
      ...base.profile,
      role: o.profile?.role ?? base.profile.role,
      tagline: o.profile?.tagline ?? base.profile.tagline,
      availability: o.profile?.availability ?? base.profile.availability,
      location: o.profile?.location ?? base.profile.location,
      responseTime: o.profile?.responseTime ?? base.profile.responseTime,
      heroFacts: o.profile?.heroFacts ?? base.profile.heroFacts,
    },

    about: {
      paragraphs: o.about?.paragraphs ?? base.about.paragraphs,
      sheet: base.about.sheet.map((row, i) => ({
        key: o.about?.sheet?.[i]?.key ?? row.key,
        value: o.about?.sheet?.[i]?.value ?? row.value,
      })),
      attributes: base.about.attributes.map((attr, i) => ({
        ...attr,
        name: o.about?.attributes?.[i] ?? attr.name,
      })),
    },

    rarityInfo: Object.fromEntries(
      rarities.map((r) => [
        r,
        {
          ...base.rarityInfo[r],
          label: o.rarity?.[r]?.label ?? base.rarityInfo[r].label,
          meaning: o.rarity?.[r]?.meaning ?? base.rarityInfo[r].meaning,
        },
      ]),
    ) as Content["rarityInfo"],

    skillGroups: base.skillGroups.map((group) => ({
      ...group,
      label: o.skillGroups?.[group.id] ?? group.label,
      items: group.items.map((item) => ({
        ...item,
        name: o.skills?.[item.id]?.name ?? item.name,
        note: o.skills?.[item.id]?.note ?? item.note,
      })),
    })),

    experience: base.experience.map((quest) => {
      const t = o.experience?.[quest.id];
      return {
        ...quest,
        role: t?.role ?? quest.role,
        org: t?.org ?? quest.org,
        period: t?.period ?? quest.period,
        summary: t?.summary ?? quest.summary,
        rewards: t?.rewards ? [...t.rewards] : quest.rewards,
      };
    }),

    projects: base.projects.map((project) => {
      const t = o.projects?.[project.id];
      if (!t) return project;
      return {
        ...project,
        title: t.title ?? project.title,
        category: t.category ?? project.category,
        blurb: t.blurb ?? project.blurb,
        role: t.role ?? project.role,
        challenge: t.challenge ?? project.challenge,
        solution: t.solution ?? project.solution,
        results: project.results.map((r, i) => ({
          value: t.results?.[i]?.value ?? r.value,
          label: t.results?.[i]?.label ?? r.label,
        })),
      };
    }),

    awards: base.awards.map((award) => ({
      ...award,
      title: o.awards?.[award.id]?.title ?? award.title,
      year: o.awards?.[award.id]?.year ?? award.year,
      note: o.awards?.[award.id]?.note ?? award.note,
    })),

    siteAchievements: base.siteAchievements.map((item) => ({
      ...item,
      title: o.siteAchievements?.[item.id]?.title ?? item.title,
      description: o.siteAchievements?.[item.id]?.description ?? item.description,
    })),
  };
}

export const contents: Record<Lang, Content> = {
  id: indonesian,
  en: localize(indonesian, en),
};
