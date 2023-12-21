package com.example.kulinerin.data.repository

import android.app.Application
import com.example.kulinerin.R
import androidx.lifecycle.LiveData
import androidx.lifecycle.asLiveData
import androidx.lifecycle.liveData
import com.example.kulinerin.data.datastore.UserPreferences
import com.example.kulinerin.data.request.LoginRequest
import com.example.kulinerin.data.request.ProfileRequest
import com.example.kulinerin.data.request.RegisterRequest
import com.example.kulinerin.data.response.ErrorResponse
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.data.response.TokenSession
import com.example.kulinerin.data.retrofit.ApiService
import com.example.kulinerin.utils.Result
import com.google.gson.Gson
import retrofit2.HttpException
import java.io.IOException

class UserRepository private constructor(
    private val apiService: ApiService,
    private val application: Application,
    private val userPref: UserPreferences
) {
    fun login(identifier: String, password: String) = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.login((LoginRequest(identifier, password)))
            saveSession(response)
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }

    fun getProfile(token: String) = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.getProfile("Bearer $token")
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }
    fun updateProfile(token: String, alamat: String, nama:String, no_tlp: String, email:String) = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.updateProfile("Bearer $token", ProfileRequest(alamat, nama, no_tlp, email))
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }

    fun register(alamat: String, email: String, nama:String, nohp:String, password:String, username: String) = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.register((RegisterRequest(alamat, email, nama, nohp, password, username, "-6.5870352411178414", "106.821810")))
            emit(Result.Success(response))
        } catch (e: HttpException) {
            emit(handleHttpException(e))
        } catch (exception: IOException) {
            emit(Result.Error(application.resources.getString(R.string.network_error_message)))
        } catch (exception: Exception) {
            emit(Result.Error(exception.message ?: application.resources.getString(R.string.unknown_error)))
        }
    }
    suspend fun saveSession(data: LoginResponse) = userPref.saveSession(data)
    fun getSession(): LiveData<LoginResponse> = userPref.getSession().asLiveData()
    suspend fun deleteSession() = userPref.deleteSession()

    private fun handleHttpException(exception: HttpException): Result.Error {
        val jsonInString = exception.response()?.errorBody()?.string()
        val errorBody = Gson().fromJson(jsonInString, ErrorResponse::class.java)
        val errorMessage = errorBody.message ?: "Terjadi kesalahan tidak diketahui"
        return Result.Error(errorMessage)
    }
    companion object {
        @Volatile
        private var instance: UserRepository? = null
        fun getInstance(
            apiService: ApiService,
            application: Application,
            pref: UserPreferences
        ): UserRepository =
            instance ?: synchronized(this) {
                instance ?: UserRepository(apiService, application, pref)
            }.also { instance = it }
    }
}