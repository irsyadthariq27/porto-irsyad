# Portofolio Front-end Developer: Edisi Game

Situs portofolio bertema game yang dibangun dengan Next.js (App Router), TypeScript, Tailwind CSS 4, dan Motion.
Pengunjung "bermain" di dalam portofolio: ada layar pembuka, mini game di hero, HUD, inventori skill, riwayat misi, pilih stage untuk proyek, dan ruang trofi.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi
npm run start    # jalankan hasil build
```

Butuh Node.js 20 atau lebih baru.

## Mengganti isi dengan data kamu

Semua teks, proyek, skill, dan tautan ada di satu file: `src/data/profile.ts`. Seluruh isinya adalah contoh, jadi ganti dengan data kamu. Teks di file ini adalah **versi Indonesia**. Versi English ada di `src/data/profile.en.ts` (lihat bagian Bahasa di bawah).

| Bagian | Yang diubah |
| --- | --- |
| `profile` | Nama, peran, tagline, email, tautan sosial, URL CV, tiga fakta di blok kejutan hero |
| `about` | Paragraf profil, lembar karakter, atribut (nilai 0 sampai 100) |
| `skillGroups` | Daftar skill per kategori, tingkat kelangkaan, dan catatannya |
| `experience` | Riwayat kerja dan pencapaian |
| `projects` | Proyek lengkap dengan tantangan, solusi, hasil, dan tautan demo atau repo |
| `awards` | Penghargaan dan sertifikasi |

Catatan kecil:

- `resumeUrl`: taruh PDF di folder `public/` (misalnya `public/cv.pdf`) lalu isi `"/cv.pdf"`. Kalau dikosongkan, tombol CV otomatis hilang.
- `demo` dan `repo` pada proyek bersifat opsional. Kosongkan untuk menyembunyikan tombolnya.
- Ilustrasi proyek dipilih lewat `art` (`pos`, `components`, `dashboard`, `landing`, `game`, `map`) dan `tone`. Untuk memakai tangkapan layar asli, ganti `ProjectArt` di `src/components/sections/Projects.tsx` dengan `next/image`.
- Metadata SEO diambil dari `profile` di `src/app/layout.tsx`. Judul tab dan deskripsi ikut berganti saat bahasa diganti.
- Foto profil dan alamat situs ada di `src/data/site.ts`. Isi `profilePhoto` dengan jalur berkas di `public/` (misalnya `"/foto-profil.jpg"`). Kalau dikosongkan, bagian Profil menampilkan karakter pixel. Isi `siteUrl` setelah situs online supaya pratinjau tautan di media sosial benar.

## Bahasa (Indonesia dan English)

Tombol **ID / EN** ada di HUD dan di layar pembuka. Pilihan bahasa langsung berlaku tanpa memuat ulang halaman, tersimpan di `localStorage`, dan memperbarui atribut `lang` pada `<html>`, judul tab, serta meta deskripsi. Bahasa bawaan adalah Indonesia.

Cara kerjanya:

- **Teks antarmuka** (tombol, label, pesan galat, notifikasi) ada di `src/i18n/ui.ts`, satu blok per bahasa.
- **Isi portofolio** tetap di `src/data/profile.ts`. Terjemahan English ada di `src/data/profile.en.ts` sebagai lapisan tambahan yang dikunci dengan `id` yang sama (`projects.pulse`, `skills.react`, dan seterusnya). Angka, tautan, email, dan daftar teknologi tidak perlu diterjemahkan karena diambil dari `profile.ts`.
- Bagian yang belum diterjemahkan otomatis memakai teks Indonesia, jadi menambah proyek atau skill baru di `profile.ts` tidak merusak versi English. Kamu hanya perlu menambahkan terjemahannya di `profile.en.ts`.
- Daftar `paragraphs`, `sheet`, `attributes`, `heroFacts`, dan `results` diterjemahkan berdasarkan urutan, jadi pertahankan urutannya sama dengan di `profile.ts`.

Untuk menambah bahasa lain, tambahkan kode bahasanya di `src/i18n/types.ts`, buat berkas terjemahan seperti `profile.en.ts`, dan daftarkan di `src/i18n/content.ts` serta `src/i18n/ui.ts`.

## Animasi scroll

Animasinya mengikuti tema game dan hanya dimainkan satu kali saat elemen pertama kali masuk layar:

| Bagian | Efek |
| --- | --- |
| Judul stage | Tombol angka "ditekan", judul tersapu per langkah seperti layar loading |
| Kartu profil, panel skill, kartu proyek | Jatuh dari atas lalu memantul seperti blok |
| Item skill, trofi situs | Muncul membesar seperti item masuk inventori |
| Atribut | Kotak bar menyala satu per satu seperti layar statistik |
| Riwayat misi | Kartu masuk dari kiri, garis putus-putus tergambar dari atas, simpul muncul seperti stempel |
| Hero | Elemen muncul berurutan setelah menekan "Mulai main" |
| Latar | Awan dan bukit bergeser dengan kecepatan berbeda (parallax) seperti kamera game side-scroller. Malam hari diganti bintang berkelip |

Catatan teknis: animasi memakai CSS keyframes dan `IntersectionObserver` (`src/components/motion/Reveal.tsx`), bukan pustaka tambahan. Tanpa JavaScript, semua konten tetap terlihat. Animasi mati otomatis saat OS meminta gerak dikurangi, atau lewat Pengaturan, dan tidak ikut tercetak. Gaya animasinya ada di bagian akhir `src/app/globals.css`, dan latar parallax di `src/components/game/Backdrop.tsx`.

## Fitur interaktif

- **Layar pembuka** dengan bar loading dan tombol "Mulai main". Hanya tampil sekali per sesi browser.
- **Mini game di hero**: jalan dengan panah atau A/D, lompat dengan spasi, W, atau panah atas. Ada tombol layar untuk perangkat sentuh. Blok `?` bisa juga diklik langsung.
- **HUD**: level mengikuti stage aktif, bar XP mengikuti progres scroll, penghitung koin.
- **Hotbar bawah**: navigasi antar stage. Tombol angka `1` sampai `7` juga melompat ke stage yang sesuai.
- **Koin dan trofi**: 3 koin di blok hero dan 5 koin bonus tersembunyi. Progres tersimpan di `localStorage`.
- **Mode siang dan malam**, mengikuti pengaturan OS saat kunjungan pertama.
- **Ganti bahasa** Indonesia dan English, langsung tanpa memuat ulang halaman.
- **Pengaturan**: efek suara (mati secara bawaan, disintesis dengan Web Audio sehingga tanpa file audio), kurangi gerak (mematikan juga animasi scroll), mode retro, reset progres.
- **Kode rahasia**: coba kode Konami.

## Aksesibilitas

Navigasi penuh dengan keyboard, fokus terlihat jelas, dialog mengunci fokus dan bisa ditutup dengan Esc, tab skill memakai pola WAI-ARIA, gerak dikurangi otomatis mengikuti `prefers-reduced-motion`, dan semua elemen interaktif punya nama yang terbaca pembaca layar.

## Formulir kontak

Situs ini tidak memiliki backend. Saat formulir dikirim, aplikasi email di perangkat pengunjung terbuka dengan pesan yang sudah terisi (`mailto:`). Kalau kamu ingin pesan masuk langsung, sambungkan ke layanan formulir atau buat Route Handler di `src/app/api/contact/route.ts`, lalu ganti `onSubmit` di `src/components/sections/Contact.tsx`.

## Struktur

```
src/
  app/                 layout, halaman, gaya global, ikon situs
  components/
    game/              provider state, layar pembuka, HUD, hotbar, tombol bahasa, latar parallax, pixel art
    motion/            Reveal (animasi saat scroll)
    sections/          Hero, About, Skills, Experience, Projects, Achievements, Contact, Footer
    ui/                Dialog yang aksesibel
  data/
    profile.ts         seluruh konten (versi Indonesia)
    profile.en.ts      terjemahan English
    site.ts            foto profil dan alamat situs
  i18n/                kamus teks antarmuka, penggabung terjemahan, hook useI18n
  lib/                 utilitas dan efek suara
```

Warna dan gaya dikendalikan variabel CSS di `src/app/globals.css` (blok `:root` untuk siang dan `html[data-theme="night"]` untuk malam). Font Pixelify Sans dan Bricolage Grotesque dimuat lewat paket `@fontsource-variable`, jadi dihosting sendiri tanpa permintaan ke Google Fonts.

## Deploy

Cara termudah adalah Vercel: unggah ke GitHub, impor repositori di vercel.com, lalu deploy tanpa konfigurasi tambahan.
