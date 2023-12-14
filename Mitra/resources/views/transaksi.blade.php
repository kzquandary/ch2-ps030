@extends('layout')

@section('content')
    <div class="page-content-wrapper">
        <div class="pt-3"></div>

        <div class="container direction-rtl">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-6 d-grid gap-2 align-items-center">
                            <a class="btn btn-primary" href="javascript:;"> Transaksi Aktif </a>
                        </div>
                        <div class="col-6 d-grid gap-2 align-items-center">
                            <a class="btn btn-primary" href="javascript:;"> Transaksi Selesai </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="top-products-area product-list-wrap">
            <div class="container">
                <div class="row g-3">

                    <!-- Single Top Product Card -->
                    <div class="col-12">
                        <div class="card single-product-card">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="card-side-img">
                                        <!-- Product Thumbnail -->
                                        <a class="product-thumbnail d-block">
                                            <img src="img/geprek.jfif" alt="">
                                            <!-- Badge -->
                                            {{-- <span class="badge bg-primary">Sale</span> --}}
                                        </a>
                                    </div>

                                    <div class="card-content px-4 py-2">
                                        <!-- Product Title -->
                                        <a class="product-title d-block text-truncate mt-0" href="shop-details.html">Ayam Geprek Pak Haji</a>
                                        <!-- Product Price -->
                                        <p class="sale-price">Pending</p>
                                        <p class="sale-price"><span> Rp10.000</span></p>
                                        <!-- Add To Cart Button -->
                                        <a class="btn btn-primary rounded-pill btn-sm" href="/transaksi-details">Detail Pesanan</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="pt-3"></div>
        <div class="pb-3"></div>
    </div>
@endsection
