"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useGame } from "@/components/game/GameProvider";
import { PixelCloud, PixelIcon, PlayerSprite, PLAYER_SIZE } from "@/components/game/pixel";
import { useI18n } from "@/i18n/use-i18n";
import { clamp } from "@/lib/utils";

const GROUND = 56;
const SCALE = 4;
const PLAYER_W = PLAYER_SIZE.cols * SCALE;
const PLAYER_H = PLAYER_SIZE.rows * SCALE;
const BLOCK = 48;
/** Tinggi sisi bawah blok dari permukaan tanah. */
const BLOCK_BOTTOM = 110;
const BLOCK_POSITIONS = [0.2, 0.5, 0.8];
const SPEED = 230;
const JUMP_V = 640;
const GRAVITY = 1900;

type Action = "left" | "right" | "jump";

/** Urutan kemunculan elemen hero setelah tombol "Mulai main". */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

type Sim = {
  x: number;
  y: number;
  vy: number;
  dir: 1 | -1;
  width: number;
  left: boolean;
  right: boolean;
  jump: boolean;
};

export function Hero() {
  const { goTo, collect, collected, play, ready, booted } = useGame();
  const { t, c } = useI18n();
  const profile = c.profile;
  const sceneRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim>({ x: 24, y: 0, vy: 0, dir: 1, width: 480, left: false, right: false, jump: false });
  const loopRef = useRef<() => void>(() => {});
  const timers = useRef(new Set<number>());
  const bubbleToken = useRef(0);

  const [bumped, setBumped] = useState<number | null>(null);
  const [bubble, setBubble] = useState<{ token: number; index: number } | null>(null);
  const [pops, setPops] = useState<{ key: number; index: number }[]>([]);
  const [moving, setMoving] = useState(false);

  /*
   * pre : menunggu layar pembuka ditutup, isi hero disembunyikan
   * in  : pemain baru menekan "Mulai main", isi hero muncul berurutan
   * idle: sesi lama atau muat ulang, hero langsung tampil tanpa animasi masuk
   */
  const [enter, setEnter] = useState<"pre" | "in" | "idle">("pre");
  const sawBoot = useRef<boolean | null>(null);
  useEffect(() => {
    if (!ready) return;
    if (sawBoot.current === null) sawBoot.current = !booted;
    setEnter(booted ? (sawBoot.current ? "in" : "idle") : "pre");
  }, [ready, booted]);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const hit = useCallback(
    (index: number) => {
      play("bump");
      setBumped(index);
      later(() => setBumped(null), 300);

      bubbleToken.current += 1;
      const token = bubbleToken.current;
      setBubble({ token, index });
      later(() => setBubble((b) => (b?.token === token ? null : b)), 4500);

      if (collect(`block-${index}`)) {
        const key = Date.now() + index;
        setPops((p) => [...p, { key, index }]);
        later(() => setPops((p) => p.filter((item) => item.key !== key)), 850);
      }
    },
    [collect, later, play],
  );

  /* Simulasi fisika sederhana. Berjalan hanya selama ada input atau pemain masih di udara. */
  useEffect(() => {
    const s = sim.current;
    const scene = sceneRef.current;
    let raf = 0;
    let last = 0;

    const paint = () => {
      const el = playerRef.current;
      if (el) el.style.transform = `translate3d(${s.x}px, ${-s.y}px, 0) scaleX(${s.dir})`;
    };

    const step = (t: number) => {
      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      const dirInput = (s.right ? 1 : 0) - (s.left ? 1 : 0);
      if (dirInput !== 0) s.dir = dirInput > 0 ? 1 : -1;
      s.x = clamp(s.x + dirInput * SPEED * dt, 0, s.width - PLAYER_W);

      if (s.jump && s.y === 0 && s.vy === 0) {
        s.vy = JUMP_V;
        play("jump");
      }

      const prevHead = s.y + PLAYER_H;
      s.vy -= GRAVITY * dt;
      s.y += s.vy * dt;

      if (s.y <= 0) {
        s.y = 0;
        s.vy = 0;
      } else if (s.vy > 0 && prevHead < BLOCK_BOTTOM && s.y + PLAYER_H >= BLOCK_BOTTOM) {
        for (let i = 0; i < BLOCK_POSITIONS.length; i += 1) {
          const bx = s.width * BLOCK_POSITIONS[i] - BLOCK / 2;
          if (s.x + PLAYER_W > bx + 4 && s.x < bx + BLOCK - 4) {
            s.y = BLOCK_BOTTOM - PLAYER_H;
            s.vy = 0;
            hit(i);
            break;
          }
        }
      }

      paint();
      setMoving(dirInput !== 0 && s.y === 0);

      const active = s.left || s.right || s.jump || s.y > 0 || s.vy !== 0;
      raf = active ? requestAnimationFrame(step) : 0;
      if (!active) setMoving(false);
    };

    loopRef.current = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    const measure = () => {
      if (!scene) return;
      s.width = scene.clientWidth;
      s.x = clamp(s.x, 0, s.width - PLAYER_W);
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (scene) observer.observe(scene);

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      observer.disconnect();
    };
  }, [hit, play]);

  const press = useCallback((action: Action, down: boolean) => {
    sim.current[action] = down;
    if (down) loopRef.current();
  }, []);

  const releaseAll = useCallback(() => {
    sim.current.left = false;
    sim.current.right = false;
    sim.current.jump = false;
  }, []);

  const keyToAction = (key: string): Action | null => {
    switch (key) {
      case "ArrowLeft":
      case "a":
      case "A":
        return "left";
      case "ArrowRight":
      case "d":
      case "D":
        return "right";
      case "ArrowUp":
      case "w":
      case "W":
      case " ":
        return "jump";
      default:
        return null;
    }
  };

  const padProps = (action: Action) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      press(action, true);
    },
    onPointerUp: () => press(action, false),
    onPointerLeave: () => press(action, false),
    onPointerCancel: () => press(action, false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  const [first, ...rest] = profile.name.split(" ");
  const bubbleText = bubble ? profile.heroFacts[bubble.index] : undefined;

  return (
    <section
      id="start"
      data-stage
      tabIndex={-1}
      aria-labelledby="hero-title"
      data-enter={enter}
      className="relative flex min-h-[100svh] items-center pb-28 pt-24"
    >
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="chip" data-hero style={order(0)}>
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </p>
            <h1 id="hero-title" className="title-3d mt-6" style={{ fontSize: "clamp(3rem, 8.2vw, 6.25rem)" }}>
              <span className="block" data-hero="drop" style={order(1)}>
                {first}
              </span>
              {rest.length > 0 && (
                <span className="block" data-hero="drop" style={order(2)}>
                  {rest.join(" ")}
                </span>
              )}
            </h1>
            <p className="mt-7 font-pixel text-2xl font-semibold sm:text-3xl" data-hero style={order(3)}>
              {profile.role}
            </p>
            <p className="mt-3 max-w-[34rem] text-lg text-ink" data-hero style={order(4)}>
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-hero style={order(5)}>
              <a
                href="#projects"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("projects");
                }}
              >
                {t.hero.projects}
              </a>
              <a
                href="#contact"
                className="btn btn-panel"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("contact");
                }}
              >
                {t.hero.contact}
              </a>
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} className="btn btn-mint" download>
                  {t.hero.cv}
                </a>
              )}
            </div>
          </div>

          <div>
            <div
              ref={sceneRef}
              className="scene"
              role="group"
              tabIndex={0}
              aria-label={t.hero.scene}
              aria-describedby="hero-hint"
              data-hero="pop"
              style={order(3)}
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return;
                const action = keyToAction(e.key);
                if (!action) return;
                e.preventDefault();
                press(action, true);
              }}
              onKeyUp={(e) => {
                const action = keyToAction(e.key);
                if (action) press(action, false);
              }}
              onBlur={(e) => {
                if (e.target === e.currentTarget) releaseAll();
              }}
              onPointerDown={(e) => {
                if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".player, .ground, .hill")) {
                  sceneRef.current?.focus({ preventScroll: true });
                }
              }}
            >
              <div className="scene-sun" aria-hidden="true" />
              <div className="scene-cloud" style={{ top: "14%", animationDelay: "-12s" }} aria-hidden="true">
                <PixelCloud size={6} />
              </div>
              <div
                className="scene-cloud"
                style={{ top: "34%", animationDelay: "-46s", animationDuration: "95s" }}
                aria-hidden="true"
              >
                <PixelCloud size={4} />
              </div>
              <div className="hill" style={{ left: "-6%", width: "46%", height: 84 }} aria-hidden="true" />
              <div className="hill" style={{ left: "52%", width: "58%", height: 124 }} aria-hidden="true" />
              <div className="ground" aria-hidden="true" />

              {BLOCK_POSITIONS.map((pos, i) => {
                const used = collected.includes(`block-${i}`);
                return (
                  <button
                    key={i}
                    type="button"
                    className="qblock"
                    data-used={used}
                    data-bump={bumped === i}
                    style={{ left: `calc(${pos * 100}% - ${BLOCK / 2}px)`, bottom: GROUND + BLOCK_BOTTOM }}
                    aria-label={t.hero.block(i + 1, BLOCK_POSITIONS.length)}
                    onClick={() => hit(i)}
                  >
                    ?
                  </button>
                );
              })}

              {pops.map((pop) => (
                <span
                  key={pop.key}
                  className="coin-pop"
                  style={{
                    left: `calc(${BLOCK_POSITIONS[pop.index] * 100}% - 16px)`,
                    bottom: GROUND + BLOCK_BOTTOM + BLOCK,
                  }}
                  aria-hidden="true"
                >
                  <PixelIcon name="coin" size={4} />
                </span>
              ))}

              <div
                ref={playerRef}
                className="player"
                data-moving={moving}
                style={{ bottom: GROUND }}
                aria-hidden="true"
              >
                <span className="sprite">
                  <PlayerSprite size={SCALE} />
                </span>
              </div>

              {bubble && (
                <p className="bubble" style={{ top: "0.9rem", left: "50%", width: "min(19rem, calc(100% - 1.5rem))" }} aria-hidden="true">
                  {bubbleText}
                </p>
              )}
              <p className="sr-only" aria-live="polite">
                {bubbleText}
              </p>
            </div>

            <div
              className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4"
              data-hero
              style={order(6)}
            >
              <p id="hero-hint" className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold text-ink">
                <span className="keycap" aria-hidden="true">
                  <PixelIcon name="arrowL" size={2} />
                </span>
                <span className="keycap" aria-hidden="true">
                  <PixelIcon name="arrowR" size={2} />
                </span>
                <span>{t.hero.walk}</span>
                <span className="keycap ml-2" aria-hidden="true">
                  {t.hero.space}
                </span>
                <span>{t.hero.jump}</span>
              </p>
              <div className="flex gap-2" aria-hidden="true">
                <button type="button" tabIndex={-1} className="pad-btn" {...padProps("left")}>
                  <PixelIcon name="arrowL" size={3} />
                </button>
                <button type="button" tabIndex={-1} className="pad-btn" {...padProps("jump")}>
                  <PixelIcon name="arrowU" size={3} />
                </button>
                <button type="button" tabIndex={-1} className="pad-btn" {...padProps("right")}>
                  <PixelIcon name="arrowR" size={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
