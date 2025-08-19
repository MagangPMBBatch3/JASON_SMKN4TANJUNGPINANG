<x-layouts.auth title="Register">
    <div class="container">
        <div class="wrapper">
            @if ($errors->any())
                <div class="bg-red-100 text-red-700 p-2 rounded mb-4">
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="/register" method="POST">
                @csrf
                <h1>REGISTER</h1>
                <div class="input-box">
                    <input type="text" name="nama" placeholder="Nama" required autocomplete="off">
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="text" name="email" placeholder="Email" required autocomplete="off">
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="password" name="password" placeholder="Password" required autocomplete="off">
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox"> Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" class="btn">Register</button>

            </form>
        </div>
    </div>
</x-layouts.auth>
