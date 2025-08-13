<x-layouts.auth title="Login">

    <form action="/login" method="POST" class="bg-white p-6 rounded shadow-md w-96">
    @csrf
    <h1 class="text-2x1 font-bold mb-4 text-center">PROJECT LARAVEL GRAPHQL</h1>

    @if ($errors->any())
    <div class="bg-red-100 text-red-700 p-2 rounded mb-4">
        {{ $errors->first() }}
    </div>
    @endif


<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login HTML AND CSS</title>

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="{{ asset('css/style.css')}}">


</head>
<body>
    <div class="container">
    <div class = "wrapper" >
        <form action ="">
            <h1>LOGIN</h1>
            <div class = "input-box">
                <input type = "text" name="email" placeholder="Email"
                required>
                <i class='bx bxs-user' ></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="Password"
                required>
                <i class='bx bxs-lock-alt' ></i>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox"> Remember me</label>
                <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" class="btn">Login</button>
<div class="register-link">
    <p>Don't have an account? <a
        href="#">Register</a>
    </p>
</div>
        </form>
    </div>
       </div>

</body>
</html>
</form>
</x-layouts.auth>


