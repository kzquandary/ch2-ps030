package com.example.kulinerin.ui.history

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2
import com.example.kulinerin.databinding.FragmentRiwayatBinding
import com.example.kulinerin.ui.adapter.FragmentPagerAdapter
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator

class HistoryFragment : Fragment() {
    private var _binding: FragmentRiwayatBinding? = null
    private val binding get() = _binding!!
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRiwayatBinding.inflate(inflater, container, false)
        setupViewPagerAndTabLayout()
        return binding.root
    }
    private fun setupViewPagerAndTabLayout() {
        val viewPager: ViewPager2 = binding?.viewPager ?: return
        val adapter = FragmentPagerAdapter(this)
        adapter.addFragment(PesananAktifFragment())
        adapter.addFragment(UlasanFragment())
        viewPager.adapter = adapter

        val tabLayout: TabLayout = binding?.tabs ?: return
        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            tab.text = when (position) {
                0 -> "Pesanan Aktif"
                1 -> "Ulasan"
                else -> ""
            }
        }.attach()
    }
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}