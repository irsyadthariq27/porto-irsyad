import type { IconName } from "@/components/game/pixel";

/**
 * SELURUH ISI PORTOFOLIO ADA DI FILE INI.
 * Semua teks di bawah adalah contoh. Ganti dengan data kamu sendiri,
 * komponen akan menyesuaikan otomatis.
 */

export const stages = [
  { id: "start", label: "Mulai", icon: "flag" },
  { id: "about", label: "Tentang", icon: "user" },
  { id: "skills", label: "Skill", icon: "bag" },
  { id: "experience", label: "Pengalaman", icon: "scroll" },
  { id: "projects", label: "Proyek", icon: "map" },
  { id: "achievements", label: "Trofi", icon: "trophy" },
  { id: "contact", label: "Kontak", icon: "mail" },
] as const satisfies ReadonlyArray<{ id: string; label: string; icon: IconName }>;

export type StageId = (typeof stages)[number]["id"];

export const profile = {
  name: "Irsyad Thariq Hafizh",
  handle: "irsyad",
  role: "Front-end developer",
  tagline:
    "Front-end developer yang membangun antarmuka web yang cepat, mudah diakses, dan enak dipakai.",
  availability: "Terbuka untuk proyek baru",
  location: "Indonesia, kerja remote",
  email: "irsyadhafizh@gmail.com",
  /** Isi dengan URL berkas CV (misalnya "/cv.pdf" di folder public). Kosong = tombol disembunyikan. */
  resumeUrl: "",
  responseTime: "1 sampai 2 hari kerja",
  socials: [
    { label: "GitHub", short: "GH", href: "https://github.com/irsyadthariq27" },
    { label: "LinkedIn", short: "IN", href: "https://www.linkedin.com/in/irsyad-hafizh-129a82397/" },
    { label: "Instagram", short: "IG", href: "https://www.instagram.com/irsyadthrq" },
    { label: "TikTok", short: "TT", href: "https://www.tiktok.com/@irsyadthariiq" },
  ],
  heroFacts: [
    "Skor Lighthouse 100 itu bukan kebetulan, tapi kebiasaan.",
    "Setiap komponen saya uji pakai keyboard dulu, baru mouse.",
    "Kopi dulu, baru refactor. Urutannya tidak boleh terbalik.",
  ],
} as const;

export const about = {
  paragraphs: [
    "Halo! Saya seorang Front-End Developer yang senang menjembatani dunia desain dan kode. Dengan pengalaman 1 tahun membangun antarmuka web yang hidup dan responsif, saya percaya bahwa detail-detail kecil—seperti waktu muat yang cepat dan navigasi keyboard yang mulus—adalah penentu pengalaman pengguna yang luar biasa.",
    "Bagi saya, pengembangan web bukan sekadar menampilkan data, tetapi juga tentang bagaimana sebuah interaksi terasa natural bagi pengguna. Semangat eksplorasi ini juga saya bawa ke luar jam kerja, di mana saya kerap membangun website sederhana untuk terus melatih logika interaksi dan animasi yang mulus."
  ],
  sheet: [
    { key: "Studi", value: "D3 Politeknik Negeri Madiun" },
    { key: "Pengalaman", value: "1 Tahun Pengalaman" },
    { key: "Lokasi", value: "Jawa Timur, Kota Madiun" },
    { key: "Bahasa", value: "Indonesia dan Inggris" },
    { key: "Keahlian", value: "Laravel dan Next.js" },
  ],
    attributes: [
    { name: "Pengembangan Website", value: 95 },
    { name: "Desain UI/UX", value: 92 },
    { name: "Frontend Development", value: 90 },
    { name: "Responsive Web Design", value: 90 },
    { name: "Optimasi Performa Website", value: 85 },
    { name: "Interaksi dan Animasi Web", value: 85 },
  ],
} as const;

/* ------------------------------ Skill ------------------------------ */

export type Rarity = "common" | "rare" | "epic" | "legendary";

export type Skill = {
  id: string;
  /** Singkatan dua huruf untuk ikon slot. */
  abbr: string;
  name: string;
  rarity: Rarity;
  note: string;
};

