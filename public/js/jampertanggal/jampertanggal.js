async function loadJamPerTanggalData() {
    const QueryAktif = `
        query {
            allJamPerTanggal {
                id
                proyek {
                nama
                }
                users_profile {
                nama_lengkap
                }
                tanggal
                jam
            }
        }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: QueryAktif })
    });

    const dataAktif = await resAktif.json();
    renderJamPerTanggalTable(dataAktif?.data?.allJamPerTanggal || [], 'dataJamPerTanggal', true);

    const queryArsip = `
        query{
            allJamPerTanggalArsip{
                id
                proyek {
                nama
                }
                users_profile {
                nama_lengkap
                }
                tanggal
                jam
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
    renderJamPerTanggalTable(dataArsip?.data?.allJamPerTanggalArsip || [], 'dataJamPerTanggalArsip', false);
}


function renderJamPerTanggalTable(JamPerTanggal, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!JamPerTanggal.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    JamPerTanggal.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditJamPerTanggalModal(${item.id}, '${item.users_profile?.nama_lengkap || '-'}', '${item.proyek?.nama || '-'}', '${item.tanggal}', '${item.jam}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveJamPerTanggal(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreJamPerTanggal(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteJamPerTanggal(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.users_profile?.nama_lengkap || '-'}</td>
        <td class="border p-2">${item.proyek?.nama || '-'}</td>
        <td class="border p-2">${item.tanggal}</td>
        <td class="border p-2">${item.jam}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveJamPerTanggal(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteJamPerTanggal(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamPerTanggalData();
}

async function restoreJamPerTanggal(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreJamPerTanggal(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamPerTanggalData();
}

async function forceDeleteJamPerTanggal(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteJamPerTanggal(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamPerTanggalData();
}

async function searchJamPerTanggal () {
    const keyword = document.getElementById('searchJamPerTanggal').value.trim();
    if (!keyword) {
        loadJamPerTanggalData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                JamPerTanggal(id: ${keyword}) {
                   id

                users_profile {
                nama_lengkap
                }
                 proyek {
                nama
                }
                tanggal
                jam
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
        renderJamPerTanggalTable(data.data.JamPerTanggal ? [data.data.JamPerTanggal] : [], 'dataJamPerTanggal', true);
    } else {
        query = `
            query {
                JamPerTanggalByNama(nama: "%${keyword}%") {
                id

                users_profile {
                nama_lengkap
                }
                proyek {
                nama
                }
                tanggal
                jam
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
        renderJamPerTanggalTable(data.data.JamPerTanggalByNama, 'dataJamPerTanggal', true);
    }
}
document.addEventListener('DOMContentLoaded', loadJamPerTanggalData);







