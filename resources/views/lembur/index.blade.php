<x-layouts.main title="Daftar Lembur">
    <x-slot name="pageTitle">Daftar Lembur</x-slot>

    <div class="container">
        <h2 class="mb-6 text-2xl font-semibold">Daftar Lembur</h2>

        <div class="flex justify-between mb-4">
            <input type="text" id="searchLembur" placeholder="Cari ID atau Nama..."
                class="border p-2 rounded w-64" oninput="searchLembur()">
            <x-button color="blue" onclick="openAddLemburModal()">
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

        {{-- TABEL AKTIF --}}
        <div id="tableAktif" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @if($lembursAktif->isEmpty())
                <div class="col-span-3 text-center text-gray-500 p-4">Tidak ada data</div>
            @else
                @foreach($lembursAktif as $lembur)
                    <div class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center relative group">
                        <button onclick="archiveLembur({{ $lembur->id }})"
                                class="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                title="Arsipkan">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="relative">
                            <img src="{{ $lembur->users_profile && $lembur->users_profile->foto
                                        ? asset('storage/'.$lembur->users_profile->foto)
                                        : asset('storage/images/default.jpg') }}"
                                alt="Foto {{ $lembur->users_profile->nama_lengkap ?? '-' }}"
                                class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg">
                        </div>
                        <div class="mt-4 text-center">
                            <h4 class="text-lg font-semibold text-gray-800">
                                {{ $lembur->users_profile->nama_lengkap ?? '-' }}
                            </h4>
                            <p class="text-gray-600">
                                Proyek: {{ $lembur->proyek->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Tanggal: {{ $lembur->tanggal }}
                            </p>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>

        {{-- TABEL ARSIP --}}
        <div id="tableArsip" class="hidden grid grid-cols-1 md:grid-cols-3 gap-6">
            @if($lembursArsip->isEmpty())
                <div class="col-span-3 text-center text-gray-500 p-4">Tidak ada data</div>
            @else
                @foreach($lembursArsip as $lembur)
                    <div class="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col items-center relative group">
                        <div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <button onclick="restoreLembur({{ $lembur->id }})"
                                    class="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                    title="Restore">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </button>
                            <button onclick="forceDeleteLembur({{ $lembur->id }})"
                                    class="bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                    title="Hapus Permanen">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="relative">
                            <img src="{{ $lembur->users_profile && $lembur->users_profile->foto
                                        ? asset('storage/'.$lembur->users_profile->foto)
                                        : asset('storage/images/default.jpg') }}"
                                alt="Foto {{ $lembur->users_profile->nama_lengkap ?? '-' }}"
                                class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg">
                        </div>
                        <div class="mt-4 text-center">
                            <h4 class="text-lg font-semibold text-gray-800">
                                {{ $lembur->users_profile->nama_lengkap ?? '-' }}
                            </h4>
                            <p class="text-gray-600">
                                Proyek: {{ $lembur->proyek->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Tanggal: {{ $lembur->tanggal }}
                            </p>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>

    @include('components.Lembur.modal-add')
    @include('components.Lembur.modal-edit')

    <script src="{{ asset('js/lembur/lembur.js') }}"></script>
    <script src="{{ asset('js/lembur/lembur-create.js') }}"></script>
    <script src="{{ asset('js/lembur/lembur-edit.js') }}"></script>

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
