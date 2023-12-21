package com.example.kulinerin.data.response

import com.google.gson.annotations.SerializedName

data class ErrorResponse(

	@field:SerializedName("success")
	val success: Boolean,

	@field:SerializedName("message")
	val message: String
)
