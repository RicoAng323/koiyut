// =======================
// DAFTAR KELAS
// =======================
const daftarKelas = [
    "X-1","X-2","X-3","X-4","X-5","X-6","X-7","X-8","X-9","X-10",
    "XI-1","XI-2","XI-3","XI-4","XI-5","XI-6","XI-7","XI-8","XI-9","XI-10",
    "XII-1","XII-2","XII-3","XII-4","XII-5","XII-6","XII-7","XII-8","XII-9","XII-10"
];

let selectKelas = document.getElementById("kelas");
daftarKelas.forEach(k => {
    let opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    selectKelas.appendChild(opt);
});

// =======================
// DAFTAR BARANG
// =======================
const daftarBarang = [
    { nama: "Proyektor", stok: 10 },
    { nama: "Kabel Olor", stok: 12 },
    { nama: "Kabel Adaptor Proyektor", stok: 4 },
    { nama: "Sound System", stok: 4 },
    { nama: "Mic", stok: 4 }
];


let selectBarang = document.getElementById("barang");

function loadBarang(){
    selectBarang.innerHTML = "";
    daftarBarang.forEach((b, index) => {
        let opt = document.createElement("option");
        opt.value = index;
        opt.textContent = `${b.nama} (stok: ${b.stok})`;
        selectBarang.appendChild(opt);
    });
}

loadBarang();

// =======================
// SIMPAN DATA
// =======================
document.getElementById("pinjamForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const barangIndex = parseInt(document.getElementById("barang").value);

    // CEK STOK HABIS
    if (daftarBarang[barangIndex].stok <= 0) {
        alert("Stok barang habis!");
        return;
    }

    // KURANGI STOK
    daftarBarang[barangIndex].stok--;
    loadBarang();

    const now = new Date();
    const tanggal = now.toLocaleDateString();
    const jam = now.toLocaleTimeString();

    let data = JSON.parse(localStorage.getItem("peminjaman")) || [];

    data.push({
        nama: nama,
        kelas: kelas,
        barang: daftarBarang[barangIndex].nama,
        barangIndex: barangIndex,
        status: "Dipinjam",
        tanggal: tanggal,
        jam: jam
    });

    localStorage.setItem("peminjaman", JSON.stringify(data));
    this.reset();
    loadData();
});

// =======================
// TAMPILKAN DATA
// =======================
function loadData(){
    let data = JSON.parse(localStorage.getItem("peminjaman")) || [];
    let tbody = document.querySelector("#tablePeminjaman tbody");

    tbody.innerHTML = "";

    data.forEach((item, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.kelas}</td>
            <td>${item.barang}</td>
            <td>${item.status}</td>
            <td>${item.tanggal}</td>
            <td>${item.jam}</td>
            <td>
                <button onclick="kembalikan(${index})" ${item.status === "Dikembalikan" ? "disabled" : ""}>
                    ${item.status === "Dikembalikan" ? "Sudah" : "Kembalikan"}
                </button>
            </td>
            
            </td>
        `;

        tbody.appendChild(row);
    });
}

function kembalikan(i){
    let data = JSON.parse(localStorage.getItem("peminjaman")) || [];

    let item = data[i];
    daftarBarang[item.barangIndex].stok++;
    loadBarang();

    data.splice(i, 1);
    localStorage.setItem("peminjaman", JSON.stringify(data));

    loadData();
}


