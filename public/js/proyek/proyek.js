async function loadProyekData() {
    const QueryAktif = `
        query {
            allProyeks {
                id
                kode
                nama
                tanggal
                nama_sekolah
            }
        }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: QueryAktif })
    });

    const dataAktif = await resAktif.json();
    renderProyekTable(dataAktif?.data?.allProyeks || [], 'dataProyek', true);

    const queryArsip = `
        query {
            allProyekArsip{
                id
                kode
                nama
                tanggal
                nama_sekolah
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
    renderProyekTable(dataArsip?.data?.allProyekArsip || [], 'dataProyekArsip', false);
}


function renderProyekTable(Proyek, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!Proyek.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    Proyek.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditProyekModal(${item.id}, '${item.kode}', '${item.nama}', '${item.tanggal}', '${item.nama_sekolah}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveProyek(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreProyek(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteProyek(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.kode}</td>
        <td class="border p-2">${item.nama}</td>
        <td class="border p-2">${item.tanggal}</td>
        <td class="border p-2">${item.nama_sekolah}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveProyek(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteProyek(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadProyekData();
}

async function restoreProyek(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreProyek(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadProyekData();
}

async function forceDeleteProyek(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteProyek(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadProyekData();
}

async function searchProyek () {
    const keyword = document.getElementById('searchProyek').value.trim();
    if (!keyword) {
        loadProyekData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                Proyek(id: ${keyword}) {
                    id
                    kode
                    nama
                    tanggal
                    nama_sekolah
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderProyekTable(data.data.Proyek ? [data.data.Proyek] : [], 'dataProyek', true);
    } else {
        query = `
            query {
                ProyekByNama(nama: "%${keyword}%") {
                    id
                    kode
                    nama
                    tanggal
                    nama_sekolah

                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        });
        const data = await res.json();
        renderProyekTable(data.data.ProyekByNama, 'dataProyek', true);
    }
}
document.addEventListener('DOMContentLoaded', loadProyekData);







