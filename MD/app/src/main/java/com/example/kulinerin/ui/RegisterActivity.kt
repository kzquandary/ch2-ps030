package com.example.kulinerin.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import com.example.kulinerin.R
import com.example.kulinerin.databinding.ActivityLoginBinding
import com.example.kulinerin.databinding.ActivityRegisterBinding
import com.example.kulinerin.ui.viewmodel.RegisterViewModel
import com.example.kulinerin.ui.viewmodel.ViewModelFactory
import com.example.kulinerin.utils.Message
import com.example.kulinerin.utils.Result

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private val viewModel: RegisterViewModel by viewModels {
        ViewModelFactory.getInstance(application)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvRegisterToLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }

        binding.btnMasuk.setOnClickListener {
            val email = binding.etRegisterEmail.text.toString()
            val password = binding.etRegisterPassword.text.toString()
            val alamat= binding.etRegisterAlamat.text.toString()
            val nohp= binding.etRegisterNo.text.toString()
            val username = binding.etRegisterNamaPengguna.text.toString()
            val nama = binding.etRegisterNamaLengkap.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()
                && alamat.isNotEmpty()
                && nohp.isNotEmpty()
                && username.isNotEmpty()
                && nama.isNotEmpty()
                ){
                viewModel.register(alamat, email, nama, nohp, password, username).observe(this@RegisterActivity){
                    when(it){
                        is Result.Loading -> showLoading(true)
                        is Result.Success -> {
                            Toast.makeText(this, "Berhasil Register", Toast.LENGTH_SHORT ).show()
                            showLoading(false)
                            startActivity(Intent(this@RegisterActivity, LoginActivity::class.java))
                            finish()
                        }
                        is Result.Error -> {
                            showLoading(false)
                            onLoginError(it.error)
                        }
                    }
                }
            } else {
                Message.showWithDismissAction(binding.root, "Please fill in all fields")
            }
        }

    }

    private fun onLoginError(errorMessage: String) {
        Message.showWithDismissAction(binding.root,errorMessage)
    }
    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
    }
}