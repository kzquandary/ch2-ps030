<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kulinerin - Majukan UMKM Mu">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <meta name="theme-color" content="#0134d4">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <!-- Title -->
    <title>Kulinerin - Majukan UMKM Mu</title>

    <!-- Favicon -->
    <link rel="icon" href="img/core-img/favicon.ico">
    <!-- Style CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10">

    <!-- Web App Manifest -->
    <link rel="manifest" href="manifest.json">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>


<body>
    <!-- Preloader -->
    <div id="preloader">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <!-- Internet Connection Status -->
    <div class="internet-connection-status" id="internetStatus"></div>

    <!-- Back Button -->
    {{-- <div class="login-back-button">
    <a href="login.html">
      <i class="bi bi-arrow-left-short"></i>
    </a>
  </div> --}}

    <!-- Login Wrapper Area -->
    <div class="login-wrapper d-flex align-items-center justify-content-center">
        <div class="custom-container">
            <div class="text-center px-4">
                <img class="login-intro-img" src="img/bg-img/36.png" alt="">
            </div>

            <!-- Register Form -->
            <div class="register-form mt-4">
                <h6 class="mb-3 text-center">Daftar Kulinerin</h6>

                <form action="/register" method="POST" enctype="application/json" >
                    @csrf
                    <div class="form-group text-start mb-3">
                        <input class="form-control" type="text" name="nama" placeholder="Nama UMKM">
                    </div>
                    <div class="form-group text-start mb-3">
                        <input class="form-control" type="text" name="owner" placeholder="Pemilik UMKM">
                    </div>
                    <div class="form-group text-start mb-3">
                        <input class="form-control" type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group text-start mb-3">
                        <input class="form-control" type="text" name="username" placeholder="Username">
                    </div>
                    <div class="form-group text-start mb-3">
                        <input class="form-control" type="number" name="no_hp" placeholder="Nomor Handphone">
                    </div>

                    <div class="form-group text-start mb-3 position-relative">
                        <input class="form-control" name="password" id="psw-input" type="password"
                            placeholder="Password">
                        <div class="position-absolute" id="password-visibility">
                            <i class="bi bi-eye"></i>
                            <i class="bi bi-eye-slash"></i>
                        </div>
                    </div>
                    <div class="mb-3" id="pswmeter"></div>
                    <div class="form-group text-start mb-3">
                        <textarea class="form-control" name="alamat" id="alamat" placeholder="Masukan Alamat"></textarea>
                    </div>
                    <input type="hidden" name="latitude" id="latitude" value="">
                    <input type="hidden" name="longitude" id="longitude" value="">
                    <div class="form-check mb-3">
                        <input class="form-check-input" id="checkedCheckbox" type="checkbox" value="" checked>
                        <label class="form-check-label text-muted fw-normal" for="checkedCheckbox">Saya Setuju dengan
                            Ketentuan & Kebijakan Privasi.</label>
                    </div>

                    <button class="btn btn-primary w-100" type="submit">Daftar</button>
                </form>
            </div>

            <!-- Login Meta -->
            <div class="login-meta-data text-center">
                <p class="mt-3 mb-0">Sudah memiliki akun ? <a class="stretched-link" href="/login">Login</a></p>
            </div>
        </div>
    </div>

    <!-- All JavaScript Files -->
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/internet-status.js"></script>
    <script src="js/dark-rtl.js"></script>
    <script src="js/pswmeter.js"></script>
    <script src="js/active.js"></script>
    <script src="js/pwa.js"></script>
    <script>
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    // Simpan latitude dan longitude dalam cookie
                    document.cookie = "latitude=" + latitude + "; path=/";
                    document.cookie = "longitude=" + longitude + "; path=/";
                    console.log(document.cookie);
                },
                function(error) {
                    console.error("Error getting location: " + error.message);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    </script>
    <script>
        // Fungsi untuk mendapatkan nilai cookie berdasarkan nama
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // Ambil nilai latitude dan longitude dari cookies
        var latitude = getCookie('latitude');
        var longitude = getCookie('longitude');
        // Set nilai input hidden
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
        console.log(latitude);
        console.log(longitude);
    </script>
</body>

</html>
