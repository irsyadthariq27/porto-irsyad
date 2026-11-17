import type { CSSProperties } from "react";

type Palette = Record<string, string>;

type PixelArtProps = {
  rows: string[];
  palette: Palette;
  /** Ukuran satu piksel dalam px layar. */
  size?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Menggambar pixel art dari array string. Setiap karakter adalah satu piksel,
 * "." artinya transparan. Deretan piksel berwarna sama digabung jadi satu rect.
 */
export function PixelArt({ rows, palette, size = 3, label, className, style }: PixelArtProps) {
  const height = rows.length;
  const width = Math.max(...rows.map((r) => r.length));
  const rects: { x: number; y: number; w: number; fill: string }[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || !palette[ch]) {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run += 1;
      rects.push({ x, y, w: run, fill: palette[ch] });
      x += run;
    }
  });

  return (
    <svg
      width={width * size}
      height={height * size}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={className}
      style={style}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} style={{ fill: r.fill }} />
      ))}
    </svg>
  );
}

const ICON_PALETTE: Palette = {
  K: "var(--icon-outline)",
  Y: "#ffc531",
  W: "#fff6c7",
  O: "#e39a00",
  R: "#ff4f7b",
  P: "#fff1cf",
  G: "#9a97c4",
  M: "#22d3a0",
  B: "#ff9f43",
  V: "#7b5cff",
  S: "#ffcfa6",
  H: "#3a2760",
  L: "var(--paper)",
};

const ICONS = {
  coin: [
    "..KKKK..",
    ".KYYYYK.",
    "KYYWWYYK",
    "KYWYYOYK",
    "KYWYYOYK",
    "KYYOOOYK",
    ".KYYYYK.",
    "..KKKK..",
  ],
  heart: [
    ".KK..KK.",
    "KRRKKRRK",
    "KRWRRRRK",
    "KRRRRRRK",
    ".KRRRRK.",
    "..KRRK..",
    "...KK...",
  ],
  star: [
    "...K...",
    "..KYK..",
    "KKKYKKK",
    "KYYWYYK",
    ".KYYYK.",
    ".KYKYK.",
    "..K.K..",
  ],
  flag: [
    ".K......",
    ".KKK....",
    ".KYYKK..",
    ".KYYYYK.",
    ".KYYKK..",
    ".KKK....",
    ".K......",
    ".K......",
  ],
  user: [
    "..KKKK..",
    ".KHHHHK.",
    ".KSSSSK.",
    ".KSSSSK.",
    "..KKKK..",
    ".KVVVVK.",
    "KVVVVVVK",
    "KKKKKKKK",
  ],
  bag: [
    "..KKKK..",
    ".K....K.",
    "..KKKK..",
    ".KBBBBK.",
    "KBBYYBBK",
    "KBBYYBBK",
    "KBBBBBBK",
    ".KKKKKK.",
  ],
  scroll: [
    ".KKKKKK.",
    "KLLLLLLK",
    "KLKKKKLK",
    "KLLLLLLK",
    "KLKKKKLK",
    "KLLLLLLK",
    "KLKKLLLK",
    ".KKKKKK.",
  ],
  map: [
    "..KKKK..",
    ".KRRRRK.",
    "KRRWWRRK",
    "KRRWWRRK",
    ".KRRRRK.",
    "..KRRK..",
    "...KK...",
    "........",
  ],
  trophy: [
    "KKKKKKKK",
    "KYYYYYYK",
    "KKYWYYKK",
    ".KYWYOK.",
    "..KYOK..",
    "...KK...",
    "..KKKK..",
    ".KKKKKK.",
  ],
  mail: [
    "KKKKKKKK",
    "KKLLLLKK",
    "KLKLLKLK",
    "KLLKKLLK",
    "KLLLLLLK",
    "KLLLLLLK",
    "KKKKKKKK",
    "........",
  ],
  gear: [
    "..K..K..",
    ".KKKKKK.",
    "KKGGGGKK",
    ".KGKKGK.",
    ".KGKKGK.",
    "KKGGGGKK",
    ".KKKKKK.",
    "..K..K..",
  ],
  lock: [
    "..KKKK..",
    ".K....K.",
    ".K....K.",
    "KKKKKKKK",
    "KGGGGGGK",
    "KGGKKGGK",
    "KGGGGGGK",
    "KKKKKKKK",
  ],
  check: [
    "........",
    "......KK",
    ".....KK.",
    "K...KK..",
    "KK.KK...",
    ".KKK....",
    "..K.....",
    "........",
  ],
  sun: [
    "...O...",
    ".O.Y.O.",
    "..YYY..",
    "OYYYYYO",
    "..YYY..",
    ".O.Y.O.",
    "...O...",
  ],
  moon: [
    "..VVV..",
    ".VV....",
    "VV.....",
    "VV.....",
    "VV.....",
    ".VV...V",
    "..VVVV.",
  ],
  arrowL: [
    "...K...",
    "..KK...",
    ".KKKKKK",
    "KKKKKKK",
    ".KKKKKK",
    "..KK...",
    "...K...",
  ],
  arrowR: [
    "...K...",
    "...KK..",
    "KKKKKK.",
    "KKKKKKK",
    "KKKKKK.",
    "...KK..",
    "...K...",
  ],
  arrowU: [
    "...K...",
    "..KKK..",
    ".KKKKK.",
    "KKKKKKK",
    "..KKK..",
    "..KKK..",
    "..KKK..",
  ],
  speaker: [
    "...K....",
    "..KK..K.",
    "KKKK.K.K",
    "KKKK..KK",
    "KKKK.K.K",
    "..KK..K.",
    "...K....",
    "........",
  ],
  mute: [
    "...K....",
    "..KK.K.K",
    "KKKK..K.",
    "KKKK.K.K",
    "KKKK....",
    "..KK....",
    "...K....",
    "........",
  ],
} satisfies Record<string, string[]>;

