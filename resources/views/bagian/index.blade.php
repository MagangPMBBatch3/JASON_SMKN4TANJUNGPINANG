<x-layouts.main title="Data Bagian">
     <x-slot name="pageTitle">Daftar Bagian</x-slot>
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Bagian</h1>

        <div class = "flex justify-between mb-4">
            <input type="text" id="search" placeholder="Cari ID atau Nama..."
                class="border p-2 rounded w-64" oninput="searchBagian()">
            <x-button color="blue" onclick="openAddModal()">
                Tambah Data
            </x-button>
        </div>

       {{-- Table Aktif --}}
<x-table :headers="['ID', 'Nama', 'Aksi']" tbodyId="dataBagian" id="tableAktif" />


    @include('components.bagian.modal-add')

    @include('components.bagian.modal-edit')

    <script src="{{ asset('js/bagian/bagian.js') }}"></script>
    <script src="{{ asset('js/bagian/bagian-create.js') }}"></script>
    <script src="{{ asset('js/bagian/bagian-edit.js') }}"></script>
</x-layouts.main>
