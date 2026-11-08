# Panduan Lengkap Deploy MineLaunch Hub

Proyek ini telah dikonfigurasi secara lengkap untuk dapat langsung di-deploy sebagai **aplikasi Single Page Application (SPA) Statis** ke berbagai layanan hosting gratis dan cloud populer:

---

## 1. Deploy ke Netlify (Paling Mudah & Otomatis)

Berkas konfigurasi `netlify.toml` dan `public/_redirects` sudah terpasang.

### Cara A: Drag & Drop (Tanpa CLI / Git)
1. Jalankan `npm run build` di terminal Anda.
2. Buka dashboard [Netlify Drop](https://app.netlify.com/drop).
3. Drag & drop folder `dist` ke halaman Netlify.
4. Selesai! Web Anda langsung aktif dengan domain gratis `*.netlify.app` dan HTTPS otomatis.

### Cara B: Sambungkan GitHub / GitLab
1. Push repository Anda ke GitHub.
2. Di dashboard Netlify, klik **Add new site** > **Import an existing project**.
3. Pilih repository Anda. Netlify otomatis mendeteksi konfigurasi dari `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Klik **Deploy site**.

### Cara C: Menggunakan Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 2. Deploy ke Firebase Hosting

Berkas konfigurasi `firebase.json` dan `.firebaserc` sudah terpasang.

### Langkah Deploy:
1. Pastikan Anda telah menginstal Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login ke akun Google Anda:
   ```bash
   firebase login
   ```
3. (Opsional) Pilih project Firebase Anda:
   ```bash
   firebase use --add
   ```
4. Build dan deploy dalam 1 perintah:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
5. Web Anda langsung online di `https://<PROJECT-ID>.web.app` atau `https://<PROJECT-ID>.firebaseapp.com`.

---

## 3. Deploy ke Vercel

Berkas konfigurasi `vercel.json` sudah terpasang dengan rewrite SPA otomatis.

### Cara A: Sambungkan GitHub
1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Impor repositori GitHub Anda.
3. Vercel akan otomatis mengenali Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Klik **Deploy**.

### Cara B: Menggunakan Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

---

## 4. Deploy ke GitHub Pages

Berkas `public/404.html` telah disediakan agar navigasi SPA tidak menghasilkan 404 saat URL direfresh.

### Langkah Deploy:
1. Jalankan:
   ```bash
   npm run build
   ```
2. Anda dapat menggunakan paket `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```
   Atau buat GitHub Action workflow untuk otomatis mem-publish folder `dist` ke branch `gh-pages`.

---

## Ringkasan Berkas Konfigurasi yang Disediakan
- `netlify.toml`: Pengaturan build & rewrite SPA Netlify.
- `public/_redirects`: Aturan redirect fallback Netlify.
- `firebase.json`: Pengaturan rewrite SPA dan cache header Firebase Hosting.
- `.firebaserc`: Inisialisasi alias project Firebase.
- `vercel.json`: Pengaturan rewrite SPA Vercel.
- `public/404.html`: Fallback router SPA untuk GitHub Pages.
