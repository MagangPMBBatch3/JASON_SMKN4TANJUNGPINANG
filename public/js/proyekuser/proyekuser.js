async function loadProyekUserData() {
    const QueryAktif = `
        query {
            allProyekUser {
                id
                proyek {
                nama
                }
                user_profile {
                nama_lengkap
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
    renderProyekUserTable(dataAktif?.data?.allProyekUser || [], 'dataProyekUser', true);

    const queryArsip = `
        query{
            allProyekUserArsip{
                id
                proyek {
                nama
                }
                user_profile {
                nama_lengkap
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
    renderProyekUserTable(dataArsip?.data?.allProyekUserArsip || [], 'dataProyekUserArsip', false);
}


function renderProyekUserTable(ProyekUser, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!ProyekUser.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    ProyekUser.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditProyekUserModal(${item.id}, '${item.proyek?.nama || '-'}', '${item.user_profile?.nama_lengkap || '-'}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveProyekUser(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreProyekUser(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteProyekUser(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.proyek?.nama || '-'}</td>
        <td class="border p-2">${item.user_profile?.nama_lengkap || '-'}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveProyekUser(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteProyekUser(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadProyekUserData();
}

async function restoreProyekUser(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreProyekUser(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadProyekUserData();
}

async function forceDeleteProyekUser(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteProyekUser(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadProyekUserData();
}

async function searchProyekUser () {
    const keyword = document.getElementById('searchProyekUser').value.trim();
    if (!keyword) {
        loadProyekUserData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                ProyekUser(id: ${keyword}) {
                   id
                proyek {
                nama
                }
                user_profile {
                nama_lengkap
                }
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
        renderProyekUserTable(data.data.ProyekUser ? [data.data.ProyekUser] : [], 'dataProyekUser', true);
    } else {
        query = `
            query {
                ProyekUserByNama(nama: "%${keyword}%") {
                id
                proyek {
                nama
                }
                user_profile {
                nama_lengkap
                }
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
        renderProyekUserTable(data.data.ProyekUserByNama, 'dataProyekUser', true);
    }
}
document.addEventListener('DOMContentLoaded', loadProyekUserData);







