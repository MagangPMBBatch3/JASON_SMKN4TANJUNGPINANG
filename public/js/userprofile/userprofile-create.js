async function updateUserProfile(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    const mutation = `
        mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
            updateUserProfile(input: $input) {
                id
                nama_lengkap
                nrp
                bagian_id
                alamat
                foto
            }
        }
    `;

    const variables = {
        input: {
            nama_lengkap: formData.get('nama_lengkap'),
            nrp: formData.get('nrp'),
            bagian_id: formData.get('bagian_id'),
            alamat: formData.get('alamat'),

        }
    };

    try {
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: mutation,
                variables: variables
            })
        });

        const data = await res.json();
        if (data.errors) {
            console.error('Update errors:', data.errors);
            return;
        }

        // Refresh profile data
        loadCurrentUserProfile();

        // Show success message (assuming session('success') will be set server-side)
        window.location.reload();
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImagePreview').src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Add form submit event listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', updateUserProfile);
});
