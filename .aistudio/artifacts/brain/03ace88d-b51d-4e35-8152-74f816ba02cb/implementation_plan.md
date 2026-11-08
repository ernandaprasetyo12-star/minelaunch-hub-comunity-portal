# Rencana Implementasi: Konfigurasi Deployment Siap Pakai (Netlify, Firebase Hosting, Vercel, GitHub Pages)

Pengguna memilih untuk mendukung **semua penyedia hosting** dengan arsitektur **SPA Static Build murni (`dist`)**. Kami akan mengonfigurasi dan memperbaiki proyek agar dapat langsung di-deploy tanpa hambatan atau error 404 pada rute SPA.

---

### 1. Konfigurasi Netlify
- **Berkas `netlify.toml`**:
  - `build.command = "npm run build"`
  - `build.publish = "dist"`
  - Redirect rewrite `/*` ke `/index.html` dengan status `200` (agar routing SPA tidak 404 saat refresh halaman).
- **Berkas `public/_redirects`**:
  - Salinan aturan rewrite `/*    /index.html   200` yang otomatis ikut tersalin ke `dist/`.

---

### 2. Konfigurasi Firebase Hosting
- **Berkas `firebase.json`**:
  - Menentukan folder `hosting.public = "dist"`.
  - Rewrite all requests `**` ke `/index.html`.
  - Mengabaikan `firebase.json`, `.*`, dan `**/node_modules/**`.
- **Berkas `.firebaserc`**:
  - Template konfigurasi project Firebase default.

---

### 3. Konfigurasi Vercel
- **Berkas `vercel.json`**:
  - Menentukan `buildCommand: "npm run build"`, `outputDirectory: "dist"`.
  - Rewrites rule: source `/(.*)` mengarah ke `/index.html`.

---

### 4. Konfigurasi GitHub Pages
- **Berkas `public/404.html`**:
  - Script SPA redirect fallback agar ketika pengguna membuka URL sub-path di GitHub Pages tidak menampilkan halaman 404 standar GitHub.

---

### 5. Optimasi Build & Vite
- Perbarui `vite.config.ts` untuk menggunakan `import.meta.dirname` agar menghilangkan warning Vite `configLoader: 'native'`.
- Tambahkan script deployment pembantu di `package.json` (seperti `build`, `preview`).
- Buat dokumentasi panduan deploy lengkap di `DEPLOYMENT.md` dalam Bahasa Indonesia yang mencakup langkah 1-klik untuk Netlify, Firebase CLI, Vercel CLI, dan GitHub Actions.

---

### Verifikasi
1. Jalankan `npm run build` dan periksa folder `dist`.
2. Verifikasi bahwa `dist/_redirects`, `dist/404.html`, `dist/index.html`, dan seluruh aset gambar (`dist/assets/...`) dihasilkan dengan utuh dan sempurna.
3. Jalankan `lint_applet` dan `compile_applet` untuk menjamin nol error.
