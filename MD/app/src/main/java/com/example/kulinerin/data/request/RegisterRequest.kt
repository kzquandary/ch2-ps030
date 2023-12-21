package com.example.kulinerin.data.request

data class RegisterRequest(
    val alamat: String,
    val email: String,
    val nama: String,
    val no_hp: String,
    val password: String,
    val username: String,
    val latitude: String,
    val longitude: String,
)