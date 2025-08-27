<x-layouts.main title="Dashboard">

   {{-- Welcome Card --}}
    <div class="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Selamat Datang 🎉</h2>
        <p class="text-gray-600 mt-1">Anda login sebagai <strong>{{ Auth::user()->nama }}</strong></p>
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



