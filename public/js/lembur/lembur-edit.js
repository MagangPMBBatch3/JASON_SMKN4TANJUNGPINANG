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
    const select = document.getElementById("editLemburProyekId");

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
    const select = document.getElementById("editLemburUserProfileId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allUserProfiles.forEach((UserProfile) => {
        const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
        select.add(option);
    });
}



async function openEditLemburModal(id, proyek_id, users_profile_id, tanggal) {
   await loadProyekOptionsForEdit();
   await loadUserProfileOptionsForEdit();


    document.getElementById('editLemburId').value = id;
    document.getElementById('editLemburProyekId').value = proyek_id;
    document.getElementById('editLemburUserProfileId').value = users_profile_id;
    document.getElementById('editLemburTanggal').value = tanggal;


    document.getElementById('modalEditLembur').classList.remove('hidden');





}
function closeEditLemburModal () {
    document.getElementById('modalEditLembur').classList.add('hidden');
}

async function updateLembur () {
    const id = document.getElementById('editLemburId').value;
    const UserProfileId = document.getElementById('editLemburUserProfileId').value.trim();
    const ProyekId = document.getElementById('editLemburProyekId').value.trim();

    let rawDate = document.getElementById('editLemburTanggal').value;


    // ubah ke format DB ("2025-08-21 09:35:00")
    let formattedDate = rawDate.replace("T", " ") + ":00";

    if (!ProyekId) {
        alert('Proyek ID harus diisi');
        return;
    }
     if (!UserProfileId) {
        alert('User Profile ID harus diisi');
        return;
    }
     if (!rawDate) {
        alert('Tanggal harus diisi');
        return;
    }


    const mutation = `
        mutation {
            updateLembur(id: ${id}, input: {
            users_profile_id: ${parseInt(UserProfileId)},
            proyek_id: ${parseInt(ProyekId)},
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

    const response = await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });


    closeEditLemburModal();
    loadLemburData();
}

