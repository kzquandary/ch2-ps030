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
    <a href="hero-blocks.html">
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
                <h6 class="mb-3 text-center">Login Kulinerin</h6>

                <form action="/login" method="POST" enctype="application/json">
                    @csrf
                    <div class="form-group">
                        <input class="form-control" name="identifier" type="text" id="username"
                            placeholder="Username / Email">
                    </div>

                    <div class="form-group position-relative">
                        <input class="form-control" name="password" id="psw-input" type="password"
                            placeholder="Enter Password">
                        <div class="position-absolute" id="password-visibility">
                            <i class="bi bi-eye"></i>
                            <i class="bi bi-eye-slash"></i>
                        </div>
                    </div>

                    <button class="btn btn-primary w-100" type="submit">Login</button>
                </form>
            </div>

            <!-- Login Meta -->
            <div class="login-meta-data text-center">
                <a class="stretched-link forgot-password d-block mt-3 mb-1">Lupa Password ?</a>
                <p class="mb-0">Belum punya akun ? <a class="stretched-link" href="/register">Daftar Sekarang</a></p>
            </div>
        </div>
    </div>

    <!-- All JavaScript Files -->
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/slideToggle.min.js"></script>
    <script src="js/internet-status.js"></script>
    <script src="js/tiny-slider.js"></script>
    <script src="js/venobox.min.js"></script>
    <script src="js/countdown.js"></script>
    <script src="js/rangeslider.min.js"></script>
    <script src="js/vanilla-dataTables.min.js"></script>
    <script src="js/index.js"></script>
    <script src="js/imagesloaded.pkgd.min.js"></script>
    <script src="js/isotope.pkgd.min.js"></script>
    <script src="js/dark-rtl.js"></script>
    <script src="js/active.js"></script>
    <script src="js/pwa.js"></script>
    {{-- <script>
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
    </script> --}}
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
