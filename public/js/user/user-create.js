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

    await fetch('/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
    });

    closeAddUserModal();
    loadUserData();
}
