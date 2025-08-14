function openEditStatusModal(id, nama) {
    document.getElementById('editStatusId').value = id;
    document.getElementById('editStatusNama').value = nama;
    document.getElementById('modalEditStatus').classList.remove('hidden');

}
function closeEditStatusModal () {
    document.getElementById('modalEditStatus').classList.add('hidden');
}

async function updateStatus() {
    const id = document.getElementById('editStatusId').value;
    const newNama = document.getElementById('editStatusNama').value;
    if (!newNama) return alert("Nama tidak boleh kosong");

    const mutation = `
        mutation {
            updateStatus(
            id: ${id},
            input: { nama: "${newNama}" }
            ) {
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

    closeEditStatusModal();
    loadData();
}
