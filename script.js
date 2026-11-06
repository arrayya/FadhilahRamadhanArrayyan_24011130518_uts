const daftarVila = [
  {
    id: "villa-tulip",
    nama: "Villa Tulip",
    foto: "assets/tulip.jpg",
    tipe: "5 Kamar Tidur + Extra Bed",
    lokasi: "Puncak, Bogor",
    harga: 2500000,
    fasilitas: ["Kolam Renang", "WiFi", "Dapur lengkap", "Parkir luas"],
    tersedia: true
  },
  {
    id: "villa-mawar",
    nama: "Villa Mawar",
    foto: "assets/mawar.jpg",
    tipe: "4 Kamar Tidur",
    lokasi: "Cipanas, Puncak",
    harga: 1800000,
    fasilitas: ["Billiard", "WiFi", "Balkon dengan view citylight di malam hari", "Water heater"],
    tersedia: false
  },
  {
    id: "villa-london",
    nama: "Villa London",
    foto: "assets/london.jpg",
    tipe: "3 Kamar Tidur",
    lokasi: "Megamendung, Puncak",
    harga: 1500000,
    fasilitas: ["Kolam renang sharing", "Water heater", "Dapur lengkap", "WiFi", "Parkir yang muat untuk bus ukuran 1/4"],
    tersedia: true
  }
];

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function cariVilaById(id) {
  return daftarVila.find(function (vila) {
    return vila.id === id;
  });
}

function renderDaftarVila(data) {
  const container = document.getElementById("villaList");
  container.innerHTML = "";

  if (data.length === 0) {
    const pesan = document.createElement("p");
    pesan.className = "pesan-kosong";
    pesan.textContent = "Villa tidak ditemukan, coba kata kunci lain.";
    container.appendChild(pesan);
    return;
  }

  data.forEach(function (vila) {
    const kartu = document.createElement("article");
    kartu.className = "villa-card";

    const foto = document.createElement("img");
    foto.className = "villa-card__foto";
    foto.src = vila.foto;
    foto.alt = "Foto " + vila.nama;
    foto.loading = "lazy";
    kartu.appendChild(foto);

    const judul = document.createElement("h3");
    judul.textContent = vila.nama;
    kartu.appendChild(judul);

    const tipe = document.createElement("p");
    tipe.className = "villa-card__tipe";
    tipe.textContent = vila.tipe;
    kartu.appendChild(tipe);

    const lokasi = document.createElement("p");
    lokasi.className = "villa-card__lokasi";
    lokasi.textContent = "Lokasi: " + vila.lokasi;
    kartu.appendChild(lokasi);

    const harga = document.createElement("p");
    harga.className = "villa-card__price";
    harga.textContent = formatRupiah(vila.harga) + " / malam";
    kartu.appendChild(harga);

    const fasilitasJudul = document.createElement("p");
    fasilitasJudul.className = "villa-card__fasilitas-judul";
    fasilitasJudul.textContent = "Fasilitas:";
    kartu.appendChild(fasilitasJudul);

    const daftarFasilitas = document.createElement("ul");
    daftarFasilitas.className = "villa-card__fasilitas";
    vila.fasilitas.forEach(function (fasilitas) {
      const item = document.createElement("li");
      item.textContent = fasilitas;
      daftarFasilitas.appendChild(item);
    });
    kartu.appendChild(daftarFasilitas);

    const status = document.createElement("span");
    status.className = vila.tersedia ? "status status--tersedia" : "status status--penuh";
    status.textContent = vila.tersedia ? "Tersedia" : "Penuh";
    kartu.appendChild(status);

    container.appendChild(kartu);
  });
}

function isiDropdownVila() {
  const select = document.getElementById("pilihVila");
  select.innerHTML = "";

  daftarVila.forEach(function (vila) {
    const opsi = document.createElement("option");
    opsi.value = vila.id;
    opsi.textContent = vila.nama + " — " + formatRupiah(vila.harga) + "/malam";
    select.appendChild(opsi);
  });
}

function hitungJumlahMalam(tanggalCheckin, tanggalCheckout) {
  const satuHariMs = 24 * 60 * 60 * 1000;
  const masuk = new Date(tanggalCheckin);
  const keluar = new Date(tanggalCheckout);
  const selisihMs = keluar - masuk;
  return Math.round(selisihMs / satuHariMs);
}

