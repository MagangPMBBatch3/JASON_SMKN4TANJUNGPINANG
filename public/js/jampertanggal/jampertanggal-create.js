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
    const select = document.getElementById("addJamPerTanggalProyekId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allProyeks.forEach((Proyek) => {
        const option = new Option(Proyek.nama, Proyek.id);
        select.add(option);
    });
}


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
    const select = document.getElementById("addJamPerTanggalUserProfileId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allUserProfiles.forEach((UserProfile) => {
        const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
        select.add(option);
    });
}
    function openAddJamPerTanggalModal () {
        document.getElementById('modalAddJamPerTanggal').classList.remove('hidden');
        loadProyekOptions();
        loadUserProfileOptions();

    }
    function closeAddJamPerTanggalModal () {
        document.getElementById('modalAddJamPerTanggal').classList.add('hidden');
        document.getElementById('addJamPerTanggalUserProfileId').value = '';
        document.getElementById('addJamPerTanggalProyekId').value = '';
        document.getElementById('addJamPerTanggalTanggal').value = '';
        document.getElementById('addJamPerTanggalJam').value = '';
    }

    async function createJamPerTanggal() {

        const UserProfileId = document.getElementById('addJamPerTanggalUserProfileId').value.trim();
        const ProyekId = document.getElementById('addJamPerTanggalProyekId').value.trim();
        const rawDate = document.getElementById('addJamPerTanggalTanggal').value.trim();
        const Jam = document.getElementById('addJamPerTanggalJam').value.trim();

        let formattedDate = rawDate.replace("T", " ") + ":00";


        if (!UserProfileId) {
        alert('User Profil ID harus diisi');
        return;
        }
         if (!ProyekId) {
        alert('Proyek ID harus diisi');
        return;
        }
         if (!rawDate) {
        alert('Tanggal harus diisi');
        return;
         }
        if (!Jam) {
        alert('Jam harus diisi');
        return;
        }


       const mutation = `
        mutation {
            createJamPerTanggal (input: {
             users_profile_id: ${UserProfileId}
            proyek_id: ${ProyekId}
            tanggal: "${formattedDate}"
            jam: ${Jam}
            }) {
                id
                users_profile {
                nama_lengkap
                }
                 proyek {
                nama
                }
                tanggal
                jam
            }
        }
    `;


        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeAddJamPerTanggalModal();
        loadJamPerTanggalData();
    }
