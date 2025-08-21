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
    const select = document.getElementById("editProyekUserProyekId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allProyeks.forEach((Proyek) => {
        const option = new Option(Proyek.nama, Proyek.id);
        select.add(option);
    });
}


async function loadUserProfileOptionsForEdit() {
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
    const select = document.getElementById("editProyekUserUserProfileId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allUserProfiles.forEach((UserProfile) => {
        const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
        select.add(option);
    });
}



async function openEditProyekUserModal(id, proyek_id, users_profile_id) {
  loadProyekOptionsForEdit();
   loadUserProfileOptionsForEdit();


    document.getElementById('editProyekUserId').value = id;
    document.getElementById('editProyekUserProyekId').value = proyek_id;
    document.getElementById('editProyekUserUserProfileId').value = users_profile_id;
    document.getElementById('modalEditProyekUser').classList.remove('hidden');




}
function closeEditProyekUserModal () {
    document.getElementById('modalEditProyekUser').classList.add('hidden');
}

async function updateProyekUser () {
    const id = document.getElementById('editProyekUserId').value;
    const ProyekId = document.getElementById('editProyekUserProyekId').value.trim();
    const UserProfileId = document.getElementById('editProyekUserUserProfileId').value.trim();

    if (!ProyekId) {
        alert('Proyek ID harus diisi');
        return;
    }
     if (!UserProfileId) {
        alert('User Profile ID harus diisi');
        return;
    }


    const mutation = `
        mutation {
            updateProyekUser(id: ${id}, input: {
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

    const response = await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });


    closeEditProyekUserModal();
    loadProyekUserData();
}

