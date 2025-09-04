@props([
    'color' => 'blue',   // default warna biru
    'type' => 'button',  // default button
])

@php
    $baseClasses = "px-4 py-2 rounded text-white focus:outline-none";
    $colors = [
        'blue' => 'bg-blue-500 hover:bg-blue-600',
        'green' => 'bg-green-500 hover:bg-green-600',
        'red' => 'bg-red-500 hover:bg-red-600',
        'yellow' => 'bg-yellow-500 hover:bg-yellow-600',
        'gray' => 'bg-gray-500 hover:bg-gray-600',
    ];
    $btnClass = $colors[$color] ?? $colors['blue'];
@endphp

<button type="{{ $type }}" {{ $attributes->merge(['class' => "$baseClasses $btnClass"]) }}>
    {{ $slot }}
</button>
