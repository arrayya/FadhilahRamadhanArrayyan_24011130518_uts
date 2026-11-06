# Villa Permai — Aplikasi Pemesanan Vila Berbasis Web

Halaman web statis untuk Villa Permai, usaha penyewaan tiga unit vila di kawasan Puncak, Kabupaten Bogor. Dibuat agar calon tamu bisa mengecek ketersediaan, melihat perkiraan biaya, dan mengirim pesanan sendiri tanpa harus tanya jawab manual lewat WhatsApp.

## Struktur Proyek

```
uts-vila-permai/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

Tidak ada back-end maupun basis data. Seluruh data tiga vila (nama, tipe kamar, lokasi, harga, fasilitas, status ketersediaan) disimpan sebagai array objek di dalam `script.js` dan dirender ke halaman memakai `createElement` dan `appendChild`.

## Cara Menjalankan

Buka file `index.html` langsung di browser, atau jalankan lewat live server (misalnya ekstensi Live Server di VS Code) agar path relatif ke `style.css` dan `script.js` terbaca dengan baik.

## Fitur Utama

- Daftar tiga vila ditampilkan sebagai kartu, lengkap dengan status tersedia/penuh.
- Pencarian/filter vila berdasarkan nama, lokasi, atau fasilitas.
- Form pemesanan dengan dua tombol: **Cek Ketersediaan** (menampilkan ringkasan biaya tanpa mengirim pesanan) dan **Pesan Sekarang** (mengirim sekaligus menyimpan pesanan).
- Validasi input berbahasa Indonesia: nama wajib diisi, vila wajib dipilih, tanggal check-out harus setelah check-in, tanggal tidak boleh di masa lalu, dan jumlah tamu dibatasi 1–10 orang.
- Nama tamu terakhir dan riwayat pesanan disimpan di `localStorage`, sehingga tetap muncul saat halaman dibuka ulang di perangkat yang sama.
- Tampilan responsif dengan dua breakpoint (768px dan 480px): tata letak kartu dan form berubah dari dua kolom menjadi satu kolom di layar sempit.

## Logika Perhitungan Harga

Total biaya dihitung dengan fungsi `hitungTotalHarga()`:

```
total = harga per malam × jumlah malam
```

Jika jumlah tamu lebih dari 2 orang, setiap tamu tambahan dikenakan biaya ekstra Rp100.000 per malam. Logika ini dipilih karena vila Villa Permai disewakan per unit (bukan per kepala), tetapi tamu yang lebih banyak dari kapasitas normal tetap menambah biaya operasional (air, listrik, perlengkapan tambahan).

## Riwayat Commit

Riwayat commit disusun bertahap mengikuti tahapan pengerjaan berikut:

1. `init: struktur HTML dasar halaman Villa Permai`
2. `style: tambah styling dasar dan tata letak responsif`
3. `feat: render data vila dan form pemesanan dengan JavaScript`
4. `feat: tambah validasi form, localStorage, dan perhitungan total biaya`

## Kontak Pemilik

Villa Permai — Kawasan Puncak, Kabupaten Bogor
Pak Hendra — WhatsApp 0812-9045-2217
