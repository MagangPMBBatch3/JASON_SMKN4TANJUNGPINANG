
     async function loadCurrentUserProfile() {
         const query = `
             query {
                 allUserProfiles {
                     id
                     nama_lengkap
                     nrp
                     alamat
                     foto
                 }
             }
         `;
         try {
             const res = await fetch('/graphql', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ query })
             });
             const data = await res.json();
             const profile = data?.data?.allUserProfiles[0]; // Assuming first profile is current user
             if (profile) {
                 document.querySelector('input[name="nama_lengkap"]').value = profile.nama_lengkap || '';
                 document.querySelector('input[name="nrp"]').value = profile.nrp || '';
                 document.querySelector('textarea[name="alamat"]').value = profile.alamat || '';
                 document.getElementById('profileImagePreview').src = profile.foto ? `/storage/${profile.foto}` : '/images/default.jpg';
             }
         } catch (error) {
             console.error('Error fetching user profile:', error);
         }
     }

     document.addEventListener('DOMContentLoaded', loadCurrentUserProfile);
