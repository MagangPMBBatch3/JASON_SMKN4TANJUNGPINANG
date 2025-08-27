async function loadCurrentUserProfile() {
    const query = `
        query {
            currentUserProfile {
                id
                nama_lengkap
                nrp
                bagian_id
                level_id
                alamat
                foto
            }
        }
    `;
    try {
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        const profile = data?.data?.currentUserProfile; // Specific current user

        if (profile) {
            document.querySelector('input[name="nama_lengkap"]').value = profile.nama_lengkap || '';
            document.querySelector('input[name="nrp"]').value = profile.nrp || '';
            document.querySelector('select[name="bagian_id"]').value = profile.bagian_id || '';
            document.querySelector('select[name="level_id"]').value = profile.level_id || '';
            document.querySelector('textarea[name="alamat"]').value = profile.alamat || '';
            // Fix default image path
            document.getElementById('profileImagePreview').src = profile.foto
                ? `/storage/${profile.foto}`
                : '/storage/images/default.jpg'; // ← Fix path
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}
