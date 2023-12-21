package com.example.kulinerin.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.kulinerin.data.repository.UserRepository
import com.example.kulinerin.data.response.LoginResponse
import kotlinx.coroutines.launch

class ProfileViewModel(
    private val userRepository: UserRepository
) : ViewModel() {
    fun getToken(): LiveData<LoginResponse> =  userRepository.getSession()
    fun getProfile(token: String) = userRepository.getProfile(token)
    fun updateProfile(token: String, alamat: String, nama: String, no_tlp: String, email: String)
        = userRepository.updateProfile(token, alamat, nama, no_tlp, email)
    fun deleteUserLogin() = viewModelScope.launch { userRepository.deleteSession() }
 }