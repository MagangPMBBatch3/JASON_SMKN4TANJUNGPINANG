async function loadJamKerjaData() {
    const QueryAktif = `
        query {
            allJamKerja {
                id
                users_profile {
                id
                nama_lengkap
                foto
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
    renderJamKerjaTable(dataAktif?.data?.allJamKerja || [], 'tableAktif', true);

    const queryArsip = `
        query{
            allJamKerjaArsip{
               id
                users_profile {
                id
                nama_lengkap
                foto
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

    const resArsip = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryArsip })
    });

    const dataArsip = await resArsip.json();
    renderJamKerjaTable(dataArsip?.data?.allJamKerjaArsip || [], 'tableArsip', false);
}


function renderJamKerjaTable(JamKerja, containerId, isActive) {
    const container  = document.getElementById(containerId);
    container.innerHTML = '';

    if (!JamKerja.length) {
       container.innerHTML = `
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
                 <div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                 <button onclick="openEditJamKerjaModal(${item.id}, '${item.users_profile?.id || ''}', '${item.no_wbs}', '${item.kode_proyek}', '${item.proyek?.id || ''}', '${item.aktivitas?.id || ''}', '${item.tanggal || ''}', '${item.jumlah_jam}', '${item.keterangan}', '${item.status_jam_kerja?.id || ''}', '${item.mode_jam_kerja?.id || ''}')"
                       class="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            title="Edit">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828
                            2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2
                            0 01.586-1.414z" />
                        </svg>
                </button>
                <button onclick="archiveJamKerja(${item.id})"
                        class="bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            title="Arsipkan">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                             d="M6 18L18 6M6 6l12 12" />
                        </svg>
                </button>
            </div>
            `;
        } else {
            actions = `
                <div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button onclick="restoreJamKerja(${item.id})"
                            class="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            title="Restore">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </button>
                    <button onclick="forceDeleteJamKerja(${item.id})"
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
                    <p class="text-gray-600">No Wbs: ${item.no_wbs}</p>
                    <p class="text-gray-600">Kode: ${item.kode_proyek}</p>
                    <p class="text-gray-600">Proyek: ${item.proyek?.nama || '-'}</p>
                    <p class="text-gray-600">Aktivitas: ${item.aktivitas?.nama || '-'}</p>
                    <p class="text-gray-600">Tanggal: ${item.tanggal}</p>
                    <p class="text-gray-600">Jumlah Jam: ${item.jumlah_jam}</p>
                    <p class="text-gray-600">Keterangan: ${item.keterangan}</p>
                    <p class="text-gray-600">Status: ${item.status_jam_kerja?.nama || '-'}</p>
                    <p class="text-gray-600">Mode: ${item.mode_jam_kerja?.nama || '-'}</p>

                </div>
            </div>
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
        const jamkerjas = data.data.JamKerja ? [data.data.JamKerja] : [];
        const isActive = !data.data.JamKerja?.deleted_at;
        renderJamKerjaTable(jamkerjas, isActive ? 'tableAktif' : 'tableArsip', isActive);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        const jamkerjas = data.data.allJamKerja || [];
        // Pisahkan data aktif dan arsip
        const jamkerjasAktif = jamkerjas.filter(item => !item.deleted_at);
        const jamkerjasArsip = jamkerjas.filter(item => item.deleted_at);
        renderJamKerjaTable(jamkerjasAktif, 'tableAktif', true);
        renderJamKerjaTable(jamkerjasArsip, 'tableArsip', false);
    }
}
document.addEventListener('DOMContentLoaded', loadJamKerjaData);







