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
            select.edit(option);
        });
    }

    async function loadProyekOptionsFOrEdit() {
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
        select.edit(option);
    });
}





    function openeditKeteranganModal () {

        loadBagianOptionsForEdit();
        loadProyekOptionsForEdit();
        document.getElementById('editKeteranganBagianId').value = 'bagian_id';
        document.getElementById('editKeteranganProyekId').value = 'proyek_id';
        document.getElementById('editKeteranganTanggal').value = 'tanggal';
        document.getElementById('modalEditKeterangan').classList.remove('hidden');
    }

    function closeeditKeteranganModal () {
        document.getElementById('modalEditKeterangan').classList.edit('hidden');

    }

    async function updateKeterangan() {
        const bagianId = document.getElementById('editKeteranganBagianId').value.trim();
        const proyekId = document.getElementById('editKeteranganProyekId').value.trim();
        let rawDate = document.getElementById('editKeteranganTanggal').value;

        let formattedDate = rawDate.replace("T", " ") + ":00";

        if (!bagianId) {
        alert('Bagian ID harus diisi');
        return;
        }
        if (!proyekId) {
        alert('Penerima Keterangan harus diisi');
        return;
        }
        if (!rawDate) {
        alert('Isi Keterangan harus diisi');
        return;
        }

       const mutation = `
        mutation {
            updateKeterangan (input: {
            bagian_id: ${parseInt(bagianId)}
            proyek_id: ${parseInt(proyekId)}
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


        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeeditKeteranganModal();
        loadKeteranganData();
    }
