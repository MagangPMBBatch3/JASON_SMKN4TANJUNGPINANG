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
    const select = document.getElementById("editJamPerTanggalProyekId");

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
    const select = document.getElementById("editJamPerTanggalUserProfileId");

    while (select.options.length > 1) {
        select.remove(1);
    }

    data.data.allUserProfiles.forEach((UserProfile) => {
        const option = new Option(UserProfile.nama_lengkap, UserProfile.id);
        select.add(option);
    });
}



async function openEditJamPerTanggalModal(id, proyek_id, users_profile_id, tanggal, jam) {
    loadProyekOptionsForEdit();
    loadUserProfileOptionsForEdit();


    document.getElementById('editJamPerTanggalId').value = id;
    document.getElementById('editJamPerTanggalProyekId').value = proyek_id;
    document.getElementById('editJamPerTanggalUserProfileId').value = users_profile_id;
    document.getElementById('editJamPerTanggalTanggal').value = tanggal;
    document.getElementById('editJamPerTanggalJam').value = jam;

    document.getElementById('modalEditJamPerTanggal').classList.remove('hidden');





}
function closeEditJamPerTanggalModal () {
    document.getElementById('modalEditJamPerTanggal').classList.add('hidden');
}

async function updateJamPerTanggal () {
    const id = document.getElementById('editJamPerTanggalId').value;
    const UserProfileId = document.getElementById('editJamPerTanggalUserProfileId').value.trim();
    const ProyekId = document.getElementById('editJamPerTanggalProyekId').value.trim();

    let rawDate = document.getElementById('editJamPerTanggalTanggal').value;

    const Jam = document.getElementById('editJamPerTanggalJam').value.trim();

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
     if (!Jam) {
        alert('Jam harus diisi');
        return;
    }


    const mutation = `
        mutation {
            updateJamPerTanggal(id: ${id}, input: {
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

    const response = await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });


    closeEditJamPerTanggalModal();
    loadJamPerTanggalData();
}

