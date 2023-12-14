@extends('layout')

@section('content')
    <div class="page-content-wrapper py-3">
        <div class="container">
            <!-- Cart Wrapper -->
            <div class="cart-wrapper-area">
                <div class="cart-table card mb-3">
                    <div class="table-responsive card-body">
                        <table class="table mb-0 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <img src="img/geprek.jfif" alt="">
                                    </th>
                                    <td>
                                        <h6 class="mb-1">Ayam Geprek Pak Haji</h6>
                                        <span>Rp10.000</span>
                                    </td>
                                    <td>
                                        <div class="quantity">
                                            <input class="qty-text" type="number" value="1" disabled>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-body border-top">
                        <div class="table-responsive">
                            <table class="table table-bordered caption-top">
                                <caption>Detail Pelanggan</caption>
                                <tbody>
                                    <tr>
                                        <td>ID Transaksi</td>
                                        <td>84b574c0-6fcb-4ff3-8190-6492e584c83b</td>
                                    </tr>
                                    <tr>
                                        <td>Pelanggan</td>
                                        <td>kzquandary1</td>
                                    </tr>
                                    <tr>
                                        <td>Alamat</td>
                                        <td>Jl. Pasirkaliki No. 121-123 Pajajaran Cicendo Bandung Jawa Barat</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td><strong>Rp10,000</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Catatan</td>
                                        <td>Additional notes or comments</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="card-body border-top">
                        <div class="apply-coupon">
                            <!-- Coupon Form -->
                            <div class="coupon-form">
                                <form action="#">
                                    <!-- Dropdown for Order Status -->
                                    <div class="form-group">
                                        <label for="orderStatus">Update Status Pesanan:</label>
                                        <div class="pt-3"></div>
                                        <select class="form-control" id="orderStatus">
                                            <option value="diterima">Diterima</option>
                                            <option value="ditolak">Ditolak</option>
                                        </select>
                                    </div>

                                    <!-- Checkout -->
                                    <button class="btn btn-primary w-100 mt-3" type="button">Update Status Pesanan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
