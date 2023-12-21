<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddProduct;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UlasanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Auth Route
Route::get('/login', function () {
    return view('login');
});
Route::post('/login', [LoginController::class, 'login']);

Route::get('/register', function () {
    return view('register');
});

Route::post('/register', [RegisterController::class, 'register']);
Route::get('/logout', [HomeController::class, 'logout']);

//Home Routes
Route::get('/', [HomeController::class, 'splash']);
Route::get('/home', [HomeController::class, 'index']);
Route::get('/addproduct', [AddProduct::class, 'ViewProduct']);

Route::post('/addproduct', [AddProduct::class, 'addProduct']);
Route::delete('/delete/{product_id}', [AddProduct::class, 'DeleteProduct']);

Route::get('/transaksi', function () {
    return view('transaksi');
});
Route::get('/transaksi-details', function () {
    return view('transaksi-details');
});
Route::get('/settings', function () {
    return view('settings');
});
Route::get('/privacy-policy', function () {
    return view('privacy-policy');
});
Route::get('/ulasan', [UlasanController::class, 'index']);

