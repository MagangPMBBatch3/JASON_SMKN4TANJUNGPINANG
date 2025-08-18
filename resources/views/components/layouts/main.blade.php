<!DOCTYPE html>
<head>
    <title>{{ $title ?? 'Dashbooard' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
     <script>
        function toggleMenu(id, iconId) {
            document.getElementById(id).classList.toggle('hidden');
            document.getElementById(iconId).classList.toggle('rotate-180');
        }
    </script>
</head>
<body class="bg-gray-100 flex">
    {{-- sidebar --}}
    <aside class="w-64 bg-blue-600 text-white p-5 min-h-screen">
        <h2 class="text-x1 font-bold mb-6">Menu</h2>
        <ul>
            <li><a href="/dashboard" class="block py-2 hover:bg-blue-500 rounded px-2">Dashboard</a></li>

           {{-- Master Data Dropdown --}}
            <li class="mt-3 mb-2">
                <button type="button"
                        onclick="toggleMenu('masterDataMenu','masterArrow')"
                        class="w-full flex items-center justify-between p-2 rounded hover:bg-gray-700">
                    <span>Master Data</span>
                    <svg id="masterArrow" xmlns="http://www.w3.org/2000/svg"
                         class="h-4 w-4 transform transition-transform duration-200"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <ul id="masterDataMenu" class="ml-4 mt-2 space-y-1 hidden">
            <li class="mb-2"><a href="{{ route('bagian') }}" class="block p-2 rounded hover:bg-gray-700">Bagian</a></li>
            <li class="mb-2"><a href="{{ route('level') }}" class="block p-2 rounded hover:bg-gray-700">Level</a></li>
            <li class="mb-2"><a href="{{ route('status') }}" class="block p-2 rounded hover:bg-gray-700">Status</a></li>
            <li class="mb-2"><a href="{{ route('user') }}" class="block p-2 rounded hover:bg-gray-700">User</a></li>
            <li class="mb-2"><a href="{{ route('proyek') }}" class="block p-2 rounded hover:bg-gray-700">Proyek</a></li>
            <li class="mb-2"><a href="{{ route('jenis_pesan') }}" class="block p-2 rounded hover:bg-gray-700">Jenis Pesan</a></li>
            <li class="mb-2"><a href="{{ route('mode_jam_kerja') }}" class="block p-2 rounded hover:bg-gray-700">Mode Jam Kerja</a></li>
            <li class="mb-2"><a href="{{ route('status_jam_kerja') }}" class="block p-2 rounded hover:bg-gray-700">Status Jam Kerja</a></li>
            <li>
            </li>
        </ul>
    </ul>

    <form action="/logout" method="POST">
        @csrf
        <button type="submit" class="w-full text-left py-2 hover:bg-red-500 rounded px-2">Logout</button>
    </form>
 </aside>

    {{-- Main Content --}}

    <div class="flex-1 p-6">
        @include('components.navbar')
        {{ $slot }}
    </div>
</body>
</html>
