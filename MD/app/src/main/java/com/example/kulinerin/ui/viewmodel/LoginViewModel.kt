package com.example.kulinerin.ui.viewmodel

import androidx.lifecycle.ViewModel
import com.example.kulinerin.data.repository.UserRepository

class LoginViewModel(private val userRepository: UserRepository) : ViewModel() {
    fun login(identifier: String, password: String) = userRepository.login(identifier, password)
    fun getUserLogin() = userRepository.getSession()

}