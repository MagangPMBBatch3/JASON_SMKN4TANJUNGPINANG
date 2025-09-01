<x-layouts.main title="Data Jam Kerja">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Jam Kerja</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchJamKerja" placeholder="Cari ID atau Nama..."
                class="border p-2 rounded w-64" oninput="searchJamKerja()">
            <button onclick="openAddJamKerjaModal()"
                class="bg-blue-500 text-white px-4 py-2 rounded">
                Tambah Data
            </button>
        </div>

        <div class="mb-4">
            <button onclick="showTab('aktif')" id="tabAktif"
                class="px-4 py-2 bg-blue-500 text-white rounded-t">
            Data Aktif
            </button>
            <button onclick="showTab('arsip')" id="tabArsip"
                class="px-4 py-2 bg-blue-300 text-black rounded-t">
            Data Arsip
            </button>
        </div>

    <div id="tableAktif" class="overflow-x-auto">
        <table class="w-full border">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">User Profile</th>
                    <th class="p-2 border">No Wbs</th>
                    <th class="p-2 border">Kode Proyek</th>
                    <th class="p-2 border">Proyek ID</th>
                    <th class="p-2 border">Aktivitas ID</th>
                    <th class="p-2 border">Tanggal</th>
                    <th class="p-2 border">Jumlah Jam</th>
                    <th class="p-2 border">Keterangan</th>
                    <th class="p-2 border">Status ID</th>
                    <th class="p-2 border">Mode ID</th>
                    <th class="p-2 border">Aksi</th>
                </tr>
            </thead>
            <tbody id="dataJamKerja"></tbody>
        </table>
    </div>

    <div id="tableArsip" class="hidden overflow-x-auto">
        <table class="w-full border">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">User Profile</th>
                    <th class="p-2 border">No Wbs</th>
                    <th class="p-2 border">Kode Proyek</th>
                    <th class="p-2 border">Proyek ID</th>
                    <th class="p-2 border">Aktivitas ID</th>
                    <th class="p-2 border">Tanggal</th>
                    <th class="p-2 border">Jumlah Jam</th>
                    <th class="p-2 border">Keterangan</th>
                    <th class="p-2 border">Status ID</th>
                    <th class="p-2 border">Mode ID</th>
                    <th class="p-2 border">Aksi</th>
                </tr>
            </thead>
            <tbody id="dataJamKerjaArsip"></tbody>
        </table>
    </div>

    @include('components.JamKerja.modal-add')
    @include("components.JamKerja.modal-edit")

    <script src="{{ asset('js/JamKerja/JamKerja.js') }}"></script>
    <script src="{{ asset('js/JamKerja/JamKerja-create.js') }}"></script>
    <script src="{{ asset('js/JamKerja/JamKerja-edit.js') }}"></script>

    <script>
        function showTab(tab) {
            const tabAktif = document.getElementById('tabAktif');
            const tabArsip = document.getElementById('tabArsip');
            const tableAktif = document.getElementById('tableAktif');
            const tableArsip = document.getElementById('tableArsip');

            if (tab === 'aktif') {
                tabAktif.classList.add('bg-blue-500', 'text-white');
                tabAktif.classList.remove('bg-blue-300', 'text-black');
                tabArsip.classList.remove('bg-blue-500', 'text-white');
                tabArsip.classList.add('bg-blue-300', 'text-black');
                tableAktif.classList.remove('hidden');
                tableArsip.classList.add('hidden');
            } else {
                tabArsip.classList.add('bg-blue-500', 'text-white');
                tabArsip.classList.remove('bg-blue-300', 'text-black');
                tabAktif.classList.remove('bg-blue-500', 'text-white');
                tabAktif.classList.add('bg-blue-300', 'text-black');
                tableArsip.classList.remove('hidden');
                tableAktif.classList.add('hidden');
            }
        }
    </script>
</x-layouts.main>
