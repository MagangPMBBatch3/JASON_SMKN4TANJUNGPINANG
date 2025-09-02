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

   {{-- TABEL AKTIF --}}
        <div id="tableAktif" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @if($jamkerjasAktif->isEmpty())
                <div class="col-span-3 text-center text-gray-500 p-4">Tidak ada data</div>
            @else
                @foreach($jamkerjasAktif as $jamkerja)
                    <div class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center relative group">
                        <button onclick="archiveJamKerja({{ $jamkerja->id }})"
                                class="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                title="Arsipkan">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div class="relative">
                            <img src="{{ $jamkerja->users_profile && $jamkerja->users_profile->foto
                                        ? asset('storage/'.$jamkerja->users_profile->foto)
                                        : asset('storage/images/default.jpg') }}"
                                alt="Foto {{ $jamkerja->users_profile->nama_lengkap ?? '-' }}"
                                class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg">
                        </div>
                        <div class="mt-4 text-center">
                            <h4 class="text-lg font-semibold text-gray-800">
                                {{ $jamkerja->users_profile->nama_lengkap ?? '-' }}
                            </h4>

                            <p class="text-gray-600">
                                No Wbs: {{ $jamkerja->no_wbs}}
                            </p>
                            <p class="text-gray-600">
                                Kode Proyek: {{ $jamkerja->kode_proyek}}
                            </p>
                             <p class="text-gray-600">
                                Proyek: {{ $jamkerja->proyek->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Aktivitas: {{ $jamkerja->aktivitas->nama ?? '-' }}
                            </p>
                             <p class="text-gray-600">
                                Tanggal: {{ $jamkerja->tanggal }}
                            </p>
                             <p class="text-gray-600">
                                Jumlah Jam: {{ $jamkerja->jumlah_jam }}
                            </p>
                            <p class="text-gray-600">
                                Keterangan: {{ $jamkerja->keterangan }}
                            </p>
                            <p class="text-gray-600">
                                Status Jam Kerja: {{ $jamkerja->status_jam_kerja->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Mode Jam Kerja: {{ $jamkerja->mode_jam_kerja->nama ?? '-' }}
                            </p>

                        </div>
                    </div>
                @endforeach
            @endif
        </div>

        {{-- TABEL ARSIP --}}
        <div id="tableArsip" class="hidden grid grid-cols-1 md:grid-cols-3 gap-6">
            @if($jamkerjasArsip->isEmpty())
                <div class="col-span-3 text-center text-gray-500 p-4">Tidak ada data</div>
            @else
                @foreach($jamkerjasArsip as $jamkerja)
                    <div class="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col items-center relative group">
                        <div class="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <button onclick="restoreJamKerja({{ $jamkerja->id }})"
                                    class="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                    title="Restore">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </button>
                            <button onclick="forceDeleteJamKerja({{ $jamkerja->id }})"
                                    class="bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                    title="Hapus Permanen">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="relative">
                            <img src="{{ $jamkerja->users_profile && $jamkerja->users_profile->foto
                                        ? asset('storage/'.$jamkerja->users_profile->foto)
                                        : asset('storage/images/default.jpg') }}"
                                alt="Foto {{ $jamkerja->users_profile->nama_lengkap ?? '-' }}"
                                class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg">
                        </div>
                        <div class="mt-4 text-center">
                            <h4 class="text-lg font-semibold text-gray-800">
                                {{ $jamkerja->users_profile->nama_lengkap ?? '-' }}
                            </h4>
                            <p class="text-gray-600">
                                Proyek: {{ $jamkerja->proyek->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                No Wbs: {{ $jamkerja->no_wbs}}
                            </p>
                            <p class="text-gray-600">
                                Kode Proyek: {{ $jamkerja->kode_proyek}}
                            </p>
                            <p class="text-gray-600">
                                Aktivitas: {{ $jamkerja->aktivitas->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Status Jam Kerja: {{ $jamkerja->status_jam_kerja->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Mode Jam Kerja: {{ $jamkerja->mode_jam_kerja->nama ?? '-' }}
                            </p>
                            <p class="text-gray-600">
                                Tanggal: {{ $jamkerja->tanggal }}
                            </p>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
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
