package com.example.kulinerin.data.response

import com.google.gson.annotations.SerializedName

data class ProfileResponse(

	@field:SerializedName("data")
	val data: List<DataItemProfile?>? = null,

	@field:SerializedName("success")
	val success: Boolean? = null
)

data class CurrentLocationProfile(

	@field:SerializedName("_longitude")
	val longitude: Any? = null,

	@field:SerializedName("_latitude")
	val latitude: Any? = null
)

data class DataItemProfile(

	@field:SerializedName("nama")
	val nama: String? = null,

	@field:SerializedName("no_hp")
	val noHp: String? = null,

	@field:SerializedName("email")
	val email: String? = null,

	@field:SerializedName("alamat")
	val alamat: String? = null,

	@field:SerializedName("current_location")
	val currentLocation: CurrentLocation? = null,

	@field:SerializedName("username")
	val username: String? = null
)
