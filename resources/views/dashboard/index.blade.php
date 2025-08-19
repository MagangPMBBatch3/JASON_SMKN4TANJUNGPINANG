<x-layouts.main title="Dashboard">
    <x-slot name="pageTitle">Dashboard</x-slot>

    <div class="bg-white p-6 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-gray-800">Selamat Datang 🎉</h2>
        <p class="text-gray-600 mt-1">Anda login sebagai <strong>{{ Auth::user()->nama }}</strong></p>
    </div>

    <div class="mt-6">
        {{-- Profile Card Only --}}
        <div class="bg-white p-6 rounded-xl shadow-md max-w-md">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Profil Anda</h3>

            @if($userProfile)
                <div class="flex items-center gap-4">
                    <img src="{{ $userProfile->foto ? asset('storage/'.$userProfile->foto) : asset('images/default.jpg') }}"
                         alt="Foto Profil" width="150"
                         class="w-20 h-20 rounded-full object-cover border-2 border-gray-200">

                    <div>
                        <p><span class="font-semibold">Nama:</span> {{ $userProfile->nama_lengkap ?: '-' }}</p>
                        <p><span class="font-semibold">NRP:</span> {{ $userProfile->nrp ?: '-' }}</p>
                        <p><span class="font-semibold">Alamat:</span> {{ $userProfile->alamat ?: '-' }}</p>
                    </div>
                </div>

                <div class="mt-4">
                    <a href="{{ route('profile') }}"
                       class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit Profil
                    </a>
                </div>
            @else
                <div class="flex items-center gap-4">
                    <img src="{{ asset('images/default.jpg') }}"
                         alt="Foto Profil"
                         class="w-20 h-20 rounded-full object-cover border-2 border-gray-200">

                    <div>
                        <p><span class="font-semibold">Nama:</span> -</p>
                        <p><span class="font-semibold">NRP:</span> -</p>
                        <p><span class="font-semibold">Alamat:</span> -</p>
                        <p class="text-sm text-gray-500 mt-2">Profil belum dibuat.</p>
                    </div>
                </div>

                <div class="mt-4">
                    <a href="{{ route('profile') }}"
                       class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition duration-200">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Buat Profil
                    </a>
                </div>
            @endif
        </div>
    </div>
</x-layouts.main>
