<!-- Modal Tambah Proyek -->
    <div id="modalEditJamKerja" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Jam Kerja</h3>


                <select
                    id="editJamKerjaUserProfileId"
                    name="users_profile_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">User Profile</option>
                </select>

                <input
                type="text"
                placeholder="No Wbs"
                id="editJamKerjaNoWbs"
                class="w-full px-4 py-2 border rounded mb-4"
            >
                <input
                type="text"
                placeholder="Kode Proyek"
                id="editJamKerjaKodeProyek"
                class="w-full px-4 py-2 border rounded mb-4"
            >

                <select
                    id="editJamKerjaProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>

                <select
                    id="editJamKerjaAktivitasId"
                    name="aktivitas_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Aktivitas</option>
                </select>

                <input
                type="datetime-local"
                placeholder="Tanggal"
                id="editJamKerjaTanggal"
                class="w-full px-4 py-2 border rounded mb-4"
            >
                <input
                type="number" min="0" step="0.5"
                placeholder="Jumlah Jam"
                id="editJamKerjaJumlahJam"
                class="w-full px-4 py-2 border rounded mb-4"

            >
                <input
                type="text"
                placeholder="Keterangan"
                id="editJamKerjaKeterangan"
                class="w-full px-4 py-2 border rounded mb-4"
            >
                <select
                    id="editJamKerjaStatusId"
                    name="status_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Status</option>
                </select>

                <select
                    id="editJamKerjaModeId"
                    name="mode_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Mode Kerja</option>
                </select>

             <input
                type="hidden"
                id="editJamKerjaId">


            <div class="flex gap-2">
                <button onclick="closeEditJamKerjaModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updateJamKerja()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






