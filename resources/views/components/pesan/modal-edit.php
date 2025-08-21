<!-- Modal Tambah Bagian -->
    <div id="modalEditPesan" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Pesan</h3>

            <input
                type="text"
                placeholder="Edit Pengirim"
                id="editPesanPengirim"
                class="w-full px-4 py-2 border rounded mb-4"
            >

             <input
                type="text"
                placeholder="Penerima"
                id="editPesanPenerima"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Isi"
                id="editPesanIsi"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Parent ID"
                id="editPesanParentId"
                class="w-full px-4 py-2 border rounded mb-4"
            >



             <input
                type="datetime-local"
                placeholder="Tanggal Pesan"
                id="editPesanTglPesan"
                class="w-full px-4 py-2 border rounded mb-4"
            >

             <select
                    id="editPesanJenisId"
                    name="jenis_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Jenis Pesan</option>
                </select>

            <input
                type="hidden"
                id="editPesanId">

            <div class="flex gap-2">
                <button onclick="closeEditPesanModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updatePesan()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Edit
                </button>
            </div>
        </div>
    </div>





