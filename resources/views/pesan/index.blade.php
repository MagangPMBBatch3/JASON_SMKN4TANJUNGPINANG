<x-layouts.main title="Data Pesan">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Pesan</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchPesan" placeholder="Cari ID atau Nama..."
                class="border p-2 rounded w-64" oninput="searchPesan()">
            <x-button color="blue" onclick="openAddPesanModal()">
                Tambah Data
            </x-button>
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

    {{-- Table Aktif --}}
<x-table :headers="['ID', 'Pengirim', 'Penerima', 'Isi', 'Parent ID', 'Tanggal', 'Jenis ID', 'Aksi']" tbodyId="dataPesan" id="tableAktif" />

{{-- Table Arsip --}}
<x-table :headers="['ID', 'Pengirim', 'Penerima', 'Isi', 'Parent ID', 'Tanggal', 'Jenis ID', 'Aksi']" tbodyId="dataPesanArsip" id="tableArsip" class="hidden" />


    @include('components.Pesan.modal-add')
    @include("components.Pesan.modal-edit")

    <script src="{{ asset('js/Pesan/Pesan.js') }}"></script>
    <script src="{{ asset('js/Pesan/Pesan-create.js') }}"></script>
    <script src="{{ asset('js/Pesan/Pesan-edit.js') }}"></script>

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
