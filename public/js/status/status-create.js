function openAddStatusModal() {
    document.getElementById('modalAddStatus').classList.remove('hidden');
}

function closeAddStatusModal() {
    document.getElementById('modalAddStatus').classList.add('hidden');
    document.getElementById('addNamaStatus').value = '';
}

async function createStatus () {
    const nama = document.getElementById('addNamaStatus').value;
    if (!nama) return alert("Nama Tidak Boleh Kosong");

    const mutation = `
        mutation {
            createStatus(input: { nama: "${nama}" }) {
                id
                nama
            }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    });

    closeAddStatusModal();
    loadData();
}
