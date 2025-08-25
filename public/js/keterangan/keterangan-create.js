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
        const select = document.getElementById("addKeteranganBagianId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allBagian.forEach((bagian) => {
            const option = new Option(bagian.nama, bagian.id);
            select.add(option);
        });
    }

    async function loadProyekOptions() {
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
    const select = document.getElementById("addKeteranganProyekId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allProyeks.forEach((Proyek) => {
        const option = new Option(Proyek.nama, Proyek.id);
        select.add(option);
    });
}





    function openAddKeteranganModal () {
        document.getElementById('modalAddKeterangan').classList.remove('hidden');
        loadBagianOptions();
        loadProyekOptions();
    }

    function closeAddKeteranganModal () {
        document.getElementById('modalAddKeterangan').classList.add('hidden');
        document.getElementById('addKeteranganBagianId').value = '';
        document.getElementById('addKeteranganProyekId').value = '';
        document.getElementById('addKeteranganTanggal').value = '';


    }

    async function createKeterangan() {
        const bagianId = document.getElementById('addKeteranganBagianId').value.trim();
        const proyekId = document.getElementById('addKeteranganProyekId').value.trim();
        const rawDate = document.getElementById('addKeteranganTanggal').value.trim();

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
            createKeterangan (input: {
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
        closeAddKeteranganModal();
        loadKeteranganData();
    }
