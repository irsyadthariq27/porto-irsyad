"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { useGame } from "./GameProvider";
import { PixelCloud } from "./pixel";

/**
 * Langit di belakang halaman. Menggulir ke bawah terasa seperti kamera yang
 * berjalan ke kanan di game side-scroller: awan dan bukit bergeser ke kiri
 * dengan kecepatan berbeda (parallax). Malam hari awan diganti bintang
 * yang berkelip. Hanya memakai transform, tanpa render ulang React.
 */

const CLOUDS = [
  { top: "9vh", size: 6, speed: 0.12, start: 0.1, opacity: 0.95 },
  { top: "24vh", size: 4, speed: 0.07, start: 0.58, opacity: 0.75 },
  { top: "43vh", size: 7, speed: 0.2, start: 0.82, opacity: 0.95 },
  { top: "61vh", size: 4, speed: 0.1, start: 0.3, opacity: 0.65 },
  { top: "78vh", size: 5, speed: 0.16, start: 0.68, opacity: 0.85 },
] as const;

/** Lapisan berpola yang bergeser mulus: jarak geser dibatasi satu periode pola. */
const LAYERS = [
  { className: "sky-day sky-hill sky-hill-far", speed: 0.05, period: 640 },
  { className: "sky-day sky-hill sky-hill-near", speed: 0.12, period: 520 },
  { className: "sky-night sky-stars sky-stars-a", speed: 0.04, period: 300 },
  { className: "sky-night sky-stars sky-stars-b", speed: 0.1, period: 300 },
] as const;

export function Backdrop() {
  const { ready, reduceMotion } = useGame();
  const { scrollY } = useScroll();
  const cloudRefs = useRef<Array<HTMLDivElement | null>>([]);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const viewport = useRef(1280);

  const update = useCallback((y: number) => {
    const span = viewport.current + 520;
    CLOUDS.forEach((cloud, i) => {
      const el = cloudRefs.current[i];
      if (!el) return;
      const raw = cloud.start * span - y * cloud.speed;
      const x = (((raw % span) + span) % span) - 260;
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    });
    LAYERS.forEach((layer, i) => {
      const el = layerRefs.current[i];
      if (!el) return;
      el.style.transform = `translate3d(${(-((y * layer.speed) % layer.period)).toFixed(1)}px,0,0)`;
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!reduceMotion) update(y);
  });

  useEffect(() => {
    if (!ready) return;
    const measure = () => {
      viewport.current = window.innerWidth;
      update(reduceMotion ? 0 : scrollY.get());
    };
    measure();
    rootRef.current?.setAttribute("data-ready", "true");
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ready, reduceMotion, scrollY, update]);

  return (
    <div ref={rootRef} className="sky" aria-hidden="true">
      {LAYERS.map((layer, i) => (
        <div
          key={layer.className}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className={`sky-layer ${layer.className}`}
        />
      ))}
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          ref={(el) => {
            cloudRefs.current[i] = el;
          }}
          className="sky-cloud sky-day"
          style={{ top: cloud.top, opacity: cloud.opacity }}
        >
          <PixelCloud size={cloud.size} />
        </div>
      ))}
    </div>
  );
}
