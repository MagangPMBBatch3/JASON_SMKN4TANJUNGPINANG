function openAddUserModal() {
    document.getElementById('modalAddUser').classList.remove('hidden');
}

function closeAddUserModal() {
    document.getElementById('modalAddUser').classList.add('hidden');
    document.getElementById('addNamaUser').value = '';
    document.getElementById('addEmailUser').value = '';
}

async function createUser () {
    const nama = document.getElementById('addNamaUser').value;
    const email = document.getElementById('addEmailUser').value;
    const password = document.getElementById('addPasswordUser').value;
    if (!nama) return alert("Nama Tidak Boleh Kosong");
    if (!email) return alert("Email Tidak Boleh Kosong");
    if (!password) return alert("Password Tidak Boleh Kosong");

    const mutation = `
        mutation {
            createUser(input: { nama: "${nama}", email: "${email}", password: "${password}" }) {
                id
                nama
                email
                password
            }
        }
    `;

     try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });

        const result = await response.json();

        // Periksa apakah ada error dari GraphQL
        if (result.errors) {
            console.error("Error creating user:", result.errors);
            alert("Gagal membuat user. Cek console untuk detail.");
            return;
        }

        const userId = result.data.createUser.id;
        console.log("User created:", nama, userId);
        closeAddUserModal();
        loadUserData();

        // Lanjut ke pembuatan user profile
        await insertUserProfile(userId, nama);

    } catch (error) {
        console.error("Network or server error:", error);
    }
}

async function insertUserProfile(userId, nama){
    const mutation = `
        mutation {
            createUserProfile(input: {
                user_id: ${userId},
                nama_lengkap: "${nama}"
            }) {
                id
                nama_lengkap
            }
        }
    `;

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ query: mutation })
        });
        console.log(response.status, response.statusText);

        const result = await response.json();

        if (result.errors) {
            console.error("Error creating user profile:", result.errors);
            alert("Gagal membuat user profile. Cek console untuk detail.");
            return;
        }

        console.log("User profile created:", result.data.createUserProfile);

    } catch (error) {
        console.error("Network or server error on user profile:", error);
    }

}
