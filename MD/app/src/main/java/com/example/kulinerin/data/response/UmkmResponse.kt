package com.example.kulinerin.data.response

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.parcelize.Parcelize

data class UmkmResponse(

	@field:SerializedName("success")
	val success: Boolean? = null,

	@field:SerializedName("sellers")
	val sellersItem: List<SellersItem?>? = null
)

@Parcelize
data class SellersItem(

	@field:SerializedName("owner")
	val owner: String? = null,

	@field:SerializedName("profile_image")
	val profileImage: String? = null,

	@field:SerializedName("nama")
	val nama: String? = null,

	@field:SerializedName("no_hp")
	val noHp: String? = null,

	@field:SerializedName("email")
	val email: String? = null,

	@field:SerializedName("alamat")
	val alamat: String? = null,

	@field:SerializedName("current_location")
	val currentLocation: CurrentLocation,

	@field:SerializedName("username")
	val username: String? = null
): Parcelable

@Parcelize
data class CurrentLocation(

	@field:SerializedName("_longitude")
	val longitude: Float? = null,

	@field:SerializedName("_latitude")
	val latitude: Float? = null
): Parcelable
