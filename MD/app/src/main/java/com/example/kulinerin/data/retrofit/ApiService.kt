package com.example.kulinerin.data.retrofit

import com.example.kulinerin.data.request.LoginRequest
import com.example.kulinerin.data.request.ProfileRequest
import com.example.kulinerin.data.request.RegisterRequest
import com.example.kulinerin.data.response.CariUmkmResponse
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.data.response.ProfileResponse
import com.example.kulinerin.data.response.RegisterResponse
import com.example.kulinerin.data.response.UmkmNearbyResponse
import com.example.kulinerin.data.response.UmkmResponse
import com.example.kulinerin.data.response.UpdateProfileResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {
    @Headers("Content-Type: application/json")
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse

    @Headers("Content-Type: application/json")
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): RegisterResponse

    @GET("home/getallumkm")
    suspend fun getAllUmkm() :UmkmResponse

    @GET("home/nearbyumkm")
    suspend fun getNearByUmkm(
        @Header("Authorization") token: String
    ) :UmkmNearbyResponse

    @GET("customers")
    suspend fun getProfile(
        @Header("Authorization") token: String
    ) :ProfileResponse

    @PUT("profile/update")
    suspend fun updateProfile(
        @Header("Authorization") token: String,
        @Body request: ProfileRequest
    ) :UpdateProfileResponse
    @GET("home/searchumkm/{nama}")
    suspend fun getCariUmkm(
        @Path("nama") nama: String
    ) : UmkmResponse
}