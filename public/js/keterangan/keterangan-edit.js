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
        const select = document.getElementById("editKeteranganBagianId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allBagian.forEach((bagian) => {
            const option = new Option(bagian.nama, bagian.id);
            select.add(option);
        });
    }

    async function loadProyekOptionsForEdit() {
    const query = `
        query {
            allProyeks {
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
    const select = document.getElementById("editKeteranganProyekId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allProyeks.forEach((Proyek) => {
        const option = new Option(Proyek.nama, Proyek.id);
        select.add(option);
    });
}





    async function openEditKeteranganModal (id, bagian_id, proyek_id, tanggal) {
        await loadBagianOptionsForEdit();
        await loadProyekOptionsForEdit();
        document.getElementById('editKeteranganId').value = id;
        document.getElementById('editKeteranganBagianId').value = bagian_id;
        document.getElementById('editKeteranganProyekId').value = proyek_id;
        document.getElementById('editKeteranganTanggal').value = tanggal;
        document.getElementById('modalEditKeterangan').classList.remove('hidden');
    }

    function closeEditKeteranganModal () {
        document.getElementById('modalEditKeterangan').classList.add('hidden');

    }

    async function updateKeterangan() {
        const id = document.getElementById('editKeteranganId').value;
        const bagianId = document.getElementById('editKeteranganBagianId').value.trim();
        const proyekId = document.getElementById('editKeteranganProyekId').value.trim();
        let rawDate = document.getElementById('editKeteranganTanggal').value;

        let formattedDate = rawDate.replace("T", " ");

        if (!bagianId) {
            alert('Bagian ID harus diisi');
            return;
        }
        if (!proyekId) {
            alert('Proyek harus diisi');
            return;
        }
        if (!rawDate) {
            alert('Tanggal harus diisi');
            return;
        }

        const mutation = `
            mutation {
                updateKeterangan (id: ${id}, input: {
                    bagian_id: ${parseInt(bagianId)},
                    proyek_id: ${parseInt(proyekId)},
                    tanggal: "${formattedDate}"
                }) {
                    id
                    bagian {
                        nama
                    }
                    proyek {
                        nama
                    }
                    tanggal
                }
            }
        `;

        try {
            console.log('Mutation:', mutation);
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: mutation })
            });
            const result = await response.json();
            console.log('Result:', result);
            if (result.errors) {
                alert('Gagal memperbarui keterangan: ' + result.errors[0].message);
                return;
            }
            closeEditKeteranganModal();
            loadKeteranganData();
        } catch (error) {
            alert('Terjadi kesalahan saat memperbarui keterangan.');
            console.error(error);
        }
    }
