async function loadKeteranganData() {
    const QueryAktif = `
        query {
            allKeterangan {
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

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: QueryAktif })
    });

    const dataAktif = await resAktif.json();
    renderKeteranganTable(dataAktif?.data?.allKeterangan || [], 'dataKeterangan', true);

    const queryArsip = `
        query{
            allKeteranganArsip{
                id
                bagian {
                nama
                }
                proyek {
                nama
                }
                tanggal
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
    renderKeteranganTable(dataArsip?.data?.allKeteranganArsip || [], 'dataKeteranganArsip', false);
}


function renderKeteranganTable(Keterangan, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!Keterangan.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    Keterangan.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditKeteranganModal(${item.id}, '${item.bagian?.nama || '-'}', '${item.proyek?.nama || '-'}', '${item.tanggal}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveKeterangan(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreKeterangan(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteKeterangan(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.bagian?.nama || '-'}</td>
        <td class="border p-2">${item.proyek?.nama || '-'}</td>
        <td class="border p-2">${item.tanggal}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveKeterangan(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteKeterangan(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadKeteranganData();
}

async function restoreKeterangan(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreKeterangan(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadKeteranganData();
}

async function forceDeleteKeterangan(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteKeterangan(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadKeteranganData();
}

async function searchKeterangan () {
    const keyword = document.getElementById('searchKeterangan').value.trim();
    if (!keyword) {
        loadKeteranganData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                Keterangan(id: ${keyword}) {
                id
                bagian {
                nama
                }
                proyek {
                nama
                }
                tanggal
                deleted_at
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderKeteranganTable(data.data.Keterangan ? [data.data.Keterangan] : [], 'dataKeterangan', true);
    } else {
        query = `
            query {
                KeteranganByNama(nama: "%${keyword}%") {
                id
                bagian {
                nama
                }
                proyek {
                nama
                }
                tanggal
                deleted_at
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        });
        const data = await res.json();
        renderKeteranganTable(data.data.KeteranganByNama, 'dataKeterangan', true);
    }
}
document.addEventListener('DOMContentLoaded', loadKeteranganData);







