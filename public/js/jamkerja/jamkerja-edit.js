    async function loadUserProfileOptionsForEdit() {
        const query = `
            query {
                allUserProfile {
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
        const select = document.getElementById("editJamKerjaUserProfileId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allUserProfile.forEach((UserProfile) => {
            const option = new Option(UserProfile.nama, UserProfile.id);
            select.add(option);
        });
    }

    async function loadProyekOptionsForEdit() {
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
    const select = document.getElementById("editJamKerjaProyekId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allProyeks.forEach((Proyek) => {
        const option = new Option(Proyek.nama, Proyek.id);
        select.add(option);
    });
}
 async function loadAktivitasOptionsForEdit() {
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
        const select = document.getElementById("editJamKerjaAktivitasId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allAktivitas.forEach((Aktivitas) => {
            const option = new Option(Aktivitas.nama, Aktivitas.id);
            select.add(option);
        });
    }
     async function loadStatusOptionsForEdit() {
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
        const select = document.getElementById("editJamKerjaStatusId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allStatus.forEach((Status) => {
            const option = new Option(Status.nama, Status.id);
            select.add(option);
        });
    }
     async function loadModeOptionsForEdit() {
        const query = `
            query {
                allMode {
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
        const select = document.getElementById("editJamKerjaModeId");

        while (select.options.length > 1) {
            select.remove(1);
        }

        data.data.allMode.forEach((Mode) => {
            const option = new Option(Mode.nama, Mode.id);
            select.add(option);
        });
    }





    function openEditJamKerjaModal () {
        loadUserProfileOptionsForEdit();
        loadProyekOptionsForEdit();
        loadAktivitasOptionsForEdit();
        loadStatusOptionsForEdit();
        loadModeOptionsForEdit();

        document.getElementById('editJamKerjaId').value = 'id';
        document.getElementById('editJamKerjaUserProfileId').value = 'users_profile_id';
        document.getElementById('editJamKerjaNoWbs').value = 'no_wbs';
        document.getElementById('editJamKerjaKodeProyek').value = 'kode_proyek';
        document.getElementById('editJamKerjaProyekId').value = 'proyek_id';
        document.getElementById('editJamKerjaAktivitasId').value = 'aktivitas_id';
        document.getElementById('editJamKerjaTanggal').value = 'tanggal';
        document.getElementById('editJamKerjaJumlahJam').value = 'jumlah_jam';
        document.getElementById('editJamKerjaKeterangan').value = 'keterangan';
        document.getElementById('editJamKerjaStatusId').value = 'status_id';
        document.getElementById('editJamKerjaModeId').value = 'mode_id';

        document.getElementById('modalEditJamKerja').classList.remove('hidden');
    }

    function closeEditJamKerjaModal () {
        document.getElementById('modalEditJamKerja').classList.edit('hidden');

    }

    async function updateJamKerja() {
        const id = document.getElementById('editJamKerjaId').value.trim();
        const UserProfileId = document.getElementById('editJamKerjaUserProfileId').value.trim();
        const NoWbs = document.getElementById('editJamKerjaNoWbs').value.trim();
        const KodeProyek = document.getElementById('editJamKerjaKodeProyek').value.trim();
        const proyekId = document.getElementById('editJamKerjaProyekId').value.trim();
        const AktivitasId = document.getElementById('editJamKerjaAktivitasId').value.trim();

        let rawDate = document.getElementById('editJamKerjaTanggal').value;

        const JumlahJam = document.getElementById('editJamKerjaJumlahJam').value.trim();
        const Keterangan = document.getElementById('editJamKerjaKeterangan').value.trim();
        const StatusId = document.getElementById('editJamKerjaStatusId').value.trim();
        const ModeId = document.getElementById('editJamKerjaModeId').value.trim();

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
            updateJamKerja (id: ${id}, input: {
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
                status {
                nama
                }
                mode{
                nama
                }
            }
        }
    `;


        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeEditJamKerjaModal();
        loadJamKerjaData();
    }
