<div class="bg-white p-4 shadow rounded mb-4 flex justify-between items-center">
    <h1 class="text-x1 font-bold">{{ $pageTitle ?? 'Dashboard' }}</h1>
    <span>Halo, {{ Auth::user()->nama }}</span>
</div>
