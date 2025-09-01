<!-- Modal Tambah Proyek -->
    <div id="modalAddJamKerja" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Tambah Jam Kerja</h3>


                <select
                    id="addJamKerjaUserProfileId"
                    name="users_profile_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">User Profile</option>
                </select>

                <input
                type="text"
                placeholder="No Wbs"
                id="addJamKerjaNoWbs"
                class="w-full px-4 py-2 border rounded mb-4"
            >
                <input
                type="text"
                placeholder="Kode Proyek"
                id="addJamKerjaKodeProyek"
                class="w-full px-4 py-2 border rounded mb-4"
            >

                <select
                    id="addJamKerjaProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>

                <select
                    id="addJamKerjaAktivitasId"
                    name="aktivitas_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Aktivitas</option>
                </select>

                <input
                type="datetime-local"
                placeholder="Tanggal"
                id="addJamKerjaTanggal"
                class="w-full px-4 py-2 border rounded mb-4"
            >
                <input
                type="number" min="0" step="0.5"
                placeholder="Jumlah Jam"
                id="addJamKerjaJumlahJam"
                class="w-full px-4 py-2 border rounded mb-4"

            >
                <input
                type="text"
                placeholder="Keterangan"
                id="addJamKerjaKeterangan"
                class="w-full px-4 py-2 border rounded mb-4"
            >
                <select
                    id="addJamKerjaStatusId"
                    name="status_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Status</option>
                </select>

                <select
                    id="addJamKerjaModeId"
                    name="mode_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Mode Kerja</option>
                </select>




            <div class="flex gap-2">
                <button onclick="closeAddJamKerjaModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="createJamKerja()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






