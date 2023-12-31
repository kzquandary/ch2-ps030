@extends('layout')

@section('content')
    <style>
        .review-heading {
            text-align: center;
            position: relative;
        }

        .review-heading h3 {
            display: inline-block;
            background-color: #fff;
            padding: 0 15px;
            position: relative;
            z-index: 1;
        }

        .review-divider {
            margin-top: 15px;
            border: none;
            height: 1px;
            background-color: #ddd;
            position: relative;
            z-index: 0;
        }
    </style>
    <div class="page-content-wrapper py-3">
        <div class="container">
            <div class="card">
                <div class="card-body direction-rtl">

                    <!-- Search Form Wrapper -->
                    <div class="search-form-wrapper">
                        <div class="review-heading">
                            <h3>Ulasan Konsumen</h3>
                        </div>
                    </div>

                    <!-- Garis Pembatas -->
                    <hr class="review-divider">

                    <!-- Single Search Result -->
                    @if (isset($data) && property_exists($data, 'data') && count($data->data) > 0)
                        @foreach ($data->data as $review)
                            <div class="single-search-result mb-3 border-bottom pb-3">
                                <h6 class="text-truncate mb-1">{{ $review->customers }}</h6>
                                <p class="mb-0">{{ $review->review_description }}</p>
                            </div>
                        @endforeach
                    @else
                        <p>No reviews found.</p>
                    @endif


                </div>
            </div>
        </div>
    </div>
@endsection
