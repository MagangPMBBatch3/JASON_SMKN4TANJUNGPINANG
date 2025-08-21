<!-- Modal Tambah Bagian -->
    <div id="modalAddPesan" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Tambah Pesan</h3>

           <input
                type="text"
                placeholder="Pengirim"
                id="addPesanPengirim"
                class="w-full px-4 py-2 border rounded mb-4"
            >

             <input
                type="text"
                placeholder="Penerima"
                id="addPesanPenerima"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Isi"
                id="addPesanIsi"
                class="w-full px-4 py-2 border rounded mb-4"
            >

            <input
                type="text"
                placeholder="Parent ID"
                id="addPesanParentId"
                class="w-full px-4 py-2 border rounded mb-4"
            >

             <input
                type="datetime-local"
                placeholder="Tanggal Pesan"
                id="addPesanTglPesan"
                class="w-full px-4 py-2 border rounded mb-4"
            >

             <select
                    id="addPesanJenisId"
                    name="jenis_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Jenis Pesan</option>
                </select>


            <div class="flex gap-2">
                <button onclick="closeAddPesanModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="createPesan()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






