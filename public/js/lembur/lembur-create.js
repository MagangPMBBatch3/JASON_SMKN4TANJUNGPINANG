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
    const select = document.getElementById("addLemburProyekId");

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
    const select = document.getElementById("addLemburUserProfileId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allUserProfiles.forEach((UserProfile) => {
        const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
        select.add(option);
    });
}
    function openAddLemburModal () {
        document.getElementById('modalAddLembur').classList.remove('hidden');
        loadProyekOptions();
        loadUserProfileOptions();

    }
    function closeAddLemburModal () {
        document.getElementById('modalAddLembur').classList.add('hidden');
        document.getElementById('addLemburUserProfileId').value = '';
        document.getElementById('addLemburProyekId').value = '';
        document.getElementById('addLemburTanggal').value = '';
    }

    async function createLembur() {

        const UserProfileId = document.getElementById('addLemburUserProfileId').value.trim();
        const ProyekId = document.getElementById('addLemburProyekId').value.trim();
        const rawDate = document.getElementById('addLemburTanggal').value.trim();

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


       const mutation = `
        mutation {
            createLembur (input: {
            users_profile_id: ${UserProfileId}
            proyek_id: ${ProyekId}
            tanggal: "${formattedDate}"
            }) {
                id
                users_profile {
                nama_lengkap
                }
                 proyek {
                nama
                }
                tanggal

            }
        }
    `;


        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeAddLemburModal();
        loadLemburData();
    }
