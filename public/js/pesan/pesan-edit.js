async function loadJenisPesanOptionsForEdit() {
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
    const select = document.getElementById("editPesanJenisId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allJenisPesan.forEach((JenisPesan) => {
        const option = new Option(JenisPesan.nama, JenisPesan.id);
        select.add(option);
    });
}



async function openEditPesanModal(id, pengirim, penerima, isi, parentId, TglPesan, jenisId) {

    await loadJenisPesanOptionsForEdit();

    document.getElementById('editPesanId').value = id;
    document.getElementById('editPesanPengirim').value = pengirim;
    document.getElementById('editPesanPenerima').value = penerima;
    document.getElementById('editPesanIsi').value = isi;
    document.getElementById('editPesanParentId').value = parentId;
    document.getElementById('editPesanJenisId').value = jenisId;

    let formattedForInput = TglPesan.replace(" ", "T").slice(0, 16);
    document.getElementById('editPesanTglPesan').value = formattedForInput;


    document.getElementById('modalEditPesan').classList.remove('hidden');


}
function closeEditPesanModal () {
    document.getElementById('modalEditPesan').classList.add('hidden');
}

async function updatePesan () {
    const id = document.getElementById('editPesanId').value;
    const pengirim = document.getElementById('editPesanPengirim').value.trim();
    const penerima = document.getElementById('editPesanPenerima').value.trim();
    const isi = document.getElementById('editPesanIsi').value.trim();
    const parentId = document.getElementById('editPesanParentId').value.trim();

    let rawDate = document.getElementById('editPesanTglPesan').value;

    // ubah ke format DB ("2025-08-21 09:35:00")
    let formattedDate = rawDate.replace("T", " ") + ":00";

    const jenisId = document.getElementById('editPesanJenisId').value.trim();

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
            updatePesan(id: ${id}, input: {
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

    const response = await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });


    closeEditPesanModal();
    loadPesanData();
}

