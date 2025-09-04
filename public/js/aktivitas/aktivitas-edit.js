async function loadBagianOptionsForEdit() {
    const query = `
        query {
            allBagian {
                id
                nama
            }
        }
    `;

    const response = await fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const select = document.getElementById("editAktivitasBagianId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allBagian.forEach((bagian) => {
        const option = new Option(bagian.nama, bagian.id);
        select.add(option);
    });
}



async function openEditAktivitasModal(id, bagian_id, no_wbs, nama) {
    await loadBagianOptionsForEdit();
    document.getElementById('editAktivitasId').value = id;
    document.getElementById('editAktivitasBagianId').value = bagian_id;
    document.getElementById('editAktivitasNoWbs').value = no_wbs;
    document.getElementById('editAktivitasNama').value = nama;
    document.getElementById('modalEditAktivitas').classList.remove('hidden');
}
function closeEditAktivitasModal () {
    document.getElementById('modalEditAktivitas').classList.add('hidden');
}

async function updateAktivitas () {
    const id = document.getElementById('editAktivitasId').value;
    const bagianId = document.getElementById('editAktivitasBagianId').value.trim();
    const NoWbs = document.getElementById('editAktivitasNoWbs').value.trim();
    const nama = document.getElementById('editAktivitasNama').value.trim();

    if (!bagianId) {
        alert('Bagian ID harus diisi');
        return;
    }
     if (!NoWbs) {
        alert('Penerima Aktivitas harus diisi');
        return;
    }
     if (!nama) {
        alert('Isi Aktivitas harus diisi');
        return;
    }

    const mutation = `
        mutation {
            updateAktivitas(id: ${id}, input: {
            bagian_id: ${bagianId}
            no_wbs: "${NoWbs}"
            nama: "${nama}"
            }) {
                id
                no_wbs
                nama
                bagian {
                nama
                }
            }
        }
    `;

    const response = await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });


    closeEditAktivitasModal();
    loadAktivitasData();
}

