"use client";

import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BonusCoin } from "@/components/game/BonusCoin";
import { useGame } from "@/components/game/GameProvider";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/use-i18n";
import { StageSection } from "./StageSection";

type Field = "name" | "email" | "message";
/** Disimpan sebagai kunci, bukan teks, supaya pesan ikut berganti saat bahasa diganti. */
type ErrorKey = "errName" | "errEmailEmpty" | "errEmailInvalid" | "errMessage";
type Errors = Partial<Record<Field, ErrorKey>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Logo tiap tautan sosial. Kuncinya adalah nilai `short` di profile.ts. */
const SOCIAL_ICONS: Record<string, IconType> = {
  GH: FaGithub,
  IN: FaLinkedinIn,
  X: FaXTwitter,
  IG: FaInstagram,
  TT: FaTiktok,
};

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "errName";
  if (!values.email.trim()) errors.email = "errEmailEmpty";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "errEmailInvalid";
  if (values.message.trim().length < 10) errors.message = "errMessage";
  return errors;
}

export function Contact() {
  const { play } = useGame();
  const { t, c } = useI18n();
  const { profile } = c;
  const k = t.contact;
  const s = t.sections.contact;
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const refs = useRef<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>({
    name: null,
    email: null,
    message: null,
  });
  const copyTimer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (sent) setSent(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }
    const subject = k.subject(values.name.trim());
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    play("unlock");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      play("coin");
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt(k.copyPrompt, profile.email);
    }
  };

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    value: values[field],
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(field, e.target.value),
    className: "field",
  });

  return (
    <StageSection id="contact" title={s.title} description={s.description}>
      <BonusCoin id="bonus-contact" className="right-[8%] top-3" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal kind="slide" className="panel self-start p-5 sm:p-6">
          <h3 className="text-2xl">{k.heading}</h3>
          <p className="mt-2">{k.intro(profile.responseTime)}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="font-semibold underline decoration-2 underline-offset-4">
              {profile.email}
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-sm btn-panel">
              {copied ? k.copied : k.copy}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? k.copiedSr : ""}
            </span>
          </div>

          <p className="mt-6 text-sm font-semibold text-soft">{k.findMe}</p>
          <ul className="mt-2 flex flex-wrap gap-2.5">
            {profile.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.short];
              return (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-panel">
                    {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
                    {s.label}
                    <span className="sr-only">{k.newTab}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {profile.resumeUrl && (
            <a href={profile.resumeUrl} download className="btn btn-mint mt-6">
              {k.cv}
            </a>
          )}
        </Reveal>

        <Reveal kind="rise" delay={0.1}>
        <form onSubmit={onSubmit} noValidate className="panel p-5 sm:p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-semibold">
                {k.name}
              </label>
              <input
                {...fieldProps("name")}
                ref={(el) => {
                  refs.current.name = el;
                }}
                type="text"
                autoComplete="name"
                placeholder={k.namePlaceholder}
              />
              {errors.name && (
                <p id="contact-name-error" className="field-error">
                  {k[errors.name]}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block font-semibold">
                {k.email}
              </label>
              <input
                {...fieldProps("email")}
                ref={(el) => {
                  refs.current.email = el;
                }}
                type="email"
                autoComplete="email"
                placeholder={k.emailPlaceholder}
              />
              {errors.email && (
                <p id="contact-email-error" className="field-error">
                  {k[errors.email]}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block font-semibold">
                {k.message}
              </label>
              <textarea
                {...fieldProps("message")}
                ref={(el) => {
                  refs.current.message = el;
                }}
                rows={5}
                placeholder={k.messagePlaceholder}
              />
              {errors.message && (
                <p id="contact-message-error" className="field-error">
                  {k[errors.message]}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn">
              {k.submit}
            </button>
            <p className="text-sm text-soft" role="status">
              {sent ? k.helpSent : k.helpIdle}
            </p>
          </div>
        </form>
        </Reveal>
      </div>
    </StageSection>
  );
}
