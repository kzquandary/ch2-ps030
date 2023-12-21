package com.example.kulinerin.data.response

import com.google.gson.annotations.SerializedName

data class CariUmkmResponse(

	@field:SerializedName("data")
	val data: List<DataItemCari?>? = null,

	@field:SerializedName("success")
	val success: Boolean? = null
)

data class DataItemCari(

	@field:SerializedName("owner")
	val owner: String? = null,

	@field:SerializedName("nama")
	val nama: String? = null,

	@field:SerializedName("no_hp")
	val noHp: String? = null,

	@field:SerializedName("image_url")
	val imageUrl: Any? = null,

	@field:SerializedName("current_location")
	val currentLocation: CurrentLocationCari? = null,

	@field:SerializedName("alamat")
	val alamat: String? = null,

	@field:SerializedName("username")
	val username: String? = null
)

data class CurrentLocationCari(

	@field:SerializedName("_longitude")
	val longitude: Float? = null,

	@field:SerializedName("_latitude")
	val latitude: Float? = null
)
