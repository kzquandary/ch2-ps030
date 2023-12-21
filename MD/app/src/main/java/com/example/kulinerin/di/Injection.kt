package com.example.kulinerin.di

import android.app.Application
import com.example.kulinerin.data.datastore.UserPreferences
import com.example.kulinerin.data.datastore.dataStore
import com.example.kulinerin.data.repository.UmkmRepository
import com.example.kulinerin.data.repository.UserRepository
import com.example.kulinerin.data.retrofit.ApiConfig

object Injection {
    fun provideUserRepository(application: Application) =
        UserRepository.getInstance(
            ApiConfig.getApiService(),
            application,
            UserPreferences.getInstance(application.dataStore)
        )
    fun provideUmkmRepository(application: Application) =
        UmkmRepository.getInstance(ApiConfig.getApiService(), application)
}