<!-- Modal Tambah Proyek -->
    <div id="modalEditJamPerTanggal" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Jam</h3>



              <select
                    id="editJamPerTanggalUserProfileId"
                    name="users_profile_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Profil User</option>
                </select>


                <select
                    id="editJamPerTanggalProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>



                <input
                type="datetime-local"
                placeholder="Tanggal"
                id="editJamPerTanggalTanggal"
                class="w-full px-4 py-2 border rounded mb-4"
            >

              <input
                type="number" min="0" step="0.5"
                placeholder="Jam"
                id="editJamPerTanggalJam"
                class="w-full px-4 py-2 border rounded mb-4"
            >

             <input
                type="hidden"
                id="editJamPerTanggalId">





            <div class="flex gap-2">
                <button onclick="closeEditJamPerTanggalModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updateJamPerTanggal()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






