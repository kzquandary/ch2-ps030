package com.example.kulinerin.ui.viewmodel

import androidx.lifecycle.ViewModel
import com.example.kulinerin.data.repository.UserRepository

class RegisterViewModel(private val userRepository: UserRepository) : ViewModel() {
    fun register(alamat: String, email: String, nama:String, nohp:String, password:String, username: String) =
        userRepository.register(alamat, email, nama, nohp, password, username)
}