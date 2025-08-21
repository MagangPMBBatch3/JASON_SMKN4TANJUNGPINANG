<!-- Modal Tambah Proyek -->
    <div id="modalAddProyekUser" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Tambah Proyek User</h3>

                <select
                    id="addProyekUserProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>

             <select
                    id="addProyekUserUserProfileId"
                    name="users_profile_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Profil User</option>
                </select>



            <div class="flex gap-2">
                <button onclick="closeAddProyekUserModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="createProyekUser()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






