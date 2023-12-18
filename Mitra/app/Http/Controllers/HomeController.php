<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session; // Import Session
use GuzzleHttp\Client; // Import GuzzleHttp

class HomeController extends Controller
{
    public function index()
    {
        // Cek apakah token tersedia di session
        $token = Session::get('jwt');

        if ($token) {
            // Buat instance client GuzzleHttp
            $client = new Client();

            // Kirim request get ke API dengan header Authorization
            $response = $client->request('GET', 'http://localhost:8080/api/sellers/details', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token
                ]
            ]);

            // Dapatkan isi response dalam bentuk string JSON
            $jsonResponse = $response->getBody()->getContents();

            // Ubah string JSON menjadi objek
            $data = json_decode($jsonResponse);

            // Simpan data response ke session
            Session::put('data', $data);

            // Tampilkan view welcome dengan data response sebagai objek
            return view('welcome', compact('data'));
        } else {
            return redirect('/login')->with('error', 'Token not found');
        }
    }

    public function logout()
    {
        // Hapus token dan data dari session
        Session::forget('jwt');
        Session::forget('data');

        // Redirect ke halaman login
        return redirect('/login')->with('success', 'Logout berhasil');
    }
}
