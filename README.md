 [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
 [![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen.svg)]()
 [![Made With JavaScript](https://img.shields.io/badge/Made%20With-JavaScript-yellow.svg)]()

# Sports Station - Perbaikan Ctrl+Click

Perbaikan browser ini memungkinkan **Ctrl+Click** dan **klik tengah** untuk membuka kartu produk di tab baru pada [sportsstation.id](https://www.sportsstation.id).

## Masalah

Sports Station menggunakan Vue.js SPA yang mencegat semua event klik dan melakukan navigasi dengan `window.location.href`, sehingga perilaku bawaan browser untuk Ctrl+Click tidak berfungsi. Akibatnya, produk tidak bisa dibuka di tab baru dengan cara normal.

## Penting: Di Mana Ini Berfungsi

Perbaikan ini hanya berfungsi di **halaman daftar produk**, bukan di homepage.

Berfungsi:
- `https://www.sportsstation.id/skechers.html`
- `https://www.sportsstation.id/search/skechers.html?q=skechers`
- Halaman apa pun dengan pencarian atau filter brand yang aktif

Tidak berfungsi:
- `https://www.sportsstation.id/` (homepage)
- Halaman tanpa kartu produk yang sudah dimuat

**Jika Anda berada di homepage**, gunakan kolom pencarian atau klik brand/kategori terlebih dahulu, lalu jalankan script ini.

## Solusi 1: Script Console (Cepat)

1. Buka halaman daftar produk (contoh: [sportsstation.id/skechers.html](https://www.sportsstation.id/skechers.html))
2. Pastikan produk terlihat di halaman
3. Buka DevTools (`F12`) lalu masuk ke tab Console
4. Salin isi file [`enable.txt`](./enable.txt) lalu tempel ke console
5. Tekan Enter
6. Jika muncul `parent patched!`, berarti selesai

Sekarang Anda bisa **Ctrl+Click** pada kartu produk untuk membukanya di tab baru.

> Anda perlu mengulang langkah ini setiap kali halaman di-refresh.

## Solusi 2: Extension Chrome (Permanen)

Untuk perbaikan permanen yang berjalan otomatis setiap kali halaman dibuka:

1. Download atau clone repository ini
2. Buka Chrome lalu masuk ke `chrome://extensions`
3. Aktifkan **Developer mode** di kanan atas
4. Klik **Load unpacked**
5. Pilih folder `sportsstation-fix`
6. Selesai, perbaikan akan berjalan otomatis setiap kali halaman dibuka

> Extension ini menggunakan `"world": "MAIN"` agar berjalan di konteks JavaScript milik halaman,
> yang diperlukan untuk mengakses internal komponen Vue.

## Cara Kerja

Perbaikan ini melakukan patch pada method `handleGoDetails` di komponen induk Vue (`SearchResultListComponent`). Saat Ctrl+Click atau klik tengah terdeteksi, alih-alih menjalankan `window.location.href = p.pdpUrl` di tab yang sama, script akan memanggil `window.open(p.pdpUrl, '_blank')` agar produk terbuka di tab baru.

## Kenapa Tampermonkey Tidak Berfungsi

Tampermonkey berjalan di sandbox terisolasi yang tidak bisa mengakses instance komponen Vue pada halaman (`__vue__`), bahkan dengan `@grant unsafeWindow`. Pendekatan extension Chrome berhasil karena secara eksplisit menggunakan `"world": "MAIN"` di manifest.

## File

- `enable.txt` — Script console untuk penggunaan cepat satu kali
- `manifest.json` — Manifest extension Chrome
- `content.js` — Content script extension Chrome

---

# Sports Station - Ctrl+Click Fix

A browser fix that enables **Ctrl+Click** and **middle-click** to open product cards in a new tab on [sportsstation.id](https://www.sportsstation.id).

## The Problem

Sports Station uses a Vue.js SPA that intercepts all click events and navigates using `window.location.href`, bypassing the browser's native Ctrl+Click behavior. This makes it impossible to open products in a new tab the normal way.

## ⚠️ Important: Where This Works

The fix only works on **product listing pages**, not the homepage.

✅ Works:
- `https://www.sportsstation.id/skechers.html`
- `https://www.sportsstation.id/search/skechers.html?q=skechers`
- Any page with a search or brand filter applied

❌ Does NOT work:
- `https://www.sportsstation.id/` (homepage)
- Any page without product cards loaded

**If you're on the homepage**, use the search bar or click a brand/category first, then apply the script.

## Solution 1: Console Script (Quick)

1. Go to a product listing page (e.g. [sportsstation.id/skechers.html](https://www.sportsstation.id/skechers.html))
2. Make sure products are visible on the page
3. Open DevTools (`F12`) → Console tab
4. Copy the contents of [`enable.txt`](./enable.txt) and paste it into the console
5. Press Enter
6. You should see `parent patched!` — you're done!

Now **Ctrl+Click** any product card to open it in a new tab.

> ⚠️ You need to repeat this every time you refresh the page.

## Solution 2: Chrome Extension (Permanent)

For a permanent fix that runs automatically on every visit:

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the `sportsstation-fix` folder
6. Done — the fix runs automatically on every visit!

> The extension uses `"world": "MAIN"` to run in the page's own JS context,
> which is required to access Vue component internals.

## How It Works

The fix patches the `handleGoDetails` method on the Vue parent component (`SearchResultListComponent`). When a Ctrl+Click or middle-click is detected, instead of letting the method run `window.location.href = p.pdpUrl` (same tab), it calls `window.open(p.pdpUrl, '_blank')` (new tab).

## Why Tampermonkey Doesn't Work

Tampermonkey runs in an isolated sandbox that cannot access the page's Vue component instances (`__vue__`), even with `@grant unsafeWindow`. The Chrome extension approach works because it explicitly sets `"world": "MAIN"` in the manifest.

## Files

- `enable.txt` — Console script for quick one-time use
- `manifest.json` — Chrome extension manifest
- `content.js` — Chrome extension content script
