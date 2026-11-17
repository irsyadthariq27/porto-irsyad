/**
 * Efek suara 8-bit yang disintesis langsung dengan Web Audio API.
 * Tidak ada file audio yang perlu dimuat. Baru berbunyi setelah pengguna
 * menyalakan suara di Pengaturan atau di layar pembuka.
 */
export type SfxName = "coin" | "jump" | "bump" | "start" | "unlock" | "click";

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  audio: AudioContext,
  freq: number,
  start: number,
  duration: number,
  options: { type?: OscillatorType; volume?: number; slideTo?: number } = {},
) {
  const { type = "square", volume = 0.045, slideTo } = options;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const t0 = audio.currentTime + start;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export function playSfx(name: SfxName) {
  const audio = getContext();
  if (!audio) return;
  switch (name) {
    case "coin":
      tone(audio, 988, 0, 0.08);
      tone(audio, 1319, 0.08, 0.32);
      break;
    case "jump":
      tone(audio, 280, 0, 0.18, { slideTo: 720, type: "square", volume: 0.035 });
      break;
    case "bump":
      tone(audio, 160, 0, 0.1, { type: "triangle", volume: 0.07 });
      break;
    case "start":
      [523, 659, 784, 1047].forEach((f, i) => tone(audio, f, i * 0.09, 0.14));
      break;
    case "unlock":
      [784, 988, 1175, 1568].forEach((f, i) => tone(audio, f, i * 0.07, 0.16));
      break;
    case "click":
      tone(audio, 660, 0, 0.05, { volume: 0.03 });
      break;
  }
}
