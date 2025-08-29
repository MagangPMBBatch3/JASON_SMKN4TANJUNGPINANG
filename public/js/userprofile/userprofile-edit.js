async function updateUserProfile(event) {
         event.preventDefault();

         const form = document.getElementById('profileForm');
         const formData = new FormData(form);

         try {
             // Submit the form to the server-side route for file handling
             const response = await fetch(form.action, {
                 method: 'POST',
                 body: formData,
             });

             if (!response.ok) {
                 throw new Error('Server error during form submission');
             }


            window.location.href = '/profile';



         } catch (error) {
             console.error('Error updating profile:', error);
             alert('Gagal mengupdate profil. Silakan coba lagi.');
         }
     }
