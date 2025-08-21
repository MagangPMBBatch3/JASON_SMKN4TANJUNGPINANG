<!-- Modal Tambah Bagian -->
    <div id="modalEditAktivitas" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Aktivitas</h3>

            <select
                    id="editAktivitasBagianId"
                    name="bagian_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Bagian</option>
                </select>

             <input
                type="text"
                placeholder="No Wbs"
                id="editAktivitasNoWbs"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Nama"
                id="editAktivitasNama"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="hidden"
                id="editAktivitasId">

            <div class="flex gap-2">
                <button onclick="closeEditAktivitasModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updateAktivitas()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Edit
                </button>
            </div>
        </div>
    </div>





