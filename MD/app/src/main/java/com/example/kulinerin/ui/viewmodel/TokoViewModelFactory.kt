package com.example.kulinerin.ui.viewmodel

import android.app.Application
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.kulinerin.data.repository.UmkmRepository
import com.example.kulinerin.data.repository.UserRepository
import com.example.kulinerin.di.Injection

class TokoViewModelFactory private constructor(
    private val userRepository: UserRepository,
    private val umkmRepository: UmkmRepository
) :
    ViewModelProvider.NewInstanceFactory() {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>):T =
        when {
            modelClass.isAssignableFrom(UmkmViewModel::class.java) ->
                UmkmViewModel(userRepository, umkmRepository) as T
            else -> throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
        }
    companion object {
        @Volatile
        private var instance: TokoViewModelFactory? = null
        fun getInstance(application: Application): TokoViewModelFactory =
            instance ?: synchronized(this) {
                instance ?: TokoViewModelFactory(
                    Injection.provideUserRepository(application),
                    Injection.provideUmkmRepository(application))
            }.also { instance = it }
    }

}