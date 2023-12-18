<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session; // Import Session
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;

class AddProduct extends Controller
{
    public function addProduct(Request $request)
    {
        $apiUrl = 'https://capstoneprojectmicro.as.r.appspot.com/api/product/';

        // Ambil username dari local storage
        $username = $request->input('username');

        // Data produk dari form
        $productData = [
            'active' => $request->input('active'),
            'product_category' => $request->input('product_category'),
            'product_description' => $request->input('product_description'),
            'product_name' => $request->input('product_name'),
            'product_price' => $request->input('product_price'),
            'username' => $username,
        ];

        // File gambar
        $image = $request->file('image');

        // Inisialisasi objek Client Guzzle
        $client = new Client(); // Tambahkan baris ini

        try {
            // Melakukan HTTP POST request menggunakan Guzzle
            $response = $client->request('POST', $apiUrl, [
                'multipart' => array_merge(
                    [['name' => 'image', 'contents' => fopen($image->getRealPath(), 'r'), 'filename' => $image->getClientOriginalName()]],
                    array_map(fn ($key, $value) => ['name' => $key, 'contents' => $value], array_keys($productData), $productData)
                ),
            ]);

            // Mendapatkan hasil respons dari API
            $apiResponse = json_decode($response->getBody(), true);

            if ($apiResponse['success']) {
                // Jika sukses, arahkan pengguna ke halaman yang sesuai
                return redirect('/home')->with('product_success', 'Produk berhasil ditambahkan!');
            } else {
                // Jika gagal, kirim respons JSON dengan pesan kesalahan
                return response()->json($apiResponse, 400);
            }
        } catch (\Exception $e) {
            // Menangani kesalahan
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
    public function ViewProduct(Request $request)
    {
        // Get data from the session
        $data = Session::get('data');

        // Check if the data exists in the session
        if ($data) {
            // Tampilkan view tambahproduk dengan data dari session
            return view('tambahproduk', compact('data'));
        } else {
            return redirect('/login')->with('error', 'Data not found in the session');
        }
    }
    public function DeleteProduct(Request $request)
    {
        // Get the product ID from the request
        $productId = $request->product_id;

        // Cek apakah token tersedia di session
        $token = Session::get('jwt');

        if ($token) {
            // Buat instance client GuzzleHttp
            $client = new Client();

            try {
                // Kirim request delete ke API dengan header Authorization
                $response = $client->request('DELETE', "https://capstoneprojectmicro.as.r.appspot.com/api/product/{$productId}", [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $token
                    ]
                ]);

                // Handle the API response
                $statusCode = $response->getStatusCode();
                if ($statusCode == 200) {
                    // dd($statusCode);
                    // Success, handle accordingly
                    return redirect('/home')->with('success', 'Product deleted successfully.');
                } else {
                    // dd($statusCode);
                    // Handle other status codes
                    return redirect('/home')->with('error', 'Failed to delete product. Status Code: ' . $statusCode);
                }
            } catch (\Exception $e) {
                // dd($e);
                // Handle exceptions if any
                return redirect('/home')->with('error', 'An error occurred: ' . $e->getMessage());
            }
        } else {
            return redirect('/login')->with('error', 'Token not found');
        }
    }
}
