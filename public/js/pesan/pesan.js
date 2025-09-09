async function loadPesanData() {
    const QueryAktif = `
        query {
            allPesan {
                id
                user_pengirim
                {
                id
                nama
                }
                user_penerima
                {
                id
                nama
                }
                isi
                tgl_pesan
                jenis_pesan {
                id
                nama
                 }
            }
        }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: QueryAktif })
    });

    const dataAktif = await resAktif.json();
    renderPesanTable(dataAktif?.data?.allPesan || [], 'dataPesan', true);

    const queryArsip = `
        query{
            allPesanArsip{
                id
                user_pengirim
                {
                id
                nama
                }
                user_penerima
                {
                id
                nama
                }
                isi
                tgl_pesan
                jenis_pesan {
                id
                nama
                }
                deleted_at
            }
        }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });

    const dataArsip = await resArsip.json();
    renderPesanTable(dataArsip?.data?.allPesanArsip || [], 'dataPesanArsip', false);
}


function renderPesanTable(Pesan, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!Pesan.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    Pesan.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditPesanModal(${item.id}, '${item.user_pengirim?.id || '-'}', '${item.user_penerima?.id || '-'}', '${item.isi}', '${item.tgl_pesan}', '${item.jenis_pesan?.id || '-'}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archivePesan(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restorePesan(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeletePesan(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.user_pengirim?.nama || '-'}</td>
        <td class="border p-2">${item.user_penerima?.nama || '-'}</td>
        <td class="border p-2">${item.isi}</td>
        <td class="border p-2">${item.tgl_pesan}</td>
        <td class="border p-2">${item.jenis_pesan?.nama || '-'}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archivePesan(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deletePesan(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadPesanData();
}

async function restorePesan(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restorePesan(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadPesanData();
}

async function forceDeletePesan(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeletePesan(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadPesanData();
}

async function searchPesan () {
    const keyword = document.getElementById('searchPesan').value.trim();
    if (!keyword) {
        loadPesanData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                Pesan(id: ${keyword}) {
                    id
                     user_pengirim
                     {
                     id
                     nama
                     }
                user_penerima
                {
                id
                nama
                }
                isi
                tgl_pesan
                jenis_pesan {
                nama
                }
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderPesanTable(data.data.Pesan ? [data.data.Pesan] : [], 'dataPesan', true);
    } else {
        query = `
            query {
                PesanByPengirim(pengirim: "%${keyword}%") {
                    id
                    user_pengirim
                     {
                    id
                     nama
                     }
                user_penerima
                {
                id
                nama
                }
                isi
                tgl_pesan
                jenis_pesan {
                nama
                }
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        });
        const data = await res.json();
        renderPesanTable(data.data.PesanByNama, 'dataPesan', true);
    }
}
document.addEventListener('DOMContentLoaded', loadPesanData);







