function openEditUserModal(id, nama) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editUserNama').value = nama;
    document.getElementById('modalEditUser').classList.remove('hidden');
}

function closeEditUserModal () {
    document.getElementById('modalEditUser').classList.add('hidden');
}

async function updateUser () {
    const id = document.getElementById('editUserId').value;
    const nama = document.getElementById('editUserNama').value.trim();
     const email = document.getElementById('editUserEmail').value.trim();
     const password = document.getElementById('editUserPassword').value.trim();
    if (!nama) {
        alert('Nama User harus diisi');
        return;
    }
    if (!email) {
        alert('Email User harus diisi');
        return;
    }
     if (!password) {
        alert('Password User harus diisi');
        return;
    }
    const mutation = `
        mutation {
            updateUser(id: ${id}, input: { nama: "${nama}", email: "${email}", password: "${email}" }) {
                id
                nama
                email
                password
            }
        }
    `;

    await fetch ('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({ query: mutation })
    });
    closeEditUserModal();
    loadUserData();
}
