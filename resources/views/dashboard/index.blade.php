<x-layouts.main title="Dashboard">

    {{-- Welcome Card --}}
   <div class="bg-white p-6 rounded-xl shadow-md mb-6 flex items-center gap-4">

       {{-- Foto Profil --}}
       <div class="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300">
            <img src="{{ $userProfile->foto ? asset('storage/'.$userProfile->foto) : asset('storage/images/default.jpg') }}"
                            alt="Foto Profil"
                            class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                            id="profileImagePreview">
       </div>
        <div class="flex flex-col">
        <h2 class="text-2xl font-bold text-gray-800">Selamat Datang 🎉</h2>
        <p class="text-gray-600 mt-1">Anda login sebagai <strong>{{ Auth::user()->nama }}</strong></p>
    </div>
    </div>

    {{-- Stats Section --}}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-blue-500 cursor-pointer hover:bg-red-300 text-white p-6 rounded-xl shadow-md"onclick="window.location.href='/proyek'">
            <h3 class="text-lg font-semibold">Proyek Dikerjakan</h3>
            <p class="text-3xl font-bold mt-2">{{ $totalProyek }}</p>
        </div>

        <div class="bg-green-500 cursor-pointer hover:bg-red-300 text-white p-6 rounded-xl shadow-md"onclick="window.location.href='/members'">
            <h3 class="text-lg font-semibold">Member Terdaftar</h3>
            <p class="text-3xl font-bold mt-2">{{ $totalUser }}</p>
        </div>

        <div class="bg-purple-500 cursor-pointer hover:bg-red-300 text-white p-6 rounded-xl shadow-md"onclick="window.location.href='/lembur'">
            <h3 class="text-lg font-semibold">Lembur</h3>
            <p class="text-3xl font-bold mt-2">{{ $totalLembur }}</p>
        </div>
    </div>

</x-layouts.main>



