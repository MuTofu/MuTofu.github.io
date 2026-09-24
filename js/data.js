// =====================================================================
//  SEMUA KONTEN WEBSITE ADA DI SINI (diambil dari CV).
//  Ganti teks di bawah — tidak perlu menyentuh HTML/CSS/JS lain.
// =====================================================================

const PORTFOLIO = {
  name: "Cahya Mustofa",
  firstName: "Cahya",
  role: "Web & Mobile Developer",
  intro:
    "Web developer dengan fokus di Laravel. Saya membangun sistem dari arsitektur, database, hingga autentikasi dan manajemen role — dilengkapi pengembangan mobile dengan Flutter dan Kotlin.",

  // Taruh foto di assets/profile.jpg — kalau tidak ada, inisial nama yang tampil.
  photo: "assets/profile.jpg",
  cv: "assets/cv.pdf",

  email: "Cahya.mustofa2@gmail.com",
  // Access key dari web3forms.com — pesan dari form kontak dikirim ke email yang
  // didaftarkan di sana. Kalau kosong, form membuka aplikasi email (mailto).
  web3formsKey: "c9c3e06e-26c1-4e4c-a28a-69abedd95761",
  phone: "+62 851-5693-8796",
  whatsapp: "6285156938796",
  location: "Yogyakarta, Indonesia",

  // icon: github | linkedin | mail | whatsapp
  socials: [
    { label: "GitHub", url: "https://github.com/MuTofu", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/cahya-mustofa/", icon: "linkedin" },
    { label: "Email", url: "mailto:Cahya.mustofa2@gmail.com", icon: "mail" },
  ],

  about: {
    // {accent}...{/accent} = teks berwarna oranye
    lead:
      "Saya membangun sistem multi-tenant SaaS dari nol di bawah brand {accent}Medivo Solutions{/accent}, dan terbiasa memegang proyek dari perancangan sampai berjalan di produksi.",
    text:
      "Lima tahun sebagai mentor AWS Cloud Computing membentuk kebiasaan saya menjelaskan hal teknis dengan jelas — ke klien, ke tim, maupun ke siswa. Saya bekerja mandiri maupun dalam tim kecil.",
    stat: { value: 5, suffix: "+", label: "Tahun di dunia\nteknologi" },
    facts: [
      { label: "Lokasi", value: "Yogyakarta" },
      { label: "Saat ini", value: "Freelance · Medivo Solutions" },
      { label: "Pendidikan", value: "S1 Informatika, UTY" },
      { label: "Fokus", value: "Laravel · Flutter" },
    ],
  },

  skills: [
    {
      group: "Web & Backend",
      items: ["Laravel", "React", "Livewire", "Volt", "Mary UI", "PostgreSQL (RLS)", "MySQL", "Laravel Sanctum", "Spatie Permission", "Laravel Reverb", "REST API"],
    },
    {
      group: "Mobile",
      items: ["Flutter", "Dart", "Kotlin", "Clean Architecture", "Riverpod", "Provider / MVVM", "SQLite"],
    },
    {
      group: "Lainnya",
      items: ["FastAPI", "Django", "JWT", "AWS Cloud Computing", "Git", "ClickUp"],
    },
  ],

  projectFilters: [
    { key: "all", label: "Semua" },
    { key: "web", label: "Web" },
    { key: "mobile", label: "Mobile" },
    { key: "client", label: "Proyek Klien" },
    { key: "personal", label: "Proyek Pribadi" },
  ],

  // fit: "cover" (screenshot lebar) | "contain" (mockup) | "phones" (beberapa screenshot HP)
  projects: [
    {
      title: "Medivoura",
      kind: "Multi-tenant SaaS POS Retail",
      year: "2026",
      stack: ["Laravel", "React", "PostgreSQL", "Reverb"],
      cats: ["web", "client"],
      images: ["project/Medivoura/assets/71df9c779bf04f332390c3e67fc7dbd7.png"],
      fit: "contain",
      tone: "#e9efe9",
      url: "studi-kasus/medivoura.html",
    },
    {
      title: "IRIT",
      kind: "Aplikasi keuangan pribadi",
      year: "2025",
      stack: ["Flutter", "Riverpod", "SQLite"],
      cats: ["mobile", "personal"],
      images: [
        "project/IRIT/assets/3f11c4ddb8e8a22a271dd708111ede52.png",
        "project/IRIT/assets/a8b295bc24ad5c156e4e1f65fd7ab332.png",
        "project/IRIT/assets/c0cfddee9dc43a2146fe946cec6e8634.png",
      ],
      fit: "phones",
      tone: "#e8ecf5",
      url: "studi-kasus/irit.html",
    },
    {
      title: "Sistem KJPP",
      kind: "Penilaian aset kendaraan",
      year: "2024 – 2025",
      stack: ["Django", "Python"],
      cats: ["web", "client"],
      images: ["project/kjpp/assets/c5394a3efdb8cba62975c52aa4a89abe.png"],
      fit: "cover",
      tone: "#e6e9ee",
      url: "studi-kasus/kjpp.html",
    },
    {
      title: "SIAKAD",
      kind: "Sistem akademik berbasis microservice",
      year: "2026 · Skripsi",
      stack: ["FastAPI", "Flutter", "JWT"],
      cats: ["mobile", "personal"],
      images: ["project/SIAKAD/assets/c9da19b4ca430c66b443e19e39c72631.png"],
      fit: "cover",
      tone: "#e7ecf7",
      url: "studi-kasus/siakad.html",
    },
  ],

  experience: [
    {
      period: "Nov 2023 — Sekarang",
      role: "Web & Mobile Developer",
      org: "Medivo Solutions · Freelance",
      points: [
        "Memimpin pengembangan Medivoura, POS SaaS multi-tenant untuk retail, dari arsitektur hingga produksi.",
        "Mengembangkan fitur web dengan Laravel, Livewire, dan Volt untuk produk internal maupun klien.",
        "Membangun aplikasi mobile lintas platform dengan Flutter dan Kotlin.",
        "Menangani proyek paralel: sistem penilaian aset KJPP, KasirKu POS, dan SiAkad.",
      ],
    },
    {
      period: "Jun 2021 — Mar 2026",
      role: "Education Mentor",
      org: "Yayasan Sagasitas Indonesia",
      points: [
        "Mengajar dasar AWS Cloud Computing untuk siswa SMA/SMK dan mahasiswa UNESA.",
        "Developer sekaligus desainer di tim pengembang web yayasan.",
        "Berpartisipasi dalam program Intel AI hasil kolaborasi yayasan dengan Intel.",
      ],
    },
  ],

  education: [
    { period: "2021 — 2026", title: "S1 Informatika", org: "Universitas Teknologi Yogyakarta", note: "IPK 3.60 / 4.00" },
    { period: "2018 — 2021", title: "Teknik Komputer dan Jaringan", org: "SMK Negeri 3 Yogyakarta", note: "" },
  ],
};
