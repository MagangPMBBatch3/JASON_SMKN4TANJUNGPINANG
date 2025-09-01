<!-- Modal Tambah Proyek -->
    <div id="modalEditKeterangan" class="fixed inset-0 bg-black bg-opacity-60 flex hidden items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-semibold mb-4">Edit Keterangan</h3>



<select
    id="editKeteranganBagianId"
    name="bagian_id"
    class="w-full px-4 py-2 border rounded mb-4">
    <option value="">Profil User</option>
</select>


                <select
                    id="editKeteranganProyekId"
                    name="proyek_id"
                    class="w-full px-4 py-2 border rounded mb-4">
                    <option value="">Nama Proyek</option>
                </select>



                <input
                type="datetime-local"
                placeholder="Tanggal"
                id="editKeteranganTanggal"
                class="w-full px-4 py-2 border rounded mb-4"
            >




             <input
                type="hidden"
                id="editKeteranganId">





            <div class="flex gap-2">
                <button onclick="closeEditKeteranganModal()" class="px-4 py-2 bg-gray-500 text-white rounded">
                    Batal
                </button>
                <button onclick="updateKeterangan()" class="px-4 py-2 bg-green-500 text-white rounded">
                    Simpan
                </button>
            </div>
        </div>
    </div>






