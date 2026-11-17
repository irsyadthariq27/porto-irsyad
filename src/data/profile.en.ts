import type { Overlay } from "@/i18n/types";

/**
 * TERJEMAHAN BAHASA INGGRIS.
 *
 * Isi profile.ts tetap menjadi sumber utama (bahasa Indonesia, angka, tautan,
 * email, teknologi). File ini hanya berisi teks yang diterjemahkan, dikunci
 * dengan `id` yang sama seperti di profile.ts. Misalnya proyek dengan id
 * "kasirku" di profile.ts diterjemahkan di `projects.kasirku` di bawah.
 *
 * Kalau ada item di profile.ts yang belum punya terjemahan di sini, situs
 * tetap menampilkannya dengan teks aslinya, jadi tidak ada yang hilang.
 */
export const en: Overlay = {
  stageLabels: {
    start: "Start",
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    achievements: "Trophies",
    contact: "Contact",
  },

  profile: {
    role: "Front-end developer",
    tagline: "A front-end developer who builds fast, accessible, and enjoyable web interfaces.",
    availability: "Open to new projects",
    location: "Indonesia, working remotely",
    responseTime: "1 to 2 business days",
    heroFacts: [
      "A Lighthouse score of 100 isn't luck. It's a habit.",
      "I test every component with the keyboard first, and the mouse second.",
      "Coffee first, refactor second. The order matters.",
    ],
  },

  about: {
    paragraphs: [
      "Hello! I am a Front-End Developer who loves bridging the gap between design and code. With 1 year of experience building lively and responsive web interfaces, I believe that small details—such as fast load times and smooth keyboard navigation—are what make for an extraordinary user experience.",
      "To me, web development is not just about displaying data, but also about how natural an interaction feels to the user. I bring this spirit of exploration outside of working hours, where I frequently build simple websites to keep sharpening my interaction logic and smooth animations.",
    ],
      sheet: [
      { key: "Education", value: "D3 State Polytechnic of Madiun" },
      { key: "Experience", value: "1 year of experience" },
      { key: "Location", value: "East Java, Madiun City" },
      { key: "Languages", value: "Indonesian and English" },
      { key: "Skills", value: "Laravel and Next.js" },
    ],
    attributes: [
    "Website Development",
    "UI/UX Design",
    "Frontend Development",
    "Responsive Web Design",
    "Website Performance Optimization",
  ],
  },

  rarity: {
    legendary: { label: "Legendary", meaning: "Used almost every day." },
    epic: { label: "Epic", meaning: "Comfortable using it in production." },
    rare: { label: "Rare", meaning: "Used on real projects." },
    common: { label: "Common", meaning: "Currently learning." },
  },

  skillGroups: {
    bahasa: "Languages",
    framework: "Frameworks",
    alat: "Tools",
  },

    skills: {
    html: {
      name: "Semantic HTML",
      note: "Building well-structured, accessible, and responsive web page layouts.",
    },
    css: {
      name: "Modern CSS",
      note: "Creating responsive layouts, animations, and visually appealing interfaces.",
    },
    js: { note: "Developing interactive features and dynamic functionality for web applications." },
    ts: { note: "Using a strong type system to write more structured and maintainable code." },
    node: { note: "Using JavaScript for backend development and application tooling." },
    dart: { note: "Developing mobile and web applications using the Dart programming language." },
    react: { note: "Building component-based web interfaces with reusable components and hooks." },
    next: { note: "Building modern web applications with routing, rendering, and performance optimization." },
    tailwind: { note: "Creating consistent and responsive user interfaces with utility-first styling." },
    vue: { note: "Exploring component-based web development through personal projects." },
    laravel: { note: "Developing web applications using PHP, routing, database integration, and authentication." },
    flutter: { note: "Building cross-platform mobile applications using widgets and Firebase integration." },
    git: {
      name: "Git and GitHub",
      note: "Managing code versions, maintaining repositories, and collaborating on development projects.",
    },
    figma: { note: "Creating UI/UX designs, organizing layouts, and building interactive prototypes." },
    vitest: { note: "Performing unit and component testing for application functionality." },
    "android-studio": { name: "Android Studio", note: "Developing, running, and testing Android and Flutter applications." },
    vscode: { name: "Visual Studio Code", note: "Writing code, managing projects, and working with development extensions." },
    laragon: { name: "Laragon", note: "Setting up local development environments for PHP and MySQL applications." },
  },

  experience: {
    pendidikan: {
      period: "2022 to 2025",
      summary: "Graduated with a Diploma III in Information Technology from Politeknik Negeri Madiun, focusing on a final project in computer vision.",
      rewards: [
        "Completed a final project in November 2025 titled 'Vehicle Classification System Prototype Using the TensorFlow Library on Kapuas Street, Madiun City'.",
        "Developed a computer vision-based prototype to detect, count, and classify vehicles through CCTV cameras.",
        "Applied image processing technology to support more efficient traffic monitoring and management.",
      ],
    },
    inka: {
      period: "6 months",
      summary: "Completed a six-month internship at PT INKA Multi Solusi, focusing on web-based information system development for internal company operations.",
      rewards: [
        "Developed a Whistleblowing System as an internal reporting platform for company complaints.",
        "Built a system to facilitate the reporting of suspected violations and help prevent gratification practices within the company.",
        "Supported the digitalization of the complaint process to make reporting more structured and accessible.",
      ],
    },
    freelance: {
      org: "Independent",
      period: "Project-based",
      summary: "Worked on various website development projects for government institutions, businesses, and the tourism sector.",
      rewards: [
        "Developed the official website for the Department of Culture, Tourism, Youth, and Sports of Madiun City.",
        "Built a company profile website for Lembah Wilis Tourism in Madiun Regency.",
        "Developed a company profile website for PT Zulfana Umroh.",
        "Handled website development from interface design and feature implementation to deployment.",
      ],
    },
  },

  projects: {
  "Whistleblowing-System": {
    category: "Complaint Reporting Website",
    blurb:
      "A web-based platform developed to facilitate internal complaint reporting and promote transparency within the company.",
    role: "Web Developer Intern at PT INKA Multi Solusi.",
    challenge:
      "The company needed a structured reporting platform to simplify the submission and management of internal complaints while helping prevent gratification practices.",
    solution:
      "Developed a Whistleblowing System that allows users to submit reports through a web-based platform, making the complaint process more organized, accessible, and efficient.",
    results: [
      { value: "1", label: "integrated complaint reporting platform" },
      { value: "24/7", label: "online reporting access" },
      { value: "1", label: "centralized complaint management system" },
    ],
  },
  "Dinas-Kebudayaan-Pariwisata-Pemuda-dan-Olahraga": {
    category: "Government Website",
    blurb:
      "The official website providing information about culture, tourism, youth, and sports in Madiun City.",
    role: "Web Developer.",
    challenge:
      "The agency needed an official website to share information and publish activities, making public information more accessible to the community.",
    solution:
      "Developed a Laravel-based website featuring agency profiles, news, activities, and information about the programs and services of the Madiun City Department of Culture, Tourism, Youth, and Sports.",
    results: [
      { value: "1", label: "official government website" },
      { value: "4", label: "main information categories" },
      { value: "Online", label: "public access to information" },
    ],
  },
  "PT-Zulfana-Umroh": {
    category: "Umrah Booking Website",
    blurb:
      "An online Umrah booking website that helps prospective pilgrims explore travel packages and make reservations.",
    role: "Web Developer.",
    challenge:
      "Prospective pilgrims needed an online platform with clear information about Umrah packages and a convenient booking process without having to visit the office in person.",
    solution:
      "Developed an Umrah service website featuring travel package information, service details, and online booking facilities to make it easier for prospective pilgrims to explore and book their journeys.",
    results: [
      { value: "Online", label: "Umrah package booking service" },
      { value: "Centralized", label: "travel package information" },
      { value: "Easy", label: "access to information for prospective pilgrims" },
    ],
  },
},

    awards: {
    "tugas-akhir": {
      title: "Final project: vehicle classification system",
      note: "A computer vision prototype built with TensorFlow to detect, count, and classify vehicles through CCTV on Jalan Kapuas, Madiun City.",
    },
    "magang-inka": {
      title: "Web developer internship at PT INKA Multi Solusi",
      year: "6 months",
      note: "Developed a Whistleblowing System, an internal complaint platform for the company.",
    },
    "website-dinas": {
      title: "Official website of the Madiun City Department of Culture, Tourism, Youth, and Sports",
      note: "Handled the project from interface design and feature implementation through deployment.",
    },
  },

  siteAchievements: {
    start: { title: "New player", description: "Pressed the start button on the start screen." },
    explorer: { title: "Explorer", description: "Visited all seven stages." },
    collector: { title: "Coin collector", description: "Collected 5 coins." },
    secret: { title: "Secret code", description: "Entered the code every veteran player knows." },
  },
};
