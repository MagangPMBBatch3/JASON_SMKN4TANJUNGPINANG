async function loadModeData() {
    const QueryAktif = `
        query {
            allModeJamKerja {
                id
                nama
            }
        }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: QueryAktif })
    });

    const dataAktif = await resAktif.json();
    renderModeTable(dataAktif?.data?.allModeJamKerja || [], 'dataMode', true);

    const queryArsip = `
        query {
            allModeArsip{
                id
                nama
            }
        }
    `;

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });

    const dataArsip = await resArsip.json();
    renderModeTable(dataArsip?.data?.allModeArsip || [], 'dataModeArsip', false);
}


function renderModeTable(Mode, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!Mode.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    Mode.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditModeModal(${item.id}, '${item.nama}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveMode(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreModeJamKerja(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteModeJamKerja(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.nama}</td>
         <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveMode(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteModeJamKerja(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadModeData();
}

async function restoreModeJamKerja(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreModeJamKerja(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadModeData();
}

async function forceDeleteModeJamKerja(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteModeJamKerja(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadModeData();
}

async function searchMode () {
    const keyword = document.getElementById('searchMode').value.trim();
    if (!keyword) {
        loadModeData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                ModeJamKerja(id: ${keyword}) {
                    id
                    nama
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        renderModeTable(data.data.ModeJamKerja ? [data.data.ModeJamKerja] : [], 'dataMode', true);
    } else {
        query = `
            query {
                ModeJamKerjaByNama(nama: "%${keyword}%") {
                    id
                    nama


                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        });
        const data = await res.json();
        renderModeTable(data.data.ModeJamKerjaByNama, 'dataMode', true);
    }
}
document.addEventListener('DOMContentLoaded', loadModeData);







