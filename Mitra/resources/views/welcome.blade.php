@extends('layout')

@section('content')
    <div class="page-content-wrapper">
        <!-- Welcome Toast -->
        {{-- <div class="toast toast-autohide custom-toast-1 toast-success home-page-toast" role="alert"
            aria-live="assertive" aria-atomic="true" data-bs-delay="7000" data-bs-autohide="true">
            <div class="toast-body">
                <i class="bi bi-bookmark-check text-white h1 mb-0"></i>
                <div class="toast-text ms-3 me-2">
                    <p class="mb-1 text-white">Selamat Datang di Kulinerin</p>
                    <small class="d-block">Majukan UMKM Anda dan temukan pelanggan sekitar anda</small>
                </div>
            </div>
            <button class="btn btn-close btn-close-white position-absolute p-1" type="button"
                data-bs-dismiss="toast" aria-label="Close"></button>
        </div> --}}

        <!-- Tiny Slider One Wrapper -->
        <div class="pt-3"></div>

        <div class="container direction-rtl">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-4 d-flex align-items-center">
                            <span>Status Jualan:</span>
                        </div>
                        <div class="col-8 text-end">
                            <button id="toggleButton" class="btn btn-primary">Buka</button>
                        </div>
                    </div>
                    <div class="pb-3"></div>
                    <div class="row g-3">
                        <div class="col-4 d-flex align-items-center">
                            <span>Update Lokasi Jualan:</span>
                        </div>
                        <div class="col-8 text-end">
                            <button id="updateLocationBtn" class="btn btn-primary">Update Lokasi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-3"></div>

        <div class="container direction-rtl">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row g-3">

                        <div class="col-md-8 col-6">
                            Berikut Presentase Kepuasan Pelanggan Berdasarkan Data Ulasan Pada Toko
                        </div>

                        <div class="col-md-4 col-6">
                            <div class="feature-card mx-auto text-center">
                                <canvas id="myChart" width="200"></canvas>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="pb-3"></div>

        <div class="container direction-rtl">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row g-3">
                        @if (!empty($data->data[0]->product_list))
                            @foreach ($data->data[0]->product_list as $product)
                                <div class="col-6 d-flex flex-column align-items-center">
                                    <strong style="color: black">{{ $product->product_name }}</strong>
                                    <!-- Use the product's image_url -->
                                    <img src="{{ $product->image_url }}" alt="{{ $product->product_name }} Image"
                                        style="max-width: 100%; height: auto;" class="mb-2 rounded-3">
                                    <div class="text-center">
                                        <!-- Button for updating the product -->
                                        <a href="#" class="btn btn-warning">Ubah Produk</a>
                                        <!-- Button for deleting the product -->
                                        <form action="/delete/{{ $product->product_id }}" method="POST"
                                            class="d-inline-block">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger">Hapus Produk</button>
                                        </form>
                                    </div>
                                    <!-- Switch for product availability -->
                                    <div class="form-check form-switch mt-2">
                                        <input class="form-check-input" type="checkbox"
                                            id="availabilitySwitch{{ $loop->index }}">
                                        <label class="form-check-label"
                                            for="availabilitySwitch{{ $loop->index }}">Tersedia</label>
                                    </div>
                                </div>
                            @endforeach
                        @else
                            <div class="col-12 text-center">
                                <p>Belum ada produk.</p>
                            </div>
                        @endif


                        <div class="col-12 d-grid gap-2 align-items-center">
                            <a class="btn btn-primary" href="/addproduct"> Tambah Produk </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-3"></div>
    </div>
    <script>
        document.getElementById('toggleButton').addEventListener('click', function() {
            var button = document.getElementById('toggleButton');
            var status = button.innerText;

            if (status === 'Buka') {
                showStatusAlert('Jualan Berhasil Dibuka!', 'success');
                button.innerText = 'Tutup';
                button.classList.remove('btn-primary');
                button.classList.add('btn-danger'); // Ganti warna jika diperlukan
            } else {
                showStatusAlert('Jualan Berhasil Ditutup!', 'warning');
                button.innerText = 'Buka';
                button.classList.remove('btn-danger');
                button.classList.add('btn-primary'); // Ganti warna jika diperlukan
            }
        });

        function showStatusAlert(message, icon) {
            Swal.fire({
                icon: icon,
                title: message,
                showConfirmButton: false,
                timer: 1500 // Menampilkan pesan selama 1,5 detik
            });
        }
    </script>
    <script>
        document.getElementById('updateLocationBtn').addEventListener('click', function() {
            // Panggil fungsi untuk menampilkan SweetAlert
            showSuccessAlert();
        });

        function showSuccessAlert() {
            Swal.fire({
                icon: 'success',
                title: 'Lokasi berhasil diupdate!',
                showConfirmButton: false,
                timer: 1500 // Menampilkan pesan selama 1,5 detik
            });
        }
    </script>
    <script>
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['POSITIVE', 'NEGATIVE', 'NETRAL'],
                datasets: [{
                    label: '% of Sentiment',
                    data: [{{ $data->data[0]->sentiments->positive }},
                        {{ $data->data[0]->sentiments->negative }},
                        {{ $data->data[0]->sentiments->neutral }}
                    ], // Hapus nilai yang tidak diperlukan
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.5)', // Warna untuk POSITIVE
                        'rgba(220, 53, 69, 0.5)', // Warna untuk NEGATIVE
                        'rgba(255, 193, 7, 0.5)', // Warna untuk NETRAL
                    ],
                    borderColor: [
                        'rgba(40, 167, 69, 1)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(255, 193, 7, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
            }
        });
    </script>
@endsection
