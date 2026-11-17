import type { Lang } from "./types";

/**
 * Teks antarmuka (tombol, label, pesan) untuk kedua bahasa.
 * Isi portofolio (nama, proyek, skill, dan sebagainya) ada di
 * src/data/profile.ts dan src/data/profile.en.ts.
 */
const id = {
  skip: "Lewati ke konten utama",

  lang: {
    /** Label tombol ganti bahasa saat bahasa aktif adalah Indonesia. */
    switchTo: "Ganti bahasa ke English",
  },

  hud: {
    home: (handle: string) => `${handle}, kembali ke awal`,
    level: "Lv",
    xp: "XP",
    progress: "Progres membaca halaman",
    coinsSr: "Koin terkumpul: ",
    coinsTitle: "Koin terkumpul",
    toNight: "Ganti ke mode malam",
    toDay: "Ganti ke mode siang",
    openSettings: "Buka pengaturan",
  },

  hotbar: { nav: "Navigasi stage" },

  boot: {
    dialog: "Layar pembuka",
    soundOn: "Suara nyala",
    soundOff: "Suara mati",
    subtitle: (role: string) => `Portofolio ${role.toLowerCase()}`,
    progress: "Memuat halaman",
    messages: ["Mengompilasi CSS", "Menyiapkan komponen", "Memoles piksel", "Hampir siap"],
    ready: "Siap dimainkan",
    start: "Mulai main",
    hint: "Tekan Enter atau klik tombol di atas.",
  },

  toast: {
    close: "Tutup",
    dismiss: "Tutup notifikasi",
    trophy: (title: string) => `Trofi terbuka: ${title}`,
    retroTitle: "Mode retro aktif",
    retroBody: "Garis scanline menyala. Matikan kapan saja di Pengaturan.",
    resetTitle: "Progres direset",
    resetBody: "Koin dan trofi kembali ke nol.",
  },

  dialog: { close: "Tutup" },

  settings: {
    title: "Pengaturan",
    night: { label: "Mode malam", hint: "Ganti dunia dari siang ke malam." },
    sound: { label: "Efek suara", hint: "Bunyi koin, lompat, dan trofi. Mati secara bawaan." },
    motion: { label: "Kurangi gerak", hint: "Mematikan animasi otomatis dan animasi saat scroll." },
    retro: { label: "Mode retro", hint: "Menambahkan garis scanline ala monitor tabung." },
    resetTitle: "Mulai dari nol",
    resetHint: "Mengosongkan koin dan trofi yang sudah terkumpul.",
    resetButton: "Reset progres",
  },

  bonusCoin: "Koin bonus. Klik untuk mengambil.",

  hero: {
    scene: "Mini game: gerakkan karakter dan bentur blok kuning",
    block: (n: number, total: number) => `Blok kejutan ${n} dari ${total}. Aktifkan untuk membuka.`,
    projects: "Lihat proyek",
    contact: "Hubungi saya",
    cv: "Unduh CV",
    walk: "jalan",
    space: "Spasi",
    jump: "lompat. Bentur blok kuning dari bawah.",
  },

  sections: {
    keycap: (n: number) => `Tekan ${n} untuk lompat ke sini`,
    about: { title: "Profil pemain", description: "Siapa saya, dan apa yang saya kerjakan sehari-hari." },
    skills: {
      title: "Inventori skill",
      description: "Pilih sebuah item untuk melihat bagaimana saya memakainya.",
    },
    experience: {
      title: "Riwayat misi",
      description: "Perjalanan pendidikan, pengalaman profesional, dan proyek yang telah saya kerjakan.",
    },
    projects: {
      title: "Pilih stage",
      description: (n: number) => `${n} Website yang Saya Kembangkan.`,
    },
    achievements: {
      title: "Ruang trofi",
      description: "Hal-hal yang sudah saya selesaikan, dan trofi yang bisa kamu buka di situs ini.",
    },
    contact: {
      title: "Kirim pesan",
      description: "Punya proyek, lowongan, atau sekadar ingin menyapa? Kabari saya.",
    },
  },

  about: {
    character: "Karakter pemain",
    photoAlt: (name: string) => `Foto ${name}`,
    attributes: "Kompetensi Utama: Website Developer & Desain",
    attribute: (name: string, value: number) => `${name}: ${value} dari 100`,
  },

  skills: {
    categories: "Kategori skill",
    slot: (name: string, rarity: string) => `${name}, ${rarity}`,
    detail: "Detail item terpilih",
  },

  experience: {
    active: "Sedang berjalan",
    done: "Selesai",
    rewards: "Pencapaian",
    stack: "Teknologi yang dipakai",
    detail: (role: string, org: string) => `Detail ${role}, ${org}`,
  },

  projects: {
    complexity: "Kompleksitas",
    complexityOf: (level: number) => `Kompleksitas ${level} dari 5`,
    role: "Peran saya",
    challenge: "Tantangan",
    solution: "Solusi",
    results: "Hasil",
    stack: "Teknologi yang dipakai",
    demo: "Buka demo",
    code: "Lihat kode",
    newTab: " (tab baru)",
  },

  achievements: {
    awards: "Pencapaian",
    site: "Trofi situs ini",
    progress: (done: number, total: number, coins: number, totalCoins: number) =>
      `${done} dari ${total} terbuka. Koin terkumpul: ${coins} dari ${totalCoins}.`,
    unlocked: "Terbuka",
    locked: "Terkunci",
    collector: (n: number) => `Mengumpulkan ${n} koin: blok kuning di hero dan koin bonus tersembunyi.`,
  },

  contact: {
    heading: "Ayo bikin sesuatu",
    intro: (responseTime: string) => `Saya biasanya membalas dalam ${responseTime}. Email adalah jalur tercepat.`,
    copy: "Salin email",
    copied: "Tersalin",
    copiedSr: "Alamat email tersalin",
    copyPrompt: "Salin alamat email ini:",
    findMe: "Temukan saya di",
    newTab: " (tab baru)",
    cv: "Unduh CV",
    name: "Nama",
    email: "Email",
    message: "Pesan",
    namePlaceholder: "Nama lengkap kamu",
    emailPlaceholder: "nama@email.com",
    messagePlaceholder: "Ceritakan singkat tentang proyek atau idemu",
    errName: "Isi nama kamu dulu.",
    errEmailEmpty: "Isi alamat email kamu.",
    errEmailInvalid: "Alamat email belum lengkap. Contoh: nama@email.com",
    errMessage: "Tulis pesan minimal 10 karakter.",
    submit: "Kirim pesan",
    helpIdle: "Pesan dikirim lewat aplikasi email di perangkat kamu.",
    helpSent: "Aplikasi email kamu akan terbuka dengan pesan yang sudah terisi. Tinggal tekan kirim di sana.",
    subject: (name: string) => `Halo dari ${name}`,
  },

  footer: {
    thanks: "Terima kasih sudah bermain",
    coins: (n: number, total: number) => `Kamu mengumpulkan ${n} dari ${total} koin.`,
    again: "Main lagi dari awal",
    tip: "Tip: tombol angka 1 sampai 7 melompat antar stage. Ada satu kode rahasia klasik yang belum kamu coba.",
    built: "Dibangun dengan Next.js, Tailwind CSS, dan Motion.",
  },
};

