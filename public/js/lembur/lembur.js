async function loadLemburData() {
    const queryAktif = `
        query {
            allLembur {
                id
                proyek {
                    nama
                }
                users_profile {
                    id
                    nama_lengkap
                    foto
                }
                tanggal
            }
        }
    `;

    const resAktif = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryAktif })
    });

    const dataAktif = await resAktif.json();
    renderLemburTable(dataAktif?.data?.allLembur || [], 'tableAktif', true);

    const queryArsip = `
        query {
            allLemburArsip {
                id
                proyek {
                    nama
                }
                users_profile {
                    id
                    nama_lengkap
                    foto
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
    renderLemburTable(dataArsip?.data?.allLemburArsip || [], 'tableArsip', false);
}

function renderLemburTable(lemburs, containerId, isActive) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (!lemburs.length) {
        container.innerHTML = `
            <div class="col-span-3 text-center text-gray-500 p-4">Tidak ada data</div>
        `;
        return;
    }

    lemburs.forEach(item => {
        let actions = '';
        if (isActive) {
            actions = `
                <button onclick="archiveLembur(${item.id})"
                        class="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                        title="Arsipkan">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            `;
        } else {
            actions = `
                <div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button onclick="restoreLembur(${item.id})"
                            class="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            title="Restore">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </button>
                    <button onclick="forceDeleteLembur(${item.id})"
                            class="bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            title="Hapus Permanen">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            `;
        }

        container.innerHTML += `
            <div class="bg-${isActive ? 'white' : 'gray-100'} p-6 rounded-xl shadow-md flex flex-col items-center relative group">
                ${actions}
                <div class="relative">
                    <img src="${item.users_profile?.foto
                        ? '/storage/' + item.users_profile.foto
                        : '/storage/images/default.jpg'}"
                        alt="Foto ${item.users_profile?.nama_lengkap || '-'}"
                        class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg">
                </div>
                <div class="mt-4 text-center">
                    <h4 class="text-lg font-semibold text-gray-800">
                        ${item.users_profile?.nama_lengkap || '-'}
                    </h4>
                    <p class="text-gray-600">Proyek: ${item.proyek?.nama || '-'}</p>
                    <p class="text-gray-600">Tanggal: ${item.tanggal}</p>
                </div>
            </div>
        `;
    });
}

async function archiveLembur(id) {
    if (!confirm('Pindahkan ke arsip?')) return;
    const mutation = `
        mutation {
            deleteLembur(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadLemburData();
}

async function restoreLembur(id) {
    if (!confirm('Kembalikan dari arsip?')) return;
    const mutation = `
        mutation {
            restoreLembur(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadLemburData();
}

async function forceDeleteLembur(id) {
    if (!confirm('Hapus permanen? Data tidak bisa dikembalikan!')) return;
    const mutation = `
        mutation {
            forceDeleteLembur(id: ${id}) { id }
        }
    `;

    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    loadLemburData();
}

async function searchLembur() {
    const keyword = document.getElementById('searchLembur').value.trim();
    if (!keyword) {
        loadLemburData();
        return;
    }

    let query = '';
    if (!isNaN(keyword)) {
        query = `
            query {
                Lembur(id: ${keyword}) {
                    id
                    proyek {
                        nama
                    }
                    users_profile {
                        id
                        nama_lengkap
                        foto
                    }
                    tanggal
                    deleted_at
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        const lemburs = data.data.Lembur ? [data.data.Lembur] : [];
        const isActive = !data.data.Lembur?.deleted_at;
        renderLemburTable(lemburs, isActive ? 'tableAktif' : 'tableArsip', isActive);
    } else {
        query = `
            query {
                allLembur(where: { users_profile: { nama_lengkap: { like: "%${keyword}%" } } }) {
                    id
                    proyek {
                        nama
                    }
                    users_profile {
                        id
                        nama_lengkap
                        foto
                    }
                    tanggal
                    deleted_at
                }
            }
        `;

        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        const lemburs = data.data.allLembur || [];
        // Pisahkan data aktif dan arsip
        const lembursAktif = lemburs.filter(item => !item.deleted_at);
        const lembursArsip = lemburs.filter(item => item.deleted_at);
        renderLemburTable(lembursAktif, 'tableAktif', true);
        renderLemburTable(lembursArsip, 'tableArsip', false);
    }
}

document.addEventListener('DOMContentLoaded', loadLemburData);
