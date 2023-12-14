<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session; // Import Session

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            // Ambil data dari formulir
            $data = $request->only(['identifier', 'password']);

            // Kirim data ke API dengan header Content-Type: application/json
            $response = Http::post('https://capstoneprojectmicro.as.r.appspot.com/api/auth/login', $data);

            // Mendapatkan respons dari API
            $apiResponse = $response->json();

            // Lakukan sesuai kebutuhan, contoh redirect atau tampilkan pesan
            if ($apiResponse['success']) {
                // Simpan token ke dalam session dengan nama 'jwt'
                Session::put('jwt', $apiResponse['token']);

                return redirect('/')->with('success', 'Login berhasil');
            } else {
                return redirect('/login')->with('error', 'Login gagal. ' . $apiResponse['message']);
            }
        } catch (\Exception $e) {
            // Tangani kesalahan jika terjadi exception
            return redirect('/register')->with('error', 'Login gagal. ' . $e->getMessage());
        }
    }
    
}
