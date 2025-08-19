async function loadUserData() {
    const QueryAktif = `
        query {
            allUsers {
                id
                nama
                email
            }
        }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: QueryAktif })
    });

    const dataAktif = await resAktif.json();
    renderUserTable(dataAktif?.data?.allUsers || [], 'dataUser', true);

    const queryArsip = `
        query{
            allUserArsip{
                id
                nama
                email
                deletedAt
            }
        }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });

    const dataArsip = await resArsip.json();
    renderUserTable(dataArsip?.data?.allUserArsip || [], 'dataUserArsip', false);
}


function renderUserTable(User, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!User.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    User.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditUserModal(${item.id}, '${item.nama}', '${item.email}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveUser(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreUser(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteUser(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.nama}</td>
        <td class="border p-2">${item.email}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveUser(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteUser(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadUserData();
}

async function restoreUser(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreUser(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadUserData();
}

async function forceDeleteUser(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteUser(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadUserData();
}

async function searchUser () {
    const keyword = document.getElementById('searchUser').value.trim();
    if (!keyword) {
        loadUserData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                User(id: ${keyword}) {
                    id
                    nama
                    email
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderUserTable(data.data.User ? [data.data.User] : [], 'dataUser', true);
    } else {
        query = `
            query {
                UserByNama(nama: "%${keyword}%") {
                    id
                    nama
                    email
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        });
        const data = await res.json();
        renderUserTable(data.data.UserByNama, 'dataUser', true);
    }
}
document.addEventListener('DOMContentLoaded', loadUserData);







