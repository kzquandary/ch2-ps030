<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Ambil data dari formulir
            $data = $request->only([
                'nama', 'owner', 'email', 'username', 'no_hp', 'password', 'alamat', 'latitude','longitude'
            ]);

            // Ambil latitude dan longitude dari cookies

            // Kirim data ke API dengan header Content-Type: application/json
            $response = Http::post('https://capstoneprojectmicro.as.r.appspot.com/api/auth/register', $data);
            // Mendapatkan respons dari API
            $apiResponse = $response->json();

            // Lakukan sesuai kebutuhan, contoh redirect atau tampilkan pesan
            if ($apiResponse['success']) {
                return redirect('/login')->with('success', 'Registrasi berhasil! Silakan login.');
            } else {
                return redirect('/register')->with('error', 'Registrasi gagal. ' . $apiResponse['message']);
            }
        } catch (\Exception $e) {
            // Tangani kesalahan jika terjadi exception
            return redirect('/register')->with('error', 'Registrasi gagal. ' . $e->getMessage());
        }
    }
}
