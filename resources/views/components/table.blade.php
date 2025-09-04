@props([
    'headers' => [],   // array header kolom
    'tbodyId' => 'table-body', // id tbody biar bisa diisi dari JS
])

<div class="overflow-x-auto">
    <table {{ $attributes->merge(['class' => 'w-full border border-gray-300 text-left text-sm']) }}>
        <thead class="bg-gray-200 text-gray-700">
            <tr>
                @foreach ($headers as $header)
                    <th class="p-2 border border-gray-300 font-semibold">
                        {{ $header }}
                    </th>
                @endforeach
            </tr>
        </thead>
        <tbody id="{{ $tbodyId }}"></tbody>
    </table>
</div>
