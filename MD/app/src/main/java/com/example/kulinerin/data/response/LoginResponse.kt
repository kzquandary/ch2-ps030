package com.example.kulinerin.data.response

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.parcelize.Parcelize

@Parcelize
data class LoginResponse(

	@field:SerializedName("success")
	val success: Boolean? = null,

	@field:SerializedName("token")
	val token: String
) : Parcelable
