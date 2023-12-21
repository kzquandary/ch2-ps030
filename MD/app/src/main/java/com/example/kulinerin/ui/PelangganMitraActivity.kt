package com.example.kulinerin.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.kulinerin.R
import com.example.kulinerin.databinding.ActivityPelangganMitraBinding
import com.example.kulinerin.utils.Message

class PelangganMitraActivity : AppCompatActivity() {
    private lateinit var binding: ActivityPelangganMitraBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPelangganMitraBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnMitra.setOnClickListener {
            Message.showWithDismissAction(binding.root, "Featured not yet")
        }
        binding.btnPelanggan.setOnClickListener {
            val intent = Intent(this, LoginRegisterActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}