export const rarityInfo: Record<Rarity, { label: string; meaning: string; pips: number }> = {
  legendary: { label: "Legendaris", meaning: "Dipakai hampir setiap hari.", pips: 4 },
  epic: { label: "Epik", meaning: "Nyaman dipakai di produksi.", pips: 3 },
  rare: { label: "Langka", meaning: "Pernah dipakai di proyek nyata.", pips: 2 },
  common: { label: "Umum", meaning: "Sedang saya pelajari.", pips: 1 },
};

export const skillGroups: { id: string; label: string; items: Skill[] }[] = [
  {
    id: "bahasa",
    label: "Bahasa",
    items: [
      { id: "html", abbr: "HT", name: "HTML semantik", rarity: "legendary", note: "Menyusun struktur halaman web yang terstruktur, responsif, dan mudah diakses." },
      { id: "css", abbr: "CS", name: "CSS modern", rarity: "legendary", note: "Mengatur layout, responsive design, animasi, dan tampilan antarmuka." },
      { id: "js", abbr: "JS", name: "JavaScript", rarity: "legendary", note: "Mengembangkan interaksi dan fungsionalitas dinamis pada aplikasi web." },
      { id: "ts", abbr: "TS", name: "TypeScript", rarity: "epic", note: "Menggunakan sistem tipe untuk kode yang lebih terstruktur." },
      { id: "node", abbr: "NJ", name: "Node.js", rarity: "rare", note: "Menggunakan JavaScript untuk kebutuhan backend dan pengembangan aplikasi." },
      { id: "dart", abbr: "Da", name: "Dart", rarity: "epic", note: "Mengembangkan aplikasi mobile dan web menggunakan bahasa Dart." },
    ],
  },
  {
    id: "framework",
    label: "Framework",
    items: [
      { id: "react", abbr: "Re", name: "React", rarity: "legendary", note: "Mengembangkan antarmuka web berbasis komponen dan hooks." },
      { id: "next", abbr: "Nx", name: "Next.js", rarity: "legendary", note: "Membangun aplikasi web dengan routing dan optimasi performa." },
      { id: "tailwind", abbr: "Tw", name: "Tailwind CSS", rarity: "epic", note: "Membangun desain antarmuka menggunakan utility classes." },
      { id: "vue", abbr: "Vu", name: "Vue", rarity: "common", note: "Mempelajari pengembangan antarmuka web berbasis komponen." },
      { id: "laravel", abbr: "La", name: "Laravel", rarity: "legendary", note: "Mengembangkan aplikasi web menggunakan PHP, routing, dan database." },
      { id: "flutter", abbr: "Fl", name: "Flutter", rarity: "legendary", note: "Membangun aplikasi mobile dan web menggunakan widget serta Firebase." },
    ],
  },
  {
    id: "alat",
    label: "Alat",
    items: [
      { id: "git", abbr: "Gt", name: "Git dan GitHub", rarity: "legendary", note: "Mengelola versi kode dan repositori proyek." },
      { id: "figma", abbr: "Fg", name: "Figma", rarity: "epic", note: "Membuat desain UI/UX dan prototipe antarmuka." },
      { id: "vitest", abbr: "Vi", name: "Vitest", rarity: "epic", note: "Melakukan pengujian unit dan komponen aplikasi." },
      { id: "android-studio", abbr: "AS", name: "Android Studio", rarity: "epic", note: "Mengembangkan dan menguji aplikasi Android serta Flutter." },
      { id: "vscode", abbr: "VS", name: "Visual Studio Code", rarity: "legendary", note: "Editor utama untuk menulis kode dan mengelola proyek." },
      { id: "laragon", abbr: "Lg", name: "Laragon", rarity: "epic", note: "Menyiapkan server lokal untuk pengembangan PHP dan MySQL." },
    ],
  },
];

/* --------------------------- Pengalaman ---------------------------- */

export type Quest = {
  id: string;
  role: string;
  org: string;
  period: string;
  status: "active" | "done";
  summary: string;
  rewards: string[];
  stack: string[];
};

