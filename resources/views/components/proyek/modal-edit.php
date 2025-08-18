<!-- Modal Tambah Bagian -->
    <div id="modalEditProyek" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Proyek</h3>

            <input
                type="text"
                placeholder="Edit Kode"
                id="editProyekKode"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Edit Nama"
                id="editProyekNama"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="date"
                placeholder="Edit Tanggal"
                id="editProyekTanggal"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Edit Nama Sekolah"
                id="editProyekNamaSekolah"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="hidden"
                id="editProyekId">

            <div class="flex gap-2">
                <button onclick="closeEditProyekModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updateProyek()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Edit
                </button>
            </div>
        </div>
    </div>





