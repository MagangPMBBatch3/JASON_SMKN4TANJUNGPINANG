function openAddProyekModal () {
    document.getElementById('modalAddProyek').classList.remove('hidden');
}

function closeAddProyekModal () {
    document.getElementById('modalAddProyek').classList.add('hidden');
    document.getElementById('addProyekKode').value = '';
    document.getElementById('addProyekNama').value = '';
    document.getElementById('addProyekTanggal').value = '';
    document.getElementById('addProyekNamaSekolah').value = '';
}

async function createProyek() {
    const kode = document.getElementById('addProyekKode').value.trim();
    const nama = document.getElementById('addProyekNama').value.trim();
    const tanggal = document.getElementById('addProyekTanggal').value.trim();
    const nama_sekolah = document.getElementById('addProyekNamaSekolah').value.trim();
    if (!kode) {
        alert('Kode Proyek harus diisi');
        return;
    }
     if (!nama) {
        alert('Nama Proyek harus diisi');
        return;
    }
     if (!tanggal) {
        alert('Tanggal Proyek harus diisi');
        return;
    }
     if (!nama_sekolah) {
        alert('Nama Sekolah harus diisi');
        return;
    }

     const mutation = `
        mutation {
            createProyek(input: { kode: "${kode}",  nama: "${nama}", tanggal: "${tanggal}", nama_sekolah: "${nama_sekolah}" }) {
                id
                kode
                nama
                tanggal
                nama_sekolah
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: mutation })
    });
    closeAddProyekModal();
    loadProyekData();
}