export const experience: Quest[] = [
  {
    id: "pendidikan",
    role: "D3 Information Technology Graduate",
    org: "Politeknik Negeri Madiun",
    period: "2022 sampai 2025",
    status: "done",
    summary: "Menyelesaikan pendidikan Diploma III di Politeknik Negeri Madiun dengan mengerjakan proyek tugas akhir di bidang computer vision.",
    rewards: [
      "Menyelesaikan tugas akhir pada November 2025 dengan judul Rancang Bangun Prototipe Sistem Klasifikasi Kendaraan Dengan Library TensorFlow di Jalan Kapuas Kota Madiun.",
      "Mengembangkan prototipe berbasis computer vision untuk mendeteksi, menghitung, dan mengklasifikasikan kendaraan melalui CCTV.",
      "Menerapkan teknologi pengolahan citra untuk mendukung efisiensi pemantauan dan manajemen lalu lintas.",
    ],
    stack: ["Python", "TensorFlow", "Computer Vision", "CCTV"],
  },
  {
    id: "inka",
    role: "Web Developer Intern",
    org: "PT INKA Multi Solusi",
    period: "6 bulan",
    status: "done",
    summary: "Mengikuti program magang selama enam bulan dengan fokus pada pengembangan sistem informasi berbasis web untuk kebutuhan internal perusahaan.",
    rewards: [
      "Mengembangkan Whistleblowing System sebagai platform layanan pengaduan internal perusahaan.",
      "Membangun sistem yang memfasilitasi pelaporan dugaan pelanggaran dan membantu mencegah praktik gratifikasi di lingkungan perusahaan.",
      "Mendukung digitalisasi proses pengaduan agar pelaporan dapat dilakukan secara lebih terstruktur.",
    ],
    stack: ["Web Development", "PHP", "Database", "UI/UX Design"],
  },
  {
    id: "freelance",
    role: "Freelance Web Developer",
    org: "Independent",
    period: "Project-based",
    status: "active",
    summary: "Mengerjakan berbagai proyek pengembangan website untuk instansi pemerintahan, perusahaan, dan sektor pariwisata.",
    rewards: [
      "Mengembangkan website resmi Dinas Kebudayaan, Pariwisata, Pemuda, dan Olahraga Kota Madiun.",
      "Membangun website company profile untuk Wisata Lembah Wilis, Kabupaten Madiun.",
      "Mengembangkan website company profile untuk PT Zulfana Umroh.",
      "Menangani proses pengembangan website mulai dari perancangan antarmuka, implementasi fitur, hingga deployment.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Laravel", "Next.js", "UI/UX Design"],
  },
];

/* ------------------------------ Proyek ----------------------------- */

export type ArtKind = "pos" | "components" | "dashboard" | "landing" | "game" | "map";

export type Project = {
  id: string;
  title: string;
  category: string;
  blurb: string;
  /** Tingkat kompleksitas 1 sampai 5. */
  difficulty: 1 | 2 | 3 | 4 | 5;
  art: ArtKind;
  /** Warna latar ilustrasi: nama variabel CSS. */
  tone: "coin" | "berry" | "mint" | "grape";
  role: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  stack: string[];
  /** Ganti dengan URL asli. Kosongkan untuk menyembunyikan tombolnya. */
  demo?: string;
  repo?: string;
  /**
   * Jalur gambar di folder public/. Gambar pertama jadi sampul kartu.
   * Hapus barisnya (atau kosongkan) untuk memakai ilustrasi bawaan.
   */
  images?: string[];
};

