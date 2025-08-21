<x-layouts.main title="Profil Saya">
    <x-slot name="pageTitle">Profil Saya</x-slot>

    {{-- Success Message --}}
    @if(session('success'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                {{ session('success') }}
            </div>
        </div>
    @endif

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- Profile Display Card --}}
        <div class="lg:col-span-1">
            <div class="bg-white p-8 rounded-xl shadow-md">
                <h3 class="text-lg font-semibold text-gray-700 mb-6 text-center">Foto Profil</h3>

                <div class="flex flex-col items-center">
                    <div class="relative">
                       <img src="{{ $userProfile->foto ? asset('storage/'.$userProfile->foto) : asset('storage/images/default.jpg') }}"
                            alt="Foto Profil"
                            class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                            id="profileImagePreview">

                        <label for ="foto-upload" class="absolute bottom-0 right-0 bg-blue-500 cursor-pointer text-white transition transform hover:scale-125 p-2 rounded-full">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </label>
                    </div>

                    <div class="mt-4 text-center">
                        <h4 class="text-xl font-semibold text-gray-800">{{ $userProfile->nama_lengkap ?: 'Nama Belum Diisi' }}</h4>
                        <p class="text-gray-600">{{ $userProfile->nrp ?: 'NRP Belum Diisi' }}</p>
                        <p class="text-sm text-gray-500 mt-2">{{ $userProfile->alamat ?: 'Alamat Belum Diisi' }}</p>
                    </div>
                </div>
            </div>
        </div>

        {{-- Update Form --}}
        <div class="lg:col-span-2">
            <div class="bg-white p-6 rounded-xl shadow-md">
                <h3 class="text-lg font-semibold text-gray-700 mb-6">Update Profil</h3>

                <form id="profileForm" action="{{ route('userprofile.update') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" name="nama_lengkap" value="{{ $userProfile->nama_lengkap ?? '' }}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                   placeholder="Masukkan nama lengkap">
                            @error('nama_lengkap')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">NRP</label>
                            <input type="text" name="nrp" value="{{ $userProfile->nrp ?? '' }}"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                   placeholder="Masukkan NRP">
                            @error('nrp')
                                <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                        <textarea name="alamat" rows="3"
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                  placeholder="Masukkan alamat lengkap">{{ $userProfile->alamat ?? '' }}</textarea>
                        @error('alamat')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Foto Profil</label>
                        <div class="flex items-center justify-center w-full">
                            <label for="foto-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500">
                                        <span class="font-semibold">Klik untuk upload</span> atau drag & drop
                                    </p>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF, BMP, WEBP hingga 5MB</p>
                                </div>
                                <input id="foto-upload" type="file" name="foto" accept="image/*" class="hidden" onchange="previewImage(this)">
                            </label>
                        </div>

                        @if($userProfile->foto)
                            <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">File saat ini:</span>
                                    <span class="text-blue-600">{{ basename($userProfile->foto) }}</span>
                                </p>
                            </div>
                        @endif

                        @error('foto')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="flex justify-end space-x-3 pt-6">
                        <a href="{{ route('dashboard') }}"
                           class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                            Batal
                        </a>
                        <button type="submit"
                                class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                            Update Profil
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function previewImage(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profileImagePreview').src = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
    <script src="{{ asset('js/userprofile/userprofile.js') }}"></script>
    <script src="{{ asset('js/userprofile/userprofile-edit.js') }}"></script>
</x-layouts.main>
