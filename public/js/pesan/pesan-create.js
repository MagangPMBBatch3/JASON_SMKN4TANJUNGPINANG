    async function loadJenisPesanOptions() {
        const query = `
            query {
                allJenisPesan {
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
        const select = document.getElementById("addPesanJenisId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allJenisPesan.forEach((jenis_pesan) => {
            const option = new Option(jenis_pesan.nama, jenis_pesan.id);
            select.add(option);
        });
    }




    function openAddPesanModal () {
        document.getElementById('modalAddPesan').classList.remove('hidden');
        loadJenisPesanOptions();
    }

    function closeAddPesanModal () {
        document.getElementById('modalAddPesan').classList.add('hidden');
        document.getElementById('addPesanPengirim').value='';
        document.getElementById('addPesanPenerima').value='';
        document.getElementById('addPesanIsi').value='';
        document.getElementById('addPesanParentId').value='';
        document.getElementById('addPesanTglPesan').value='';
        document.getElementById('addPesanJenisId').value='';
    }

    async function createPesan() {
    const pengirim = document.getElementById('addPesanPengirim').value.trim();
    const penerima = document.getElementById('addPesanPenerima').value.trim();
    const isi = document.getElementById('addPesanIsi').value.trim();
    const parentId = document.getElementById('addPesanParentId').value.trim();
    const rawDate = document.getElementById('addPesanTglPesan').value.trim();
        

    // ubah ke format DB ("2025-08-21 09:35:00")
    let formattedDate = rawDate.replace("T", " ") + ":00";

    const jenisId = document.getElementById('addPesanJenisId').value.trim();

    if (!pengirim) {
        alert('Pengirim Pesan harus diisi');
        return;
    }
     if (!penerima) {
        alert('Penerima Pesan harus diisi');
        return;
    }
     if (!isi) {
        alert('Isi Pesan harus diisi');
        return;
    }
     if (!parentId) {
        alert('Parent Id harus diisi');
        return;
    }
     if (!rawDate) {
        alert('Tanggal Pesan harus diisi');
        return;
    }
     if (!jenisId) {
        alert('Jenis Id Pesan harus diisi');
        return;
    }

    const mutation = `
        mutation {
            createPesan(input: {
            pengirim: "${pengirim}"
            penerima: "${penerima}"
            isi: "${isi}"
            parent_id: ${parseInt(parentId)}
            tgl_pesan: "${formattedDate}"
            jenis_id: ${parseInt(jenisId)}
            }) {
                id
                pengirim
                penerima
                isi
                parent_id
                tgl_pesan
                jenis_pesan {
                nama
                }
            }
        }
    `;

        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeAddPesanModal();
        loadPesanData();
    }
