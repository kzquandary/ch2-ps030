@extends('layout')

@section('content')
    <div class="page-content-wrapper py-3">
        <div class="container">
            <!-- Setting Card-->
            <div class="card mb-3 shadow-sm">
                <div class="card-body direction-rtl">
                    <p class="mb-2">Pengaturan</p>

                    <div class="single-setting-panel">
                        <a href="javascript:;">
                            <div class="icon-wrapper">
                                <i class="bi bi-person"></i>
                            </div>
                            Tentang Kami
                        </a>
                    </div>
                    <div class="single-setting-panel">
                        <a href="/privacy-policy">
                            <div class="icon-wrapper bg-danger">
                                <i class="bi bi-shield-lock"></i>
                            </div>
                            Kebijakan dan Privasi Pengguna
                        </a>
                    </div>
                    <div class="single-setting-panel">
                        <a href="/logout">
                            <div class="icon-wrapper bg-danger">
                                <i class="bi bi-box-arrow-right"></i>
                            </div>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