export type Dict = typeof id;

const en: Dict = {
  skip: "Skip to main content",

  lang: {
    switchTo: "Switch language to Bahasa Indonesia",
  },

  hud: {
    home: (handle) => `${handle}, back to the start`,
    level: "Lv",
    xp: "XP",
    progress: "Page reading progress",
    coinsSr: "Coins collected: ",
    coinsTitle: "Coins collected",
    toNight: "Switch to night mode",
    toDay: "Switch to day mode",
    openSettings: "Open settings",
  },

  hotbar: { nav: "Stage navigation" },

  boot: {
    dialog: "Start screen",
    soundOn: "Sound on",
    soundOff: "Sound off",
    subtitle: (role) => `${role} portfolio`,
    progress: "Loading page",
    messages: ["Compiling CSS", "Preparing components", "Polishing pixels", "Almost ready"],
    ready: "Ready to play",
    start: "Start game",
    hint: "Press Enter or click the button above.",
  },

  toast: {
    close: "Close",
    dismiss: "Dismiss notification",
    trophy: (title) => `Trophy unlocked: ${title}`,
    retroTitle: "Retro mode on",
    retroBody: "Scanlines are on. Turn them off anytime in Settings.",
    resetTitle: "Progress reset",
    resetBody: "Coins and trophies are back to zero.",
  },

  dialog: { close: "Close" },

  settings: {
    title: "Settings",
    night: { label: "Night mode", hint: "Switch the world from day to night." },
    sound: { label: "Sound effects", hint: "Coin, jump, and trophy sounds. Off by default." },
    motion: { label: "Reduce motion", hint: "Turns off automatic and scroll animations." },
    retro: { label: "Retro mode", hint: "Adds scanlines like an old CRT monitor." },
    resetTitle: "Start over",
    resetHint: "Clears the coins and trophies you've collected.",
    resetButton: "Reset progress",
  },

  bonusCoin: "Bonus coin. Click to collect.",

  hero: {
    scene: "Mini game: move the character and bump the yellow blocks",
    block: (n, total) => `Surprise block ${n} of ${total}. Activate to open it.`,
    projects: "View projects",
    contact: "Contact me",
    cv: "Download CV",
    walk: "walk",
    space: "Space",
    jump: "jump. Bump the yellow blocks from below.",
  },

  sections: {
    keycap: (n) => `Press ${n} to jump here`,
    about: { title: "Player profile", description: "Who I am, and what I do day to day." },
    skills: { title: "Skill inventory", description: "Pick an item to see how I use it." },
    experience: {
      title: "Quest log",
      description: "Where I've worked, and what got done there.",
    },
    projects: {
      title: "Select stage",
      description: (n) => `${n} Websites I’ve Developed.`,
    },
    achievements: {
      title: "Trophy room",
      description: "Real-world awards, and trophies you can unlock on this site.",
    },
    contact: {
      title: "Send a message",
      description: "Got a project, a job opening, or just want to say hi? Let me know.",
    },
  },

  about: {
    character: "Player character",
    photoAlt: (name) => `Photo of ${name}`,
    attributes: "Core Competencies: Website Development & Design",
    attribute: (name, value) => `${name}: ${value} out of 100`,
  },

  skills: {
    categories: "Skill categories",
    slot: (name, rarity) => `${name}, ${rarity}`,
    detail: "Selected item details",
  },

  experience: {
    active: "In progress",
    done: "Completed",
    rewards: "Achievements",
    stack: "Technologies used",
    detail: (role, org) => `${role} at ${org}, details`,
  },

  projects: {
    complexity: "Complexity",
    complexityOf: (level) => `Complexity ${level} out of 5`,
    role: "My role",
    challenge: "Challenge",
    solution: "Solution",
    results: "Results",
    stack: "Technologies used",
    demo: "Open demo",
    code: "View code",
    newTab: " (new tab)",
  },

  achievements: {
    awards: "Awards",
    site: "Trophies on this site",
    progress: (done, total, coins, totalCoins) =>
      `${done} of ${total} unlocked. Coins collected: ${coins} of ${totalCoins}.`,
    unlocked: "Unlocked",
    locked: "Locked",
    collector: (n) => `Collect ${n} coins: the yellow blocks in the hero plus hidden bonus coins.`,
  },

  contact: {
    heading: "Let's build something",
    intro: (responseTime) => `I usually reply within ${responseTime}. Email is the fastest way.`,
    copy: "Copy email",
    copied: "Copied",
    copiedSr: "Email address copied",
    copyPrompt: "Copy this email address:",
    findMe: "Find me on",
    newTab: " (new tab)",
    cv: "Download CV",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your full name",
    emailPlaceholder: "you@email.com",
    messagePlaceholder: "Tell me briefly about your project or idea",
    errName: "Enter your name first.",
    errEmailEmpty: "Enter your email address.",
    errEmailInvalid: "That email address looks incomplete. Example: you@email.com",
    errMessage: "Write a message of at least 10 characters.",
    submit: "Send message",
    helpIdle: "Your message is sent through the email app on your device.",
    helpSent: "Your email app will open with the message filled in. Just press send there.",
    subject: (name) => `Hello from ${name}`,
  },

  footer: {
    thanks: "Thanks for playing",
    coins: (n, total) => `You collected ${n} of ${total} coins.`,
    again: "Play again from the start",
    tip: "Tip: the number keys 1 to 7 jump between stages. There's one classic secret code you haven't tried yet.",
    built: "Built with Next.js, Tailwind CSS, and Motion.",
  },
};

export const ui: Record<Lang, Dict> = { id, en };
