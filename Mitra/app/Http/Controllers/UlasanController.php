<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session; // Import Session
use GuzzleHttp\Client; // Import GuzzleHttp

class UlasanController extends Controller
{
    public function index()
    {
        $token = Session::get('jwt');
        if ($token) {
            // Buat instance client GuzzleHttp
            $client = new Client();

            // Kirim request get ke API dengan header Authorization
            $response = $client->request('GET', 'https://capstoneprojectmicro.as.r.appspot.com/api/review', [
            // $response = $client->request('GET', 'http://localhost:8080/api/review', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token
                ]
            ]);

            // Dapatkan isi response dalam bentuk string JSON
            $jsonResponse = $response->getBody()->getContents();

            // Ubah string JSON menjadi objek
            $data = json_decode($jsonResponse);

            // Tampilkan view welcome dengan data response sebagai objek
            return view('ulasan', compact('data'));
        } else {
            return redirect('/login')->with('error', 'Token not found');
        }
    }
}
