package com.example.kulinerin.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import com.example.kulinerin.R
import com.example.kulinerin.databinding.ActivityLoginBinding
import com.example.kulinerin.ui.viewmodel.LoginViewModel
import com.example.kulinerin.ui.viewmodel.ViewModelFactory
import com.example.kulinerin.utils.Message
import com.example.kulinerin.utils.Result
class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val viewModel: LoginViewModel by viewModels {
        ViewModelFactory.getInstance(application)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvRegisterToLogin.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
        binding.btnMasuk.setOnClickListener {
            val email = binding.etLoginEmail.text.toString()
            val password = binding.etLoginPassword.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                viewModel.login(email, password).observe(this@LoginActivity){
                    when(it){
                        is Result.Loading -> showLoading(true)
                        is Result.Success -> {
                            showLoading(false)
                            viewModel.getUserLogin().observe(this) {
                                if (it.token?.isNotEmpty() == true) {
                                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                                    finish()
                                }
                            }
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