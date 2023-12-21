package com.example.kulinerin.data.response

import com.google.gson.annotations.SerializedName

data class UmkmNearbyResponse(

	@field:SerializedName("data")
	val data: List<DataItem?>? = null,

	@field:SerializedName("success")
	val success: Boolean? = null
)

data class DataItem(

	@field:SerializedName("owner")
	val owner: String? = null,

	@field:SerializedName("nama")
	val nama: String? = null,

	@field:SerializedName("no_hp")
	val noHp: String? = null,

	@field:SerializedName("image_url")
	val imageUrl: String? = null,

	@field:SerializedName("current_location")
	val currentLocation: CurrentLocationNearby,

	@field:SerializedName("alamat")
	val alamat: String? = null,

	@field:SerializedName("username")
	val username: String? = null
)

data class  CurrentLocationNearby(

	@field:SerializedName("_longitude")
	val longitude: Double? = null,

	@field:SerializedName("_latitude")
	val latitude: Double? = null
)
