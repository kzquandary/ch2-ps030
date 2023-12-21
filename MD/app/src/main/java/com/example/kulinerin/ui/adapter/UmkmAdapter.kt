package com.example.kulinerin.ui.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.kulinerin.R
import com.example.kulinerin.data.response.SellersItem
import com.example.kulinerin.databinding.ItemTokoBinding
import com.example.kulinerin.ui.DetailUMKMActivity

class UmkmAdapter : ListAdapter<SellersItem, UmkmAdapter.MyViewHolder>(DIFF_CALLBACK) {

    class MyViewHolder(private val binding: ItemTokoBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(data: SellersItem) = with(binding) {
            tvNama.text = data.nama

            Glide.with(itemView.context)
                .load(data.profileImage)
                .placeholder(R.drawable.ic_launcher_foreground)
                .error(R.drawable.ic_launcher_foreground)
                .fallback(R.drawable.ic_launcher_foreground)
                .into(ivImage)

            itemView.setOnClickListener {
                val intent = Intent(itemView.context, DetailUMKMActivity::class.java).apply {
                    putExtra(DetailUMKMActivity.STORY_INTENT_DATA, data)
                }
                itemView.context.startActivity(intent)
            }
        }
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        getItem(position)?.let { holder.bind(it) }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder =
        MyViewHolder(
            ItemTokoBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )

    companion object {
        val DIFF_CALLBACK = object : DiffUtil.ItemCallback<SellersItem>() {
            override fun areItemsTheSame(oldItem: SellersItem, newItem: SellersItem): Boolean {
                return oldItem == newItem
            }
            override fun areContentsTheSame(oldItem: SellersItem, newItem: SellersItem): Boolean {
                return oldItem == newItem
            }
        }
    }
}