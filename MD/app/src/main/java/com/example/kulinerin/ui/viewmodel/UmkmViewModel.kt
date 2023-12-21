package com.example.kulinerin.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.kulinerin.data.repository.UmkmRepository
import com.example.kulinerin.data.repository.UserRepository
import com.example.kulinerin.data.response.LoginResponse
import kotlinx.coroutines.launch

class UmkmViewModel(
    private val userRepository: UserRepository,
    private val umkmRepository: UmkmRepository
) : ViewModel() {
    fun getToken(): LiveData<LoginResponse> =  userRepository.getSession()
    fun getAllUmkm() = umkmRepository.getAllUmkm()
    fun getUmkmNearby(token : String) = umkmRepository.getUmkmNearBy(token)
    fun getCariUmkm(nama: String) = umkmRepository.getCariToko(nama)
 }