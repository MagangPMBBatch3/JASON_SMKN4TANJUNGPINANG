<x-layouts.main title="Data Status">
    <div class="bg-white p-4 rounded shadow w-full">
        <h1 class="text-2xl font-bold mb-4">Data Status</h1>

        <div class = "flex justify-between mb-4">
            <input type="text" id="search" placeholder="Cari ID atau Nama..."
                class="border p-2 rounded w-64" oninput="searchBagian()">
            <button onclick="openAddStatusModal()"
                class="bg-blue-500 text-white px-4 py-2 rounded">
                Tambah Data
            </button>
        </div>

        <table class ="w-full border">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">Status</th>
                    <th class="p-2 border">Aksi</th>
                </tr>
            </thead>
            <tbody id="dataStatus"></tbody>
        </table>
    </div>

    @include('components.status.modal-add')

    @include('components.status.modal-edit')

    <script src="{{ asset('js/status/status.js') }}"></script>
    <script src="{{ asset('js/status/status-create.js') }}"></script>
    <script src="{{ asset('js/status/status-edit.js') }}"></script>
</x-layouts.main>