export type IconName = keyof typeof ICONS;

export function PixelIcon({
  name,
  size = 3,
  label,
  className,
}: {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
}) {
  return <PixelArt rows={ICONS[name]} palette={ICON_PALETTE} size={size} label={label} className={className} />;
}

/* ------------------------------------------------------------------
   Karakter pemain: chibi 10x15 dengan headphone kuning.
------------------------------------------------------------------- */
const PLAYER_ROWS = [
  "..KKKKKK..",
  ".KHHHHHHK.",
  "KHHHHHHHHK",
  "KHHSSSSHHK",
  "YKSKSSKSKY",
  "YKSSSSSSKY",
  ".KSSSSSSK.",
  "..KKKKKK..",
  ".KGGGGGGK.",
  "KGGGGGGGGK",
  "KSGGGGGGSK",
  ".KGGGGGGK.",
  "..KPPPPK..",
  "..KPKKPK..",
  "..KKK.KKK.",
];

const PLAYER_PALETTE: Palette = {
  K: "#0f0c2e",
  H: "#3a2760",
  S: "#ffcfa6",
  Y: "#ffc531",
  G: "#7b5cff",
  P: "#2b3a8c",
};

export const PLAYER_SIZE = { cols: 10, rows: 15 } as const;

export function PlayerSprite({ size = 4, label, className }: { size?: number; label?: string; className?: string }) {
  return <PixelArt rows={PLAYER_ROWS} palette={PLAYER_PALETTE} size={size} label={label} className={className} />;
}

/* ------------------------------------------------------------------
   Awan piksel untuk dekorasi layar mini.
------------------------------------------------------------------- */
const CLOUD_ROWS = [
  "......WWWW........",
  "....WWWWWWWW..WW..",
  "..WWWWWWWWWWWWWWW.",
  ".WWWWWWWWWWWWWWWWW",
  "SSSSSSSSSSSSSSSSSS",
];

export function PixelCloud({ size = 5 }: { size?: number }) {
  return <PixelArt rows={CLOUD_ROWS} palette={{ W: "#ffffff", S: "#cfe6ff" }} size={size} style={{ opacity: 0.92 }} />;
}
