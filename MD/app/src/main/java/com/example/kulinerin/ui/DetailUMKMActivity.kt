package com.example.kulinerin.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.kulinerin.R

class DetailUMKMActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_umkmactivity)
    }

    companion object {
        const val STORY_INTENT_DATA = "STORY_INTENT_DATA"
    }
}