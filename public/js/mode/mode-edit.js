function openEditModeModal(id, nama) {
    document.getElementById('editModeId').value = id;
    document.getElementById('editModeNama').value = nama;
    document.getElementById('modalEditMode').classList.remove('hidden');
}

function closeEditModeModal () {
    document.getElementById('modalEditMode').classList.add('hidden');
}

async function updateModeJamKerja () {
    const id = document.getElementById('editModeId').value;
    const nama = document.getElementById('editModeNama').value.trim();
    if (!nama) {
        alert('Mode Jam Kerja harus diisi');
        return;
    }
    const mutation = `
        mutation {
            updateModeJamKerja(id: ${id}, input: { nama: "${nama}"}) {
                id
                nama
            }
        }
    `;

    await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });
    closeEditModeModal();
    loadModeData();
}
