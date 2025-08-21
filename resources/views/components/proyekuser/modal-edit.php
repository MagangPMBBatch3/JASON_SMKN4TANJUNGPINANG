<!-- Modal Tambah Proyek -->
    <div id="modalEditProyekUser" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Proyek User</h3>

            <select
                    id="editProyekUserProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>

             <select
                    id="editProyekUserUserProfileId"
                    name="users_profile_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Profil User</option>
                </select>


            <input
                type="hidden"
                id="editProyekUserId">

            <div class="flex gap-2">
                <button onclick="closeEditProyekUserModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updateProyekUser()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Edit
                </button>
            </div>
        </div>
    </div>





