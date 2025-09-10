<x-layouts.main title="Data Level">
     <x-slot name="pageTitle">Daftar Level</x-slot>
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Level</h1>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchLevel" placeholder="Cari ID atau Nama..."
                class="border p-2 rounded w-64" oninput="searchLevel()">
            <x-button color="blue" onclick="openAddLevelModal()">
                Tambah Data
            </x-button>
        </div>

        <div class="mb-4">
            <button onclick="showTab('aktif')" id="tabAktif"
                class="px-4 py-2 bg-blue-500 text-white rounded-t">
            Data Aktif
            </button>
            <button onclick="showTab('arsip')" id="tabArsip"
                class="px-4 py-2 bg-blue-500 text-black rounded-t">
            Data Arsip
            </button>
        </div>

    {{-- Table Aktif --}}
<x-table :headers="['ID', 'Nama', 'Aksi']" tbodyId="dataLevel" id="tableAktif" />

{{-- Table Arsip --}}
<x-table :headers="['ID', 'Nama', 'Aksi']" tbodyId="dataLevelArsip" id="tableArsip" class="hidden" />



    @include('components.level.modal-add')

    @include("components.level.modal-edit")

    <script src="{{ asset('js/level/level.js') }}"></script>
    <script src="{{ asset('js/level/level-create.js') }}"></script>
    <script src="{{ asset('js/level/level-edit.js') }}"></script>

    <script>
        function showTab(tab) {
            const tabAktif = document.getElementById('tabAktif');
            const tabArsip = document.getElementById('tabArsip');
            const tableAktif = document.getElementById('tableAktif');
            const tableArsip = document.getElementById('tableArsip');

            if (tab === 'aktif') {
                tabAktif.classList.add('bg-blue-500', 'text-white');
                tabAktif.classList.remove('bg-gray-300', 'text-black');
                tabArsip.classList.remove('bg-blue-500', 'text-white');
                tabArsip.classList.add('bg-blue-300', 'text-black');
                tableAktif.classList.remove('hidden');
                tableArsip.classList.add('hidden');
            } else {
                tabArsip.classList.add('bg-blue-500', 'text-white');
                tabArsip.classList.remove('bg-gray-300', 'text-black');
                tabAktif.classList.remove('bg-blue-500', 'text-white');
                tabAktif.classList.add('bg-gray-300', 'text-black');
                tableArsip.classList.remove('hidden');
                tableAktif.classList.add('hidden');


            }
        }
    </script>

</x-layouts.main>
