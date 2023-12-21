package com.example.kulinerin.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.example.kulinerin.data.repository.UserRepository
import com.example.kulinerin.data.response.LoginResponse

class HomeViewModel(
    private val userRepository: UserRepository
) : ViewModel() {
    fun getToken(): LiveData<LoginResponse> =  userRepository.getSession()

}