function hitungTotalHarga(vila, jumlahMalam, jumlahTamu) {
  const batasTamuNormal = 10;
  const biayaTamuTambahanPerMalam = 100000;

  let total = vila.harga * jumlahMalam;

  if (jumlahTamu > batasTamuNormal) {
    const tamuLebih = jumlahTamu - batasTamuNormal;
    total = total + tamuLebih * biayaTamuTambahanPerMalam * jumlahMalam;
  }

  return total;
}

function validasiForm(data) {
  const errors = [];
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  if (!data.nama || data.nama.trim() === "") {
    errors.push("Nama tamu wajib diisi.");
  }

  if (!data.vilaId) {
    errors.push("Silakan pilih villa terlebih dahulu.");
  }

  if (!data.checkin || !data.checkout) {
    errors.push("Tanggal check in dan check out wajib diisi.");
  } else {
    const masuk = new Date(data.checkin);
    const keluar = new Date(data.checkout);

    if (masuk < hariIni) {
      errors.push("Tanggal check in tidak boleh sebelum tanggal sekarang.");
    }

    if (keluar <= masuk) {
      errors.push("Tanggal check out harus setelah tanggal check in.");
    }
  }

  if (!data.jumlahTamu || data.jumlahTamu < 1 || data.jumlahTamu > 10) {
    errors.push("Jumlah tamu harus antara 1 sampai 30 orang.");
  }

  return errors;
}

function ambilDataForm() {
  return {
    nama: document.getElementById("namaTamu").value,
    vilaId: document.getElementById("pilihVila").value,
    checkin: document.getElementById("tanggalCheckin").value,
    checkout: document.getElementById("tanggalCheckout").value,
    jumlahTamu: parseInt(document.getElementById("jumlahTamu").value, 10)
  };
}

function tampilkanPesan(pesan, jenis) {
  const kotak = document.getElementById("hasilPesanan");
  kotak.innerHTML = "";
  kotak.className = "hasil-box hasil-box--" + jenis;

  const teks = document.createElement("p");
  teks.textContent = pesan;
  kotak.appendChild(teks);
}

function tampilkanRingkasanBiaya(vila, jumlahMalam, jumlahTamu, total) {
  const kotak = document.getElementById("hasilPesanan");
  kotak.innerHTML = "";
  kotak.className = "hasil-box hasil-box--sukses";

  const judul = document.createElement("h3");
  judul.textContent = "Ringkasan Biaya";
  kotak.appendChild(judul);

  const rincian = [
    "Vila: " + vila.nama,
    "Lama menginap: " + jumlahMalam + " malam",
    "Jumlah tamu: " + jumlahTamu + " orang",
    "Total biaya: " + formatRupiah(total)
  ];

  rincian.forEach(function (baris) {
    const p = document.createElement("p");
    p.textContent = baris;
    kotak.appendChild(p);
  });
}

function simpanNamaTerakhir(nama) {
  try {
    localStorage.setItem("villaPermai_namaTerakhir", nama);
  } catch (error) {
    console.log("Nama tamu tidak dapat disimpan secara lokal di perangkat ini.");
  }
}

function muatNamaTerakhir() {
  try {
    const namaTersimpan = localStorage.getItem("villaPermai_namaTerakhir");
    if (namaTersimpan) {
      document.getElementById("namaTamu").value = namaTersimpan;
    }
  } catch (error) {
    console.log("Gagal memuat nama tamu yang tersimpan.");
  }
}

function simpanPesanan(pesanan) {
  try {
    const dataSebelumnya = localStorage.getItem("villaPermai_pesanan");
    const daftarPesanan = dataSebelumnya ? JSON.parse(dataSebelumnya) : [];
    daftarPesanan.push(pesanan);
    localStorage.setItem("villaPermai_pesanan", JSON.stringify(daftarPesanan));
  } catch (error) {
    console.log("Pesanan berhasil dibuat tapi gagal disimpan ke perangkat ini.");
  }
}

function muatRiwayatPesanan() {
  const container = document.getElementById("daftarRiwayat");
  container.innerHTML = "";

  let daftarPesanan = [];
  try {
    const dataTersimpan = localStorage.getItem("villaPermai_pesanan");
    daftarPesanan = dataTersimpan ? JSON.parse(dataTersimpan) : [];
  } catch (error) {
    const pesanGagal = document.createElement("p");
    pesanGagal.textContent = "Riwayat pesanan tidak dapat dimuat saat ini.";
    container.appendChild(pesanGagal);
    return;
  }

  if (daftarPesanan.length === 0) {
    const kosong = document.createElement("p");
    kosong.textContent = "Belum ada pesanan yang tersimpan disini.";
    container.appendChild(kosong);
    return;
  }

  daftarPesanan.forEach(function (pesanan) {
    const kartu = document.createElement("article");
    kartu.className = "riwayat-item";
    kartu.textContent =
      pesanan.nama + " memesan " + pesanan.namaVila + " (" +
      pesanan.checkin + " s.d. " + pesanan.checkout + "), " +
      pesanan.jumlahTamu + " tamu — " + formatRupiah(pesanan.total);
    container.appendChild(kartu);
  });
}

function filterVila(kataKunci) {
  const kunci = kataKunci.toLowerCase().trim();

  if (kunci === "") {
    return daftarVila;
  }

  return daftarVila.filter(function (vila) {
    const cocokNama = vila.nama.toLowerCase().includes(kunci);
    const cocokLokasi = vila.lokasi.toLowerCase().includes(kunci);
    const cocokFasilitas = vila.fasilitas.some(function (fasilitas) {
      return fasilitas.toLowerCase().includes(kunci);
    });
    return cocokNama || cocokLokasi || cocokFasilitas;
  });
}

function prosesCekKetersediaan() {
  const data = ambilDataForm();
  const errors = validasiForm(data);

  if (errors.length > 0) {
    tampilkanPesan(errors.join(" "), "gagal");
    return;
  }

  const vila = cariVilaById(data.vilaId);

  if (!vila.tersedia) {
    tampilkanPesan(vila.nama + " sedang penuh. Silakan pilih vila lain atau ubah tanggal.", "gagal");
    return;
  }

  const jumlahMalam = hitungJumlahMalam(data.checkin, data.checkout);
  const total = hitungTotalHarga(vila, jumlahMalam, data.jumlahTamu);
  tampilkanRingkasanBiaya(vila, jumlahMalam, data.jumlahTamu, total);
}

function prosesPesanSekarang(event) {
  event.preventDefault();

  const data = ambilDataForm();
  const errors = validasiForm(data);

  if (errors.length > 0) {
    tampilkanPesan(errors.join(" "), "gagal");
    return;
  }

  const vila = cariVilaById(data.vilaId);

  if (!vila.tersedia) {
    tampilkanPesan(vila.nama + " sedang penuh. Silakan pilih vila lain atau ubah tanggal.", "gagal");
    return;
  }

  const jumlahMalam = hitungJumlahMalam(data.checkin, data.checkout);
  const total = hitungTotalHarga(vila, jumlahMalam, data.jumlahTamu);

  const pesanan = {
    nama: data.nama,
    namaVila: vila.nama,
    checkin: data.checkin,
    checkout: data.checkout,
    jumlahTamu: data.jumlahTamu,
    total: total
  };

  simpanPesanan(pesanan);
  simpanNamaTerakhir(data.nama);
  muatRiwayatPesanan();

  tampilkanPesan(
    "Pesanan atas nama " + data.nama + " untuk " + vila.nama +
    " berhasil dikirim. Total pembayaran " + formatRupiah(total) +
    ". Admin akan menghubungi Anda via WhatsApp untuk konfirmasi.",
    "sukses"
  );

  document.getElementById("formPesan").reset();
  muatNamaTerakhir();
}

function init() {
  try {
    renderDaftarVila(daftarVila);
    isiDropdownVila();
    muatNamaTerakhir();
    muatRiwayatPesanan();

    const inputCheckin = document.getElementById("tanggalCheckin");
    const hariIniISO = new Date().toISOString().split("T")[0];
    inputCheckin.setAttribute("min", hariIniISO);

    document.getElementById("cariVila").addEventListener("input", function (event) {
      const hasilFilter = filterVila(event.target.value);
      renderDaftarVila(hasilFilter);
    });

    document.getElementById("btnCek").addEventListener("click", prosesCekKetersediaan);
    document.getElementById("formPesan").addEventListener("submit", prosesPesanSekarang);
  } catch (error) {
    console.log("Terjadi kesalahan saat memuat halaman Villa Permai: " + error.message);
  }
}

document.addEventListener("DOMContentLoaded", init);
