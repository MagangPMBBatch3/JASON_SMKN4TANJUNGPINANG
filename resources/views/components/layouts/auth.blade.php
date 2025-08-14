<!DOCTYPE html>
<html>
<head>
    <title>{{ $title ?? 'Login' }}</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    {{ $slot }}

</body>
</html>
