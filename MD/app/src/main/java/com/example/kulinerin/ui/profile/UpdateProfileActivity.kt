package com.example.kulinerin.ui.profile

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import com.example.kulinerin.R
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.databinding.ActivityLoginBinding
import com.example.kulinerin.databinding.ActivityUpdateProfileBinding
import com.example.kulinerin.ui.MainActivity
import com.example.kulinerin.ui.viewmodel.LoginViewModel
import com.example.kulinerin.ui.viewmodel.ProfileViewModel
import com.example.kulinerin.ui.viewmodel.ProfileViewModelFactory
import com.example.kulinerin.ui.viewmodel.ViewModelFactory
import com.example.kulinerin.utils.Result

class UpdateProfileActivity : AppCompatActivity() {
    private lateinit var binding: ActivityUpdateProfileBinding
    private val viewModel: ProfileViewModel by viewModels {
        ProfileViewModelFactory.getInstance(application)
    }
    private lateinit var tokenUser: LoginResponse
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityUpdateProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btnUpdate.setOnClickListener {
            updateProfile()
        }
    }

    private fun updateProfile() {
        val newEmail = binding.etRegisterEmail.text.toString()
        val newAlamat = binding.etRegisterAlamat.text.toString()
        val newName = binding.etName.text.toString()
        val newNoHp = binding.etRegisterNo.text.toString()
        if (newEmail.isBlank() || newAlamat.isBlank() || newName.isBlank() || newNoHp.isBlank()) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
            return
        }
        viewModel.updateProfile(tokenUser.token, newAlamat, newName, newNoHp, newEmail).observe(this) { result ->
            when (result) {
                is Result.Loading -> {
                    showLoading(true)
                }

                is Result.Success -> {
                    showLoading(false)
                    Toast.makeText(this, "Profile updated successfully", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this@UpdateProfileActivity, MainActivity::class.java))
                    finish()
                }

                is Result.Error -> {
                    showLoading(false)
                    Toast.makeText(this, result.error, Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
    override fun onResume(){
        super.onResume()
        viewModel.getToken().observe(this) {
            tokenUser = it
        }
        getProfile()
    }
    private fun getProfile(){
        viewModel.getProfile(tokenUser.token).observe(this) { result ->
            when (result) {
                is Result.Loading -> return@observe
                is Result.Success -> {
                    val umkmList = result.data.data
                    val umkm = umkmList?.firstOrNull()
                    binding.etRegisterEmail.setText(umkm?.email)
                    binding.etRegisterAlamat.setText(umkm?.alamat)
                    binding.etName.setText(umkm?.nama)
                    binding.etRegisterNo.setText(umkm?.noHp)
                }
                is Result.Error -> {

                    Toast.makeText(this, result.error, Toast.LENGTH_SHORT).show()
                }
            }
        }

    }
    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
    }
}