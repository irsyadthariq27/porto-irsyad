import type { ArtKind, Project } from "@/data/profile";
import { cn } from "@/lib/utils";

const TONE_FILL: Record<Project["tone"], string> = {
  coin: "fill-coin",
  berry: "fill-berry",
  mint: "fill-mint",
  grape: "fill-grape",
};

const TONE_BG: Record<Project["tone"], string> = {
  coin: "bg-coin",
  berry: "bg-berry",
  mint: "bg-mint",
  grape: "bg-grape",
};

type ProjectArtProps = {
  kind: ArtKind;
  tone: Project["tone"];
  /** "cover" memenuhi kotak dan memotong tepi. "contain" menampilkan seluruh gambar. */
  fit?: "cover" | "contain";
  className?: string;
};

/**
 * Ilustrasi datar tiap proyek. Dibuat dari bentuk dasar supaya ringan dan ikut tema siang/malam.
 * Tinggi dan lebar diatur lewat className pembungkus.
 */
export function ProjectArt({ kind, tone, fit = "cover", className }: ProjectArtProps) {
  const stroke = "stroke-line";
  const background = kind === "game" ? "bg-panel-2" : TONE_BG[tone];
  return (
    <div className={cn(background, className)}>
      <svg
        viewBox="0 0 320 160"
        className="block h-full w-full"
        role="presentation"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
      >
      <rect width="320" height="160" className={TONE_FILL[tone]} />
      <g strokeWidth="3" strokeLinejoin="round" className={stroke}>
        {kind === "pos" && (
          <>
            <rect x="84" y="16" width="150" height="132" rx="12" className="fill-panel" />
            <rect x="96" y="28" width="126" height="20" rx="5" className="fill-panel-2" />
            {[0, 1, 2].map((c) =>
              [0, 1].map((r) => (
                <rect
                  key={`${c}-${r}`}
                  x={96 + c * 43}
                  y={58 + r * 36}
                  width="38"
                  height="30"
                  rx="6"
                  className={(c + r) % 2 === 0 ? "fill-coin" : "fill-mint"}
                />
              )),
            )}
            <rect x="248" y="34" width="52" height="106" className="fill-panel" />
            {[48, 62, 76, 90].map((y) => (
              <line key={y} x1="256" x2="292" y1={y} y2={y} strokeWidth="2" />
            ))}
            <path d="M248 140 l7 -7 7 7 7 -7 7 7 7 -7 7 7 7 -7 4 4" fill="none" />
          </>
        )}

        {kind === "components" && (
          <>
            <rect x="24" y="22" width="96" height="34" rx="10" className="fill-berry" />
            <rect x="136" y="28" width="58" height="26" rx="13" className="fill-mint" />
            <circle cx="180" cy="41" r="9" className="fill-panel" />
            <rect x="208" y="24" width="30" height="30" rx="7" className="fill-panel" />
            <path d="M215 40 l6 6 11 -12" fill="none" strokeWidth="4" />
            <rect x="24" y="72" width="164" height="72" rx="10" className="fill-panel" />
            <circle cx="52" cy="98" r="14" className="fill-coin" />
            <line x1="76" x2="170" y1="92" y2="92" strokeWidth="4" />
            <line x1="76" x2="146" y1="106" y2="106" strokeWidth="3" />
            <rect x="36" y="124" width="52" height="12" rx="4" className="fill-panel-2" />
            <rect x="204" y="72" width="92" height="72" rx="10" className="fill-panel-2" />
            <line x1="218" x2="282" y1="92" y2="92" strokeWidth="3" />
            <line x1="218" x2="268" y1="106" y2="106" strokeWidth="3" />
            <line x1="218" x2="276" y1="120" y2="120" strokeWidth="3" />
          </>
        )}

        {kind === "dashboard" && (
          <>
            <rect x="24" y="16" width="272" height="132" rx="12" className="fill-panel" />
            <rect x="38" y="28" width="68" height="30" rx="6" className="fill-panel-2" />
            <rect x="114" y="28" width="68" height="30" rx="6" className="fill-panel-2" />
            <rect x="190" y="28" width="92" height="30" rx="6" className="fill-coin" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const h = [28, 44, 36, 58, 48, 66, 54][i];
              return <rect key={i} x={40 + i * 24} y={138 - h} width="16" height={h} className="fill-grape" />;
            })}
            <polyline points="40,112 76,94 112,100 148,78 184,84 220,66 256,70 276,58" fill="none" strokeWidth="4" className="stroke-berry" />
            <line x1="38" x2="282" y1="138" y2="138" />
          </>
        )}

        {kind === "landing" && (
          <>
            <rect x="26" y="14" width="268" height="136" rx="12" className="fill-panel" />
            <line x1="26" x2="294" y1="38" y2="38" />
            {[44, 58, 72].map((x) => (
              <circle key={x} cx={x} cy="26" r="4" className="fill-panel-2" strokeWidth="2" />
            ))}
            <line x1="44" x2="150" y1="62" y2="62" strokeWidth="6" />
            <line x1="44" x2="128" y1="78" y2="78" strokeWidth="6" />
            <line x1="44" x2="140" y1="94" y2="94" strokeWidth="3" />
            <rect x="44" y="108" width="62" height="24" rx="8" className="fill-coin" />
            <rect x="176" y="52" width="102" height="82" rx="8" className="fill-panel-2" />
            <circle cx="206" cy="78" r="9" className="fill-coin" />
            <path d="M176 134 l30 -30 22 20 16 -14 34 24" className="fill-mint" />
          </>
        )}

        {kind === "game" && (
          <>
            <rect width="320" height="160" className="fill-panel-2" strokeWidth="0" />
            <rect y="124" width="320" height="36" className="fill-berry" />
            <line x1="0" x2="320" y1="124" y2="124" />
            {[50, 98, 146].map((x, i) => (
              <g key={x}>
                <rect x={x} y="56" width="34" height="34" rx="6" className="fill-coin" />
                <text x={x + 17} y="81" textAnchor="middle" strokeWidth="0" fontSize="22" fontWeight="700" className="fill-line" style={{ fontFamily: "var(--font-pixel)" }}>
                  {i === 1 ? "?" : ""}
                </text>
              </g>
            ))}
            <rect x="214" y="84" width="26" height="40" className="fill-grape" />
            <rect x="214" y="68" width="26" height="18" className="fill-panel" />
            <rect x="222" y="74" width="4" height="4" className="fill-line" strokeWidth="0" />
            <circle cx="280" cy="40" r="9" className="fill-coin" />
          </>
        )}

        {kind === "map" && (
          <>
            <rect x="20" y="14" width="280" height="132" rx="12" className="fill-panel" />
            {[60, 100, 140].map((y) => (
              <line key={y} x1="20" x2="300" y1={y - 20} y2={y - 20} strokeWidth="1.5" />
            ))}
            {[80, 140, 200, 260].map((x) => (
              <line key={x} x1={x} x2={x} y1="14" y2="146" strokeWidth="1.5" />
            ))}
            <path d="M52 100 q18 -40 62 -30 q30 6 40 28 q-20 28 -62 26 q-32 -2 -40 -24z" className="fill-berry" />
            <path d="M178 54 q20 -22 56 -10 q20 12 8 34 q-30 14 -58 -2 q-12 -10 -6 -22z" className="fill-mint" />
            {[
              [112, 66],
              [228, 100],
              [196, 52],
            ].map(([cx, cy]) => (
              <g key={`${cx}-${cy}`}>
                <path d={`M${cx} ${cy + 16} l-9 -16 a10 10 0 1 1 18 0z`} className="fill-coin" />
                <circle cx={cx} cy={cy - 2} r="3" className="fill-line" strokeWidth="0" />
              </g>
            ))}
          </>
        )}
      </g>
      </svg>
    </div>
  );
}
