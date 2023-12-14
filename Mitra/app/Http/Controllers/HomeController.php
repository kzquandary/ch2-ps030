<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Request;
use Tymon\JWTAuth\Facades\JWTAuth; // Import JWTAuth
use Illuminate\Support\Facades\Session; // Import Session

class HomeController extends Controller
{
    public function index()
    {
        // Cek apakah token tersedia di session
        $token = Session::get('jwt');

        if ($token) {
            return view('welcome');
        } else {
            return redirect('/login')->with('error', 'Token not found');
        }
    }
    public function logout()
    {
        // Hapus token dari session
        Session::forget('jwt');

        // Redirect ke halaman login
        return redirect('/login')->with('success', 'Logout berhasil');
    }
}
