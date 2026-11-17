"use client";

import { useGame } from "@/components/game/GameProvider";
import { Reveal } from "@/components/motion/Reveal";
import { TOTAL_COINS } from "@/data/profile";
import { useI18n } from "@/i18n/use-i18n";

export function Footer() {
  const { goTo, collected } = useGame();
  const { t, c } = useI18n();

  return (
    <footer className="pb-32 pt-6">
      <div className="container-x">
        <Reveal kind="pop" className="panel px-6 py-8 text-center">
          <p className="font-pixel text-3xl font-semibold">{t.footer.thanks}</p>
          <p className="mt-2 text-soft">{t.footer.coins(collected.length, TOTAL_COINS)}</p>
          <button type="button" className="btn mt-5" onClick={() => goTo("start")}>
            {t.footer.again}
          </button>
          <p className="mx-auto mt-6 max-w-xl text-sm text-soft">{t.footer.tip}</p>
          <p className="mt-4 text-sm text-soft">
            © {new Date().getFullYear()} {c.profile.name}. {t.footer.built}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
