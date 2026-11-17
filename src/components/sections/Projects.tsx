"use client";

import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { BonusCoin } from "@/components/game/BonusCoin";
import { useGame } from "@/components/game/GameProvider";
import { PixelIcon } from "@/components/game/pixel";
import { Dialog } from "@/components/ui/Dialog";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/data/profile";
import { useI18n } from "@/i18n/use-i18n";
import { ProjectArt } from "./ProjectArt";
import { StageSection } from "./StageSection";

function Difficulty({ level }: { level: number }) {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={t.projects.complexityOf(level)}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ opacity: i < level ? 1 : 0.22 }}>
          <PixelIcon name="star" size={2} />
        </span>
      ))}
    </span>
  );
}

/** Sampul kartu: gambar pertama. Kalau proyek tidak punya gambar, memakai ilustrasi. */
function ProjectCover({ project }: { project: Project }) {
  const { lang } = useI18n();
  const images = project.images ?? [];
  if (images.length === 0) {
    return <ProjectArt kind={project.art} tone={project.tone} className="h-40 w-full" />;
  }
  return (
    <span className="relative block h-40 w-full overflow-hidden">
      <Image
        src={images[0]}
        alt=""
        fill
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
        className="object-cover"
      />
      {images.length > 1 && (
        <span className="chip absolute bottom-2 right-2">
          {images.length} {lang === "id" ? "foto" : "photos"}
        </span>
      )}
    </span>
  );
}

/** Galeri di jendela detail: gambar besar, tombol panah, dan thumbnail. */
function ProjectGallery({ project }: { project: Project }) {
  const { lang } = useI18n();
  const images = project.images ?? [];
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <ProjectArt kind={project.art} tone={project.tone} fit="contain" className="h-48 w-full sm:h-60" />;
  }

  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);
  const label = (n: number) =>
    lang === "id"
      ? `${project.title}, gambar ${n} dari ${images.length}`
      : `${project.title}, image ${n} of ${images.length}`;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="relative h-56 w-full bg-panel-2 sm:h-80">
        <Image
          src={images[index]}
          alt={label(index + 1)}
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="btn btn-sm absolute left-2 top-1/2 -translate-y-1/2"
              onClick={() => go(-1)}
              aria-label={lang === "id" ? "Gambar sebelumnya" : "Previous image"}
            >
              <PixelIcon name="arrowL" size={2} />
            </button>
            <button
              type="button"
              className="btn btn-sm absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => go(1)}
              aria-label={lang === "id" ? "Gambar berikutnya" : "Next image"}
            >
              <PixelIcon name="arrowR" size={2} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t-[3px] border-line p-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={label(i + 1)}
              aria-current={i === index}
              className={cn(
                "relative h-14 w-20 flex-none overflow-hidden rounded-lg border-[3px]",
                i === index ? "border-coin" : "border-line opacity-70",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <div>
      <div className="border-b-[3px] border-line">
        <ProjectGallery project={project} />
      </div>
      <div className="space-y-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">{project.category}</span>
          <span className="chip chip-flat">
            {t.projects.complexity} <Difficulty level={project.difficulty} />
          </span>
        </div>
        <p className="text-lg">{project.blurb}</p>

        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="font-pixel text-xl font-semibold">{t.projects.role}</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="font-pixel text-xl font-semibold">{t.projects.challenge}</dt>
            <dd className="mt-1">{project.challenge}</dd>
          </div>
          <div>
            <dt className="font-pixel text-xl font-semibold">{t.projects.solution}</dt>
            <dd className="mt-1">{project.solution}</dd>
          </div>
        </dl>

        <div>
          <h3 className="font-pixel text-xl font-semibold">{t.projects.results}</h3>
          <ul className="mt-2 grid gap-3 sm:grid-cols-3">
            {project.results.map((r) => (
              <li key={r.label} className="stat-tile">
                <p className="font-pixel text-3xl font-semibold leading-none">{r.value}</p>
                <p className="mt-1.5 text-sm text-soft">{r.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label={t.projects.stack}>
          {project.stack.map((tech) => (
            <li key={tech} className="chip chip-flat">
              {tech}
            </li>
          ))}
        </ul>

        {(project.demo || project.repo) && (
          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-mint">
                {t.projects.demo}
                <span className="sr-only">{t.projects.newTab}</span>
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-panel">
                {t.projects.code}
                <span className="sr-only">{t.projects.newTab}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const { play } = useGame();
  const { t, c } = useI18n();
  const projects = c.projects;
  const s = t.sections.projects;
  const [openId, setOpenId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);

  return (
    <StageSection id="projects" title={s.title} description={s.description(projects.length)}>
      <BonusCoin id="bonus-projects" className="right-[9%] top-8" />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} tag="li" kind="drop" delay={(i % 3) * 0.1} className="flex">
            <button
              type="button"
              className="panel stage-card w-full"
              aria-haspopup="dialog"
              onClick={() => {
                setOpenId(project.id);
                play("click");
              }}
            >
              <span className="stage-art block">
                <ProjectCover project={project} />
              </span>
              <span className="flex flex-1 flex-col gap-3 p-4">
                <span className="flex items-center justify-between gap-2">
                  <span className="chip chip-flat">{project.category}</span>
                  <Difficulty level={project.difficulty} />
                </span>
                <span className="font-pixel text-2xl font-semibold leading-tight">{project.title}</span>
                <span className="text-soft">{project.blurb}</span>
                <span className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="chip chip-flat text-xs">
                      {tech}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <Dialog key={active.id} title={active.title} onClose={close} wide>
            <ProjectDetail project={active} />
          </Dialog>
        )}
      </AnimatePresence>
    </StageSection>
  );
}