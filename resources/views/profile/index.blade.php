<x-layouts.main title="Profil Saya">
    <x-slot name="pageTitle">Profil Saya</x-slot>

    @if(session('success'))
    <div
        x-data="{ show: true }"
        x-show="show"
        x-transition.opacity.duration.500ms
        x-init="setTimeout(() => show = false, 3000)"
        class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg alert"
    >
         {{ session('success') }}
    </div>
    @endif

    @if(session('error'))
    <div
        x-data="{ show: true }"
        x-show="show"
        x-transition.opacity.duration.500ms
        x-init="setTimeout(() => show = false, 3000)"
        class="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg alert"
    >
         {{ session('error') }}
    </div>
    @endif

    @if(Auth::user()->role === 'admin')
   <p class="bg-green-100 border border-green-400 text-green-700 text-center px-4 py-3 rounded mb-6">Anda login sebagai Admin</p>
@else
   <p class="bg-green-100 border border-green-400 text-green-700 text-center px-4 py-3 rounded mb-6">Anda login sebagai User</p>
@endif

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Profile Display Card --}}
        <div class="lg:col-span-3">
            <div class="bg-white p-8 rounded-xl shadow-md">
                <h3 class="text-lg font-semibold text-gray-700 mb-6 text-center">Foto Profil</h3>

                <div class="flex flex-col items-center">
                    <div class="relative">
                       <img src="{{ $userProfile->foto ? asset('storage/'.$userProfile->foto) : asset('storage/images/default.jpg') }}"
                            alt="Foto Profil"
                            class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                            id="profileImagePreview">
                    </div>

                    <div class="mt-4 text-center">
                        <h4 class="text-xl font-semibold text-gray-800">{{ $userProfile->nama_lengkap ?: 'Nama Belum Diisi' }}</h4>
                        <p class="text-gray-600">{{ $userProfile->nrp ?: 'NRP Belum Diisi' }}</p>
                        <p class="text-sm text-gray-500 mt-2">{{ $userProfile->alamat ?: 'Alamat Belum Diisi' }}</p>
                    </div>

                     <div class="flex justify-end space-x-3 pt-6">
                        <a href="{{ route('dashboard') }}"
                           class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                            Batal
                        </a>
                       <a href="{{ route('profile.edit') }}"
                        class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                        Update Profil
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/userprofile/userprofile.js') }}"></script>
    <script src="{{ asset('js/userprofile/userprofile-edit.js') }}"></script>


</x-layouts.main>
