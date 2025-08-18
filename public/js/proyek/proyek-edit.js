function openEditProyekModal(id, kode, nama, tanggal, nama_sekolah) {
    document.getElementById('editProyekId').value = id;
    document.getElementById('editProyekKode').value = kode;
    document.getElementById('editProyekNama').value = nama;
    document.getElementById('editProyekTanggal').value = tanggal;
    document.getElementById('editProyekNamaSekolah').value = nama_sekolah;
    document.getElementById('modalEditProyek').classList.remove('hidden');
}

function closeEditProyekModal () {
    document.getElementById('modalEditProyek').classList.add('hidden');
}

async function updateProyek () {
    const id = document.getElementById('editProyekId').value;
    const kode = document.getElementById('editProyekKode').value.trim();
    const nama = document.getElementById('editProyekNama').value.trim();
    const tanggal = document.getElementById('editProyekTanggal').value.trim();
    const nama_sekolah = document.getElementById('editProyekNamaSekolah').value.trim();
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
        alert('Nama_sekolah harus diisi');
        return;
    }

    const mutation = `
        mutation {
            updateProyek(id: ${id}, input: { kode: "${kode}",  nama: "${nama}", tanggal: "${tanggal}", nama_sekolah: "${nama_sekolah}" }) {
                id
                kode
                nama
                tanggal
                nama_sekolah
            }
        }
    `;

    await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });
    closeEditProyekModal();
    loadProyekData();
}
