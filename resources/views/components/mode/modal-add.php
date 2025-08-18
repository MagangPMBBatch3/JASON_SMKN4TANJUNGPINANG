<!-- Modal Tambah Bagian -->
    <div id="modalAddMode" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Tambah Mode</h3>

            <input
                type="text"
                placeholder="Nama Mode"
                id="addModeNama"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <div class="flex gap-2">
                <button onclick="closeAddModeModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="createModeJamKerja()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






