function openAddModeModal () {
    document.getElementById('modalAddMode').classList.remove('hidden');
}

function closeAddModeModal () {
    document.getElementById('modalAddMode').classList.add('hidden');
    document.getElementById('addModeNama').value = '';

}

async function createModeJamKerja() {
    const nama = document.getElementById('addModeNama').value.trim();
    if (!nama) {
        alert('Nama Mode harus diisi');
        return;
    }

    const mutation = `
        mutation {
            createModeJamKerja(input: {nama: "${nama}" }) {
                id
                nama
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: mutation })
    });
    closeAddModeModal();
    loadModeData();
}