export const projects: Project[] = [
  {
    id: "Whistleblowing-System",
    title: "Whistleblowing System",
    category: "Website Layanan Pengaduan",
    blurb: "Aplikasi berbasis web yang dikembangkan untuk memfasilitasi pelaporan pengaduan internal serta mendukung transparansi di lingkungan perusahaan.",
    difficulty: 4,
    art: "pos",
    tone: "coin",
    role: "Web Developer Intern di PT INKA Multi Solusi.",
    challenge:
      "Perusahaan membutuhkan platform pelaporan yang terstruktur untuk memudahkan penyampaian dan pengelolaan pengaduan internal serta membantu mencegah praktik gratifikasi.",
    solution:
      "Mengembangkan Whistleblowing System yang memungkinkan pengguna menyampaikan laporan melalui platform berbasis web, sehingga proses pengaduan menjadi lebih terorganisir, mudah diakses, dan efisien.",
    results: [
      { value: "1", label: "platform pelaporan pengaduan terintegrasi" },
      { value: "24/7", label: "akses pelaporan secara online" },
      { value: "1", label: "sistem pengelolaan pengaduan terpusat" },
    ],
    stack: ["Next.js", "Laravel"],
    demo: "https://wbs.inkamultisolusi.co.id/",
    images: ["/projects/inka.png", "/projects/inka1.png", "/projects/inka2.png"],
  },
  {
    id: "Dinas-Kebudayaan-Pariwisata-Pemuda-dan-Olahraga",
    title: "Disbudparpora Kota Madiun",
    category: "Website Pemerintahan",
    blurb: "Website resmi yang menyediakan informasi seputar kebudayaan, pariwisata, kepemudaan, dan olahraga di Kota Madiun.",
    difficulty: 5,
    art: "components",
    tone: "grape",
    role: "Web Developer.",
    challenge:
      "Dibutuhkan website resmi sebagai media penyampaian informasi dan publikasi kegiatan Disbudparpora Kota Madiun agar masyarakat dapat mengakses informasi dengan lebih mudah.",
    solution:
      "Mengembangkan website berbasis Laravel untuk menyajikan informasi profil instansi, berita, kegiatan, serta berbagai informasi terkait layanan dan program Disbudparpora Kota Madiun.",
    results: [
      { value: "1", label: "website resmi instansi pemerintah" },
      { value: "4", label: "bidang informasi utama" },
      { value: "Online", label: "akses informasi bagi masyarakat" },
    ],
    stack: ["Laravel"],
    demo: "https://disbudparpora.madiunkota.go.id/",
    images: ["/projects/disparpora.png", "/projects/disparpora1.png", "/projects/disparpora2.png"],
  },
  {
    id: "PT-Zulfana-Umroh",
    title: "PT Zulfana Umroh",
    category: "Website Pemesanan Umroh",
    blurb: "Website layanan pemesanan paket perjalanan umroh yang memudahkan calon jamaah memperoleh informasi dan melakukan pemesanan secara online.",
    difficulty: 4,
    art: "dashboard",
    tone: "mint",
    role: "Web Developer.",
    challenge:
      "Calon jamaah membutuhkan platform online yang menyediakan informasi paket perjalanan umroh secara jelas serta memudahkan proses pemesanan tanpa harus datang langsung ke kantor.",
    solution:
      "Mengembangkan website layanan umroh yang menampilkan informasi paket perjalanan, detail layanan, dan fasilitas pemesanan tiket umroh secara online agar calon jamaah lebih mudah mendapatkan informasi dan melakukan pemesanan.",
    results: [
      { value: "Online", label: "layanan pemesanan paket umroh" },
      { value: "Terpusat", label: "informasi paket dan perjalanan umroh" },
      { value: "Mudah", label: "akses informasi bagi calon jamaah" },
    ],
    stack: ["Next.js", "HTML"],
    demo: "https://example.com",
    images: ["/projects/zulfana.png", "/projects/zulfana1.png", "/projects/zulfana2.png"],
  },
];

/* ------------------------------ Trofi ------------------------------ */

export const awards = [
  {
    id: "tugas-akhir",
    title: "Tugas akhir: sistem klasifikasi kendaraan",
    year: "2025",
    note: "Prototipe computer vision dengan TensorFlow untuk mendeteksi, menghitung, dan mengklasifikasikan kendaraan lewat CCTV di Jalan Kapuas, Kota Madiun.",
  },
  {
    id: "magang-inka",
    title: "Magang web developer di PT INKA Multi Solusi",
    year: "6 bulan",
    note: "Mengembangkan Whistleblowing System sebagai platform pengaduan internal perusahaan.",
  },
  {
    id: "website-dinas",
    title: "Website resmi Dinas Kebudayaan, Pariwisata, Pemuda, dan Olahraga Kota Madiun",
    year: "Freelance",
    note: "Menangani proyek dari perancangan antarmuka, implementasi fitur, sampai deployment.",
  },
] as const;

export type AchievementId = "start" | "explorer" | "collector" | "secret";

/** Trofi yang terbuka lewat interaksi di dalam situs ini. */
export const siteAchievements: { id: AchievementId; title: string; description: string }[] = [
  { id: "start", title: "Pemain baru", description: "Menekan tombol mulai di layar pembuka." },
  { id: "explorer", title: "Penjelajah", description: "Mengunjungi ketujuh stage." },
  { id: "collector", title: "Kolektor koin", description: "Mengumpulkan 5 koin." },
  { id: "secret", title: "Kode rahasia", description: "Memasukkan kode yang dikenal semua pemain lama." },
];

/** Jumlah koin yang bisa dikumpulkan: 3 blok di hero + 5 koin bonus. */
export const TOTAL_COINS = 8;
export const COLLECTOR_TARGET = 5;