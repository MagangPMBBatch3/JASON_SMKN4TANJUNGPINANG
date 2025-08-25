<x-layouts.auth title="Register">
    <div class="container">
        <div class="wrapper">
            @if ($errors->any())
                <div class="bg-red-100 text-red-700 p-2 rounded mb-4">
                    {{ $errors->first() }}
                </div>
            @endif

            <form id="registerForm">
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

    <script>
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const query = `
      mutation Register($nama: String!, $email: String!, $password: String!) {
        registerUser(input: { nama: $nama, email: $email, password: $password }) {
          id
          nama
          email
        }
      }
    `;

    const variables = {
        nama: this.nama.value,
        email: this.email.value,
        password: this.password.value
    };

    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    console.log(data);

    if (data.data?.registerUser) {
        window.location.href = "/login"; // redirect ke login setelah sukses
    }
});
</script>
</x-layouts.auth>
