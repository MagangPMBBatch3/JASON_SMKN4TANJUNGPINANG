function openAddStatusJamKerjaModal() {
    document.getElementById('modalAddStatusJamKerja').classList.remove('hidden');
}

function closeAddStatusJamKerjaModal() {
    document.getElementById('modalAddStatusJamKerja').classList.add('hidden');
    document.getElementById('addNamaStatusJamKerja').value = '';
}

async function createStatusJamKerja () {
    const nama = document.getElementById('addNamaStatusJamKerja').value;
    if (!nama) return alert("Nama Tidak Boleh Kosong");

    const mutation = `
        mutation {
            createStatusJamKerja(input: { nama: "${nama}" }) {
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

    closeAddStatusJamKerjaModal();
    loadStatusJamKerjaData();
}
