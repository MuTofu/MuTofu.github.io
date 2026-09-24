# Portofolio — Cahya Mustofa

Website portofolio satu halaman: HTML + CSS + JavaScript biasa, tanpa build dan tanpa npm.

## Struktur

```
index.html      kerangka halaman
css/style.css   styling (warna di :root paling atas)
js/data.js      SEMUA KONTEN (dari CV) — edit file ini untuk mengganti isi
js/main.js      render konten + interaksi (menu, filter proyek, form, animasi)
assets/cv.pdf   CV untuk tombol "Unduh CV"
assets/profile.jpg   foto profil (kalau dihapus, hero tampil tanpa foto)
studi-kasus/    halaman studi kasus responsif (medivoura, irit, kjpp, siakad)
css/case.css    styling bersama untuk semua halaman studi kasus
project/        file asli dari tool desain — hanya dipakai sebagai sumber gambar
```

## Menjalankan

Cukup buka `index.html`, atau pakai server lokal:

```
python -m http.server 5500
```

lalu buka http://localhost:5500

## Menambah studi kasus

Salin salah satu file di `studi-kasus/`, ganti teks dan gambarnya, lalu atur
warna khas proyek lewat variabel di tag `<body style="--accent:…; --band:…">`.

## Mengganti konten

- Profil, keahlian, proyek, pengalaman, pendidikan → `js/data.js`
- Menambah proyek → tambah objek di `projects` (gambar, `fit`, warna `tone`, `url` studi kasus)
- Warna aksen → `--accent` di `css/style.css`

## Form kontak

Form dikirim lewat [Web3Forms](https://web3forms.com) ke email yang didaftarkan di sana
(access key ada di `web3formsKey` di `js/data.js`). Kalau key dikosongkan, form
kembali membuka aplikasi email pengunjung (mailto).

## Deploy

Situs dihosting di GitHub Pages: https://mutofu.github.io — setiap `git push` ke
`main` otomatis memperbarui situs dalam 1–2 menit.
