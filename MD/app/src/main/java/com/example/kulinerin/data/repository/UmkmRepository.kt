package com.example.kulinerin.data.repository

import android.app.Application
import com.example.kulinerin.R
import androidx.lifecycle.LiveData
import androidx.lifecycle.asLiveData
import androidx.lifecycle.liveData
import com.example.kulinerin.data.datastore.UserPreferences
import com.example.kulinerin.data.request.LoginRequest
import com.example.kulinerin.data.request.RegisterRequest
import com.example.kulinerin.data.response.ErrorResponse
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.data.response.TokenSession
import com.example.kulinerin.data.retrofit.ApiService
import com.example.kulinerin.utils.Result
import com.google.gson.Gson
import retrofit2.HttpException
import java.io.IOException

class UmkmRepository private constructor(
    private val apiService: ApiService,
    private val application: Application
) {
    fun getAllUmkm() = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.getAllUmkm()
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }

    fun getUmkmNearBy(token: String) = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.getNearByUmkm("Bearer $token")
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }

    fun getCariToko(nama: String) = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.getCariUmkm(nama)
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }
    private fun handleHttpException(exception: HttpException): Result.Error {
        val jsonInString = exception.response()?.errorBody()?.string()
        val errorBody = Gson().fromJson(jsonInString, ErrorResponse::class.java)
        val errorMessage = errorBody.message ?: "Terjadi kesalahan tidak diketahui"
        return Result.Error(errorMessage)
    }
    companion object {
        @Volatile
        private var instance: UmkmRepository? = null
        fun getInstance(
            apiService: ApiService,
            application: Application
        ): UmkmRepository =
            instance ?: synchronized(this) {
                instance ?: UmkmRepository(apiService, application)
            }.also { instance = it }
    }
}