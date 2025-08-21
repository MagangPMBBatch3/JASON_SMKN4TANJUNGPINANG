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
    const select = document.getElementById("addProyekUserProyekId");

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
    const select = document.getElementById("addProyekUserUserProfileId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allUserProfiles.forEach((UserProfile) => {
        const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
        select.add(option);
    });
}


    function openAddProyekUserModal () {
        document.getElementById('modalAddProyekUser').classList.remove('hidden');
        loadProyekOptions();
        loadUserProfileOptions();
    }

    function closeAddProyekUserModal () {
        document.getElementById('modalAddProyekUser').classList.add('hidden');
        document.getElementById('addProyekUserProyekId').value = '';
        document.getElementById('addProyekUserUserProfileId').value = '';


    }

    async function createProyekUser() {
        const ProyekId = document.getElementById('addProyekUserProyekId').value.trim();
        const UserProfileId = document.getElementById('addProyekUserUserProfileId').value.trim();


        if (!ProyekId) {
        alert('Proyek ID harus diisi');
        return;
        }
        if (!UserProfileId) {
        alert('User Profil ID harus diisi');
        return;
        }


       const mutation = `
        mutation {
            createProyekUser (input: {
            proyek_id: ${ProyekId}
            users_profile_id: ${UserProfileId}
            }) {
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


        await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        closeAddProyekUserModal();
        loadProyekUserData();
    }
