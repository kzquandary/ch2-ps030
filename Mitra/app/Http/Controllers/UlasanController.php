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

            try {
                // Kirim request get ke API dengan header Authorization
                $response = $client->request('GET', 'https://capstoneprojectmicro.as.r.appspot.com/api/review', [
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
            } catch (\GuzzleHttp\Exception\ClientException $e) {
                // Handle 404 Not Found error
                if ($e->getResponse()->getStatusCode() == 404) {
                    return view('ulasan', ['data' => null]);
                }

                // Handle other client exceptions as needed
                return redirect('/login')->with('error', 'Error fetching reviews');
            }
        } else {
            return redirect('/login')->with('error', 'Token not found');
        }
    }
}
