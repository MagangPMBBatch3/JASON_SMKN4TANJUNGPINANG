<!-- Modal Tambah Bagian -->
    <div id="modalAddStatusJamKerja" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Tambah Status Jam Kerja</h3>

            <input
                type="text"
                placeholder="Status Jam Kerja"
                id="addNamaStatusJamKerja"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <div class="flex gap-2">
                <button onclick="closeAddStatusJamKerjaModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="createStatusJamKerja()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






