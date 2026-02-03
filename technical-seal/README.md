# Berita Indo - Portal Berita Terkini

Proyek ini adalah portal berita modern yang dibangun menggunakan **React 19** dan **Tailwind CSS 4**. Website ini menyajikan berita real-time dari Antara News dan CNN Indonesia melalui API aggregator publik.

## Fitur Website

- **Berita dari Berbagai Sumber**: Menggabungkan kategori berita dari Antara (Terkini, Top News) dan CNN Indonesia (Nasional, Ekonomi, Teknologi, dll) dalam satu tampilan.
- **Interaksi Halus**: Implementasi hover effects, scroll reveal, dan loading skeleton menggunakan Framer Motion(untuk animas) untuk pengalaman pengguna yang lebih baik.
- **Pencarian Cepat**: Fitur search yang responsif tanpa perlu melakukan refresh halaman.
- **Navigasi Halaman**: Sistem pagination yang efisien untuk menangani data berita dalam jumlah besar.
- **Layout Responsif**: Tampilan sudah dioptimalkan untuk berbagai ukuran layar, mulai dari smartphone hingga desktop.

## Teknologi yang Digunakan

- **Core**: React 19, Vite, React Router Dom 7
- **Styling**: Tailwind CSS 4
- **Animation & UI**: Framer Motion, Lucide React
- **Data Fetching**: Axios

## Sumber Desain

Proyek ini merupakan hasil _Slicing_ (implementasi kode) berdasarkan desain yang disediakan di **Figma**. Fokus utama adalah mentransformasi desain visual tersebut ke dalam komponen React yang fungsional, responsif, dan interaktif.

## Penjelasan Teknis & Decision Making

### Integrasi API & Normalisasi Data

Aplikasi ini mengosumsi data dari [API Aggregator](https://berita-indo-api-next.vercel.app). Karena struktur data dari Antara dan CNN berbeda (terutama pada bagian image property dan field judul), saya membuat fungsi normalisasi di `src/services/api.js`. Ini memastikan semua data yang masuk ke komponan UI sudah memiliki format yang sama, sehingga kode komponen lebih bersih.

### Komponen Simulasi (Dummy Data)

Berhubung API yang tersedia hanya menyediakan data berita tanpa fitur interaksi atau konten promosi khusus, beberapa bagian pada website ini bersifat simulasi untuk melengkapi estetika desain sesuai Figma:

- **Bagian Komentar**: Menampilkan simulator komentar untuk menunjukkan hasil _slicing_ UI yang lengkap secara visual.
- **Banner Promosi**: Banner di bagian bawah (seperti info City Tour) adalah konten statis/dummy untuk mendemonstrasikan penempatan area promosi atau iklan pada portal berita.

### Optimasi Performa

Untuk mempercepat waktu loading, saya menerapkan `Promise.all` saat melakukan fetch data dari beberapa kategori sekaligus. Selain itu, fitur _Code Splitting_ (Lazy Loading) juga diterapkan pada routing agar browser hanya memuat kode halaman yang memang sedang dibuka oleh pengguna.

### Detail Artikel & Rekomendasi

- **Berita Terkait**: Menggunakan logika _Category Matching_. Berita yang muncul di bawah artikel secara otomatis disaring berdasarkan kategori yang sama dengan artikel yang sedang dibaca.
- **Berita Terpopuler**: Pada halaman Home, data diambil khusus dari endpoint _Antara Top-News_. Pada halaman detail, sidebar menampilkan berita populer dari kategori terkait untuk menjaga relevansi topik bagi pembaca.

### Manajemen Environment & Deployment

Pengaturan API URL dipisahkan ke dalam file `.env` agar aman dan fleksibel saat deployment.

**Contoh isi file `.env`:**

```env
# URL API untuk mode Production (ketika di-build)
VITE_API_BASE_URL=https://berita-indo-api-next.vercel.app/api

# URL Target untuk Proxy saat Development
VITE_API_BASE_URL_SOURCE=https://berita-indo-api-next.vercel.app
```

Untuk mode development, proyek ini menggunakan file `.env.development` yang mengarahakn path ke `/api` via **Vite Proxy** guna menghindari isu CORS di localhost.

## Tools & Referensi

Dalam pengerjaan proyek ini, saya menggunakan beberapa alat bantu untuk mengoptimalkan workflow:

- **Gemini 3.0 Antigravity**: Membantu dalam proses debugging dan memberikan saran efisiensi kode.
- **Vite**: Sebagai build tool utama.
- **Dokumentasi & YouTube**: Sebagai referensi untuk penerapan fitur-fitur baru di React 19 dan Tailwind 4.

## Cara Instalasi Lokal

1. Download atau clone repositori.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka `http://localhost:5173`.

---

**Author:** [Naufal Assani Saputra](https://github.com/naufalassani)  
**Tujuan:** Proyek ini dikerjakan sebagai **Technical Assignment** untuk posisi Frontend Developer, yang mencakup aspek _UI Slicing_, _API Integration_, dan _Web Optimization_.
