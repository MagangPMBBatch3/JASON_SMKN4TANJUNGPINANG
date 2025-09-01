async function loadJamKerjaData() {
    const QueryAktif = `
        query {
            allJamKerja {
                id
                users_profile {
                id
                nama_lengkap
                }
                no_wbs
                kode_proyek
                proyek {
                id
                nama
                }
                aktivitas {
                id
                nama
                }
                tanggal
                jumlah_jam
                keterangan
                status_jam_kerja {
                id
                nama
                }
                mode_jam_kerja{
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
    renderJamKerjaTable(dataAktif?.data?.allJamKerja || [], 'dataJamKerja', true);

    const queryArsip = `
        query{
            allJamKerjaArsip{
               id
                users_profile {
                id
                nama_lengkap
                }
                no_wbs
                kode_proyek
                proyek {
                id
                nama
                }
                aktivitas {
                id
                nama
                }
                tanggal
                jumlah_jam
                keterangan
                status {
                id
                nama
                }
                mode{
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
    renderJamKerjaTable(dataArsip?.data?.allJamKerjaArsip || [], 'dataJamKerjaArsip', false);
}


function renderJamKerjaTable(JamKerja, tableId, isActive) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    if (!JamKerja.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-gray-500 p-3">Tidak ada data</td>
            </tr>
        `;
        return;
    }

    JamKerja.forEach(item =>  {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="openEditJamKerjaModal(${item.id}, '${item.users_profile?.nama_lengkap || '-'}', '${item.no_wbs}', '${item.kode_proyek}', '${item.proyek?.nama || '-'}', '${item.aktivitas?.nama || '-'}', '${item.tanggal}', '${item.jumlah_jam}', '${item.keterangan}', '${item.status_jam_kerja?.nama || '-'}', '${item.mode_jam_kerja?.nama || '-'}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onclick="archiveJamKerja(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded">Arsipkan</button>
            `;
    }
    else {
        actions = `
            <button onclick="restoreJamKerja(${item.id})" class="bg-green-500 text-white px-2 py-1 rounded">Restore</button>
            <button onclick="forceDeleteJamKerja(${item.id})" class="bg-red-700 text-white px-2 py-1 rounded">Hapus Permanen</button>
        `;
    }

    tbody.innerHTML += `
    <tr>
        <td class="border p-2">${item.id}</td>
        <td class="border p-2">${item.users_profile?.nama_lengkap || '-'}</td>
        <td class="border p-2">${item.no_wbs}</td>
        <td class="border p-2">${item.kode_proyek}</td>
        <td class="border p-2">${item.proyek?.nama || '-'}</td>
        <td class="border p-2">${item.aktivitas?.nama || '-'}</td>
        <td class="border p-2">${item.tanggal}</td>
        <td class="border p-2">${item.jumlah_jam}</td>
        <td class="border p-2">${item.keterangan}</td>
        <td class="border p-2">${item.status_jam_kerja?.nama || '-'}</td>
        <td class="border p-2">${item.mode_jam_kerja?.nama || '-'}</td>
        <td class="border p-2">${actions}</td>
    </tr>
    `;
});
}

async function archiveJamKerja(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteJamKerja(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamKerjaData();
}

async function restoreJamKerja(id) {
    if (!confirm('Kembalikan ke arsip?')) return;
    const mutation = `
        mutation {
            restoreJamKerja(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamKerjaData();
}

async function forceDeleteJamKerja(id) {
    if (!confirm('Hapus permanen? Data Tidak bisa di kembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteJamKerja(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadJamKerjaData();
}

async function searchJamKerja () {
    const keyword = document.getElementById('searchJamKerja').value.trim();
    if (!keyword) {
        loadJamKerjaData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                JamKerja(id: ${keyword}) {
               id
                users_profile {
                id
                nama_lengkap
                }
                no_wbs
                kode_proyek
                proyek {
                id
                nama
                }
                aktivitas {
                id
                nama
                }
                tanggal
                jumlah_jam
                keterangan
                status_jam_kerja {
                id
                nama
                }
                mode_jam_kerja{
                id
                nama
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
        renderJamKerjaTable(data.data.JamKerja ? [data.data.JamKerja] : [], 'dataJamKerja', true);
    } else {
        query = `
            query {
                JamKerjaByNama(nama: "%${keyword}%") {
                id
                users_profile {
                id
                nama_lengkap
                }
                no_wbs
                kode_proyek
                proyek {
                id
                nama
                }
                aktivitas {
                id
                nama
                }
                tanggal
                jumlah_jam
                keterangan
                status_jam_kerja {
                id
                nama
                }
                mode_jam_kerja{
                id
                nama
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
        renderJamKerjaTable(data.data.JamKerjaByNama, 'dataJamKerja', true);
    }
}
document.addEventListener('DOMContentLoaded', loadJamKerjaData);







