<!DOCTYPE html>
<head>
    <title>{{ $title ?? 'Dashboard' }}</title>
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
        <h2 class="text-xl font-bold mb-6">Menu</h2>
        <ul>
            <li>
                <a href="/dashboard"
                   class="block py-2 hover:bg-blue-500 rounded px-2 {{ request()->is('dashboard') ? 'bg-blue-500' : '' }}">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v6H8V5z"></path>
                        </svg>
                        Dashboard
                    </div>
                </a>
            </li>

            {{-- Profile Menu --}}
            <li class="mt-2">
                <a href="{{ route('profile') }}"
                   class="block py-2 hover:bg-blue-500 rounded px-2 {{ request()->routeIs('profile') ? 'bg-blue-500' : '' }}">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Profil Saya
                    </div>
                </a>
            </li>

           {{-- Master Data Dropdown --}}
            <li class="mt-4 mb-2">
                <button type="button"
                        onclick="toggleMenu('masterDataMenu','masterArrow')"
                        class="w-full flex items-center justify-between p-2 rounded hover:bg-blue-500">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <span>Master Data</span>
                    </div>
                    <svg id="masterArrow" xmlns="http://www.w3.org/2000/svg"
                         class="h-4 w-4 transform transition-transform duration-200"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <ul id="masterDataMenu" class="ml-4 mt-2 space-y-1 hidden">
                    <li class="mb-2">
                        <a href="{{ route('bagian') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('bagian') ? 'bg-blue-500' : '' }}">
                            Bagian
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('level') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('level') ? 'bg-blue-500' : '' }}">
                            Level
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('status') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('status') ? 'bg-blue-500' : '' }}">
                            Status
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('user') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('user') ? 'bg-blue-500' : '' }}">
                            User
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('proyek') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('proyek') ? 'bg-blue-500' : '' }}">
                            Proyek
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('jenis_pesan') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('jenis_pesan') ? 'bg-blue-500' : '' }}">
                            Jenis Pesan
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('mode_jam_kerja') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('mode_jam_kerja') ? 'bg-blue-500' : '' }}">
                            Mode Jam Kerja
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="{{ route('status_jam_kerja') }}"
                           class="block p-2 rounded hover:bg-blue-500 text-sm {{ request()->routeIs('status_jam_kerja') ? 'bg-blue-500' : '' }}">
                            Status Jam Kerja
                        </a>
                    </li>
                </ul>
            </li>
        </ul>

        {{-- Logout Button --}}
        <div class="absolute bottom-5 left-5 right-5">
            <form action="/logout" method="POST">
                @csrf
                <button type="submit" class="flex items-center justify-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                </button>
            </form>
        </div>
    </aside>

    {{-- Main Content --}}
    <div class="flex-1 p-6">
        @include('components.navbar')
        {{ $slot }}
    </div>
</body>
</html>
