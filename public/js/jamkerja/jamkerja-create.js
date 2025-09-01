    async function loadUserProfileOptions() {
        const query = `
            query {
                allUserProfiles {
                    id
                    nama_lengkap
                }
            }
        `;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const select = document.getElementById("addJamKerjaUserProfileId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allUserProfiles.forEach((UserProfile) => {
            const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
            select.add(option);
        });
    }

    async function loadProyekOptions() {
    const query = `
        query {
            allProyeks {
                id
                nama
            }
        }
    `;

    const response = await fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const select = document.getElementById("addJamKerjaProyekId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allProyeks.forEach((Proyek) => {
        const option = new Option(Proyek.nama, Proyek.id);
        select.add(option);
    });
}
 async function loadAktivitasOptions() {
        const query = `
            query {
                allAktivitas {
                    id
                    nama
                }
            }
        `;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const select = document.getElementById("addJamKerjaAktivitasId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allAktivitas.forEach((Aktivitas) => {
            const option = new Option(Aktivitas.nama, Aktivitas.id);
            select.add(option);
        });
    }
     async function loadStatusOptions() {
        const query = `
            query {
                allStatus {
                    id
                    nama
                }
            }
        `;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const select = document.getElementById("addJamKerjaStatusId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allStatus.forEach((Status) => {
            const option = new Option(Status.nama, Status.id);
            select.add(option);
        });
    }
     async function loadModeOptions() {
        const query = `
            query {
                allModeJamKerja {
                    id
                    nama
                }
            }
        `;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const select = document.getElementById("addJamKerjaModeId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allModeJamKerja.forEach((Mode) => {
            const option = new Option(Mode.nama, Mode.id);
            select.add(option);
        });
    }





    function openAddJamKerjaModal () {
        loadUserProfileOptions();
        loadProyekOptions();
        loadAktivitasOptions();
        loadStatusOptions();
        loadModeOptions();



        document.getElementById('modalAddJamKerja').classList.remove('hidden');
    }

    function closeAddJamKerjaModal () {
        document.getElementById('modalAddJamKerja').classList.add('hidden');

        document.getElementById('addJamKerjaUserProfileId').value = '';
        document.getElementById('addJamKerjaNoWbs').value = '';
        document.getElementById('addJamKerjaKodeProyek').value = '';
        document.getElementById('addJamKerjaProyekId').value = '';
        document.getElementById('addJamKerjaAktivitasId').value = '';
        document.getElementById('addJamKerjaTanggal').value = '';
        document.getElementById('addJamKerjaJumlahJam').value = '';
        document.getElementById('addJamKerjaKeterangan').value = '';
        document.getElementById('addJamKerjaStatusId').value = '';
        document.getElementById('addJamKerjaModeId').value = '';

    }

    async function createJamKerja() {
        const UserProfileId = document.getElementById('addJamKerjaUserProfileId').value.trim();
        const NoWbs = document.getElementById('addJamKerjaNoWbs').value.trim();
        const KodeProyek = document.getElementById('addJamKerjaKodeProyek').value.trim();
        const proyekId = document.getElementById('addJamKerjaProyekId').value.trim();
        const AktivitasId = document.getElementById('addJamKerjaAktivitasId').value.trim();

        let rawDate = document.getElementById('addJamKerjaTanggal').value;

        const JumlahJam = document.getElementById('addJamKerjaJumlahJam').value.trim();
        const Keterangan = document.getElementById('addJamKerjaKeterangan').value.trim();
        const StatusId = document.getElementById('addJamKerjaStatusId').value.trim();
        const ModeId = document.getElementById('addJamKerjaModeId').value.trim();

        let formattedDate = rawDate.replace("T", " ") + ":00";

        if (!UserProfileId) {
        alert('UserProfile ID harus diisi');
        return;
        }
        if (!NoWbs) {
        alert('No Wbs ID harus diisi');
        return;
        }
        if (!KodeProyek) {
        alert('Kode Proyek ID harus diisi');
        return;
        }
        if (!proyekId) {
        alert('Proyek harus diisi');
        return;
        }
        if (!AktivitasId) {
        alert('Aktivitas ID harus diisi');
        return;
        }
        if (!rawDate) {
        alert('Tanggal harus diisi');
        return;
        }
        if (!JumlahJam) {
        alert('Jumlah Jam harus diisi');
        return;
        }
        if (!Keterangan) {
        alert('Keterangan harus diisi');
        return;
        }
        if (!StatusId) {
        alert('Status ID harus diisi');
        return;
        }
        if (!ModeId) {
        alert('Mode ID harus diisi');
        return;
        }

       const mutation = `
        mutation {
            createJamKerja (input: {
            users_profile_id: ${parseInt(UserProfileId)},
            no_wbs: "${NoWbs}",
            kode_proyek: "${KodeProyek}",
            proyek_id: ${parseInt(proyekId)},
            aktivitas_id: ${parseInt(AktivitasId)},
            tanggal: "${formattedDate}",
            jumlah_jam: ${JumlahJam},
            keterangan: "${Keterangan}",
            status_id: ${parseInt(StatusId)},
            mode_id: ${parseInt(ModeId)}

            }) {
                 id
                user_profile {
                nama_lengkap
                }
                no_wbs
                kode_proyek
                proyek {
                nama
                }
                aktivitas {
                nama
                }
                tanggal
                jumlah_jam
                keterangan
                status_jam_kerja {
                nama
                }
                mode_jam_kerja {
                nama
                }
            }
        }
    `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query: mutation })
            });

            const result = await response.json();

            if (result.errors) {
                console.error('GraphQL errors:', result.errors);
                alert('Terjadi kesalahan saat menyimpan data: ' + result.errors[0].message);
                return;
            }

            if (result.data && result.data.createJamKerja) {
                closeAddJamKerjaModal();
                loadJamKerjaData();
                alert('Data berhasil disimpan!');
            } else {
                alert('Gagal menyimpan data. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan jaringan. Silakan coba lagi.');
        }
    }
