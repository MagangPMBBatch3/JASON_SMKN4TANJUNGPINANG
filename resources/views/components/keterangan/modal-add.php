<!-- Modal Tambah Proyek -->
    <div id="modalAddKeterangan" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Tambah Keterangan</h3>


            <select
                    id="addKeteranganBagianId"
                    name="bagian_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Bagian</option>
                </select>

                <select
                    id="addKeteranganProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>


                <input
                type="datetime-local"
                placeholder="Tanggal"
                id="addKeteranganTanggal"
                class="w-full px-4 py-2 border rounded mb-4"
            >




            <div class="flex gap-2">
                <button onclick="closeAddKeteranganModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="createKeterangan()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






