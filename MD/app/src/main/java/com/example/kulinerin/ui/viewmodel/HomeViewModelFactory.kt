package com.example.kulinerin.ui.viewmodel

import android.app.Application
import androidx.lifecycle.ViewModel
import com.example.kulinerin.data.repository.UserRepository
import androidx.lifecycle.ViewModelProvider
import com.example.kulinerin.di.Injection

class HomeViewModelFactory private constructor(
    private val userRepository: UserRepository
) :
    ViewModelProvider.NewInstanceFactory() {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>):T =
        when {
            modelClass.isAssignableFrom(HomeViewModel::class.java) ->
                HomeViewModel(userRepository) as T
            else -> throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
        }
    companion object {
        @Volatile
        private var instance: HomeViewModelFactory? = null
        fun getInstance(application: Application): HomeViewModelFactory =
            instance ?: synchronized(this) {
                instance ?: HomeViewModelFactory(
                    Injection.provideUserRepository(application))
            }.also { instance = it }
    }

}