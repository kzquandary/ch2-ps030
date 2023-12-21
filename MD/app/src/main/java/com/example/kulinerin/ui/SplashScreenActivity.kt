package com.example.kulinerin.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import com.example.kulinerin.R
import android.content.Intent
import androidx.activity.viewModels
import com.example.kulinerin.ui.viewmodel.LoginViewModel
import com.example.kulinerin.ui.viewmodel.ViewModelFactory

class SplashScreenActivity : AppCompatActivity() {
    private val SPLASH_TIMEOUT: Long = 3000
    private val viewModel: LoginViewModel by viewModels {
        ViewModelFactory.getInstance(application)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)
        viewModel.getUserLogin().observe(this) {
            if (it.token.isNullOrEmpty()) {
                Handler(Looper.getMainLooper()).postDelayed({
                    val mainIntent = Intent(this, PelangganMitraActivity::class.java)
                    startActivity(mainIntent)
                    finish()
                }, SPLASH_TIMEOUT)
            }else{
                Handler(Looper.getMainLooper()).postDelayed({
                    val mainIntent = Intent(this, MainActivity::class.java)
                    startActivity(mainIntent)
                    finish()
                }, SPLASH_TIMEOUT)
            }
        }

    }
}