package com.example.kulinerin.ui

import android.Manifest.permission.ACCESS_COARSE_LOCATION
import android.content.Context
import android.content.pm.PackageManager
import android.content.res.Resources
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.core.content.ContextCompat
import com.example.kulinerin.R
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.utils.Result
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.example.kulinerin.databinding.ActivityMapsBinding
import com.example.kulinerin.ui.viewmodel.TokoViewModelFactory
import com.example.kulinerin.ui.viewmodel.UmkmViewModel
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.MapStyleOptions

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMapsBinding
    private val boundsBuilder = LatLngBounds.Builder()
    private val UmkmviewModel: UmkmViewModel by viewModels {
        TokoViewModelFactory.getInstance(application)
    }
    private lateinit var dataLogin: LoginResponse
    private lateinit var fusedLocationProviderClient: FusedLocationProviderClient
    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { if (it) getLocationForDevice() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
        fusedLocationProviderClient =
            LocationServices.getFusedLocationProviderClient(this)
        getDataUserLogin()
    }

    private fun getDataUserLogin() {
        UmkmviewModel.getToken().observe(this) { result ->
            dataLogin = result
        }
    }
    private fun getLocationForDevice() {
        if (
            ContextCompat.checkSelfPermission(
                applicationContext, ACCESS_COARSE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            mMap.isMyLocationEnabled = true
            fusedLocationProviderClient.lastLocation.addOnSuccessListener {
                if (it != null) {
                    val latLng = LatLng(it.latitude, it.longitude)
                    mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 8f))
                } else showToast(
                    applicationContext,
                    getString(R.string.please_active_locationyou)
                )
            }
        } else requestPermissionLauncher.launch(ACCESS_COARSE_LOCATION)
    }


    private fun setMapStyle() {
        try {
            val success =
                mMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(this, R.raw.map_style))
            if (!success) {
                Log.e(TAG, "Style parsing failed.")
            }
        } catch (exception: Resources.NotFoundException) {
            Log.e(TAG, "Can't find style. Error: ", exception)
        }
    }

    fun showToast(context: Context, message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
    companion object {
        private const val TAG = "MapsActivity"
    }
    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mMap.uiSettings.isZoomControlsEnabled = true
        mMap.uiSettings.isIndoorLevelPickerEnabled = true
        mMap.uiSettings.isCompassEnabled = true
        mMap.uiSettings.isMapToolbarEnabled = true

        dataLogin.token?.let {
            UmkmviewModel.getUmkmNearby(it).observe(this) {
                if (it != null) {
                    when (it) {
                        is Result.Success -> {
                            val umkmResponse = it.data

                            umkmResponse?.data?.forEach { dataItem ->
                                val latLng = dataItem?.currentLocation?.latitude?.let { it1 ->
                                    dataItem?.currentLocation?.longitude?.let { it2 ->
                                        LatLng(
                                            it1, it2
                                        )
                                    }
                                }
                                latLng?.let { it1 ->
                                    MarkerOptions()
                                        .position(it1)
                                        .title(dataItem.nama)
                                        .snippet(dataItem.owner)
                                }?.let { it2 ->
                                    mMap.addMarker(
                                        it2
                                    )
                                }
                            }

                            showLoading(false)
                        }

                        is Result.Loading -> {
                            showLoading(true)
                        }

                        is Result.Error -> {
                            showLoading(false)
                            val message: String =
                                application.getString(R.string.unexpected_error_message)
                            Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
                            Log.d(TAG, "onMapReady Error: ${it.error}")
                        }
                    }
                }
            }
        }

        getLocationForDevice()
        setMapStyle()


    }

}