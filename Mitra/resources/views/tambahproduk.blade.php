@extends('layout')

@section('content')
    <div class="page-content-wrapper py-3">
        <!-- Element Heading -->
        <div class="container">
            <div class="element-heading align-items-center">
                <h6>Tambah Produk</h6>
            </div>
        </div>

        <div class="container">
            <div class="card">
                <div class="card-body">
                    <form action="/addproduct" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label class="form-label" for="product_name">Nama Produk</label>
                            <input class="form-control" name="product_name" id="product_name" type="text"
                                placeholder="Nama Produk">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="product_category">Kategori Produk</label>
                            <select class="form-control" name="product_category" id="product_category">
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                                <option value="Camilan">Camilan</option>
                                <option value="Hidangan Manis">Hidangan Manis</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="product_price">Harga Produk</label>
                            <input class="form-control" name="product_price" id="product_price" type="number"
                                placeholder="10000">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="product_description">Deskripsi Produk</label>
                            <textarea class="form-control" name="product_description" id="product_name" placeholder="Designing World"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="product_image">Gambar Produk</label>
                            <input class="form-control" name="image" id="product_image" type="file" accept="image/*"
                                onchange="previewImage(this)">
                            <div class="mt-2">
                                <img id="imagePreview" class="img-fluid" alt="Preview"
                                    style="max-width: 200px; display: none;">
                            </div>
                        </div>
                        <input type="hidden" name="active" value="false">
                        <!-- Input hidden untuk username -->
                        <input type="hidden" name="username" value="{{ $data->data[0]->username }}">
                        <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                            type="submit">
                            Tambah Produk
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        function previewImage(input) {
            const imagePreview = document.getElementById('imagePreview');

            if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };

                reader.readAsDataURL(input.files[0]);
            } else {
                imagePreview.src = '';
                imagePreview.style.display = 'none';
            }
        }
    </script>
@endsection
