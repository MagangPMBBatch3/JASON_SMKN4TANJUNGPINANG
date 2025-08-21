    async function loadBagianOptions() {
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
        const select = document.getElementById("addAktivitasBagianId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allBagian.forEach((bagian) => {
            const option = new Option(bagian.nama, bagian.id);
            select.add(option);
        });
    }




    function openAddAktivitasModal () {
        document.getElementById('modalAddAktivitas').classList.remove('hidden');
        loadBagianOptions();
    }

    function closeAddAktivitasModal () {
        document.getElementById('modalAddAktivitas').classList.add('hidden');
        document.getElementById('addAktivitasBagianId').value = '';
        document.getElementById('addAktivitasNoWbs').value = '';
        document.getElementById('addAktivitasNama').value = '';


    }

    async function createAktivitas() {
        const bagianId = document.getElementById('addAktivitasBagianId').value.trim();
        const NoWbs = document.getElementById('addAktivitasNoWbs').value.trim();
        const nama = document.getElementById('addAktivitasNama').value.trim();

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
            createAktivitas (input: {
            bagian_id: "${parseInt(bagianId)}"
            no_wbs: "${NoWbs}"
            nama: "${nama}"
            }) {
                id
                bagian {
                nama
                }
                no_wbs
                nama
            }
        }
    `;


        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeAddAktivitasModal();
        loadAktivitasData();
    }
