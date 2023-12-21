package com.example.kulinerin.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.data.response.UmkmResponse
import com.example.kulinerin.databinding.FragmentHomeBinding
import com.example.kulinerin.ui.MapsActivity
import com.example.kulinerin.ui.NotificationActivity
import com.example.kulinerin.ui.RegisterActivity
import com.example.kulinerin.ui.adapter.UmkmAdapter
import com.example.kulinerin.ui.viewmodel.HomeViewModel
import com.example.kulinerin.ui.viewmodel.HomeViewModelFactory
import com.example.kulinerin.ui.viewmodel.TokoViewModelFactory
import com.example.kulinerin.ui.viewmodel.UmkmViewModel
import com.example.kulinerin.utils.Result

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    private val  viewModel: HomeViewModel by viewModels {
        HomeViewModelFactory.getInstance(requireActivity().application)
    }
    private val  tokoViewModel: UmkmViewModel by viewModels {
        TokoViewModelFactory.getInstance(requireActivity().application)
    }
    private lateinit var tokenUser: LoginResponse
    private val binding get() = _binding!!
    private val adapter = UmkmAdapter()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        viewModel.getToken().observe(viewLifecycleOwner) {
            tokenUser = it
        }

        binding.btnNotification.setOnClickListener {
            val intent = Intent(requireContext(), NotificationActivity::class.java)
            startActivity(intent)
        }
        binding.btnExplore.setOnClickListener {
            val intent = Intent(requireContext(), MapsActivity::class.java)
            startActivity(intent)
        }
        setupRecyclerView(adapter)
        setupSearchView()
        return binding.root
    }
    override fun onResume(){
        super.onResume()
        tokoViewModel.getAllUmkm().observe(this) { result ->
            handleTokoResult(result, adapter)
        }
    }
    private fun handleTokoResult(result: Result<UmkmResponse>, adapter: UmkmAdapter) {
        when (result) {
            is Result.Loading -> showLoading(true)
            is Result.Success -> {
                showLoading(false)
                val umkm = result.data.sellersItem
                if (umkm.isNullOrEmpty()) {
                    binding.tvEmptyData.visibility = View.VISIBLE
                } else {
                    binding.tvEmptyData.visibility = View.GONE
                    adapter.submitList(umkm)
                }
            }
            is Result.Error -> {
                showLoading(false)
                Toast.makeText(requireContext(), result.error, Toast.LENGTH_SHORT).show()
            }
        }
    }
    private fun setupRecyclerView(adapter: UmkmAdapter) {
        val layoutManager = LinearLayoutManager(requireContext())
        binding.rvArticle.layoutManager = layoutManager
        binding.rvArticle.adapter = adapter
    }

    private fun showLoading(isLoading: Boolean) {
        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    private fun setupSearchView() {
        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                performSearch(query)
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                performSearch(newText)
                return true
            }
        })
    }
    private fun performSearch(query: String?) {
        if (query?.isNotEmpty() == true) {
            tokoViewModel.getCariUmkm(query).observe(this) { result ->
                handleSearchResult(result, adapter)
            }
        } else {
            tokoViewModel.getAllUmkm().observe(this) { result ->
                handleTokoResult(result, adapter)
            }
        }
    }

    private fun handleSearchResult(result: Result<UmkmResponse>, adapter: UmkmAdapter) {
        when (result) {
            is Result.Loading -> showLoading(true)
            is Result.Success -> {
                showLoading(false)
                val umkms = result.data.sellersItem
                 adapter.submitList(umkms)
                if (umkms != null) {
                    updateNoDataVisibility(umkms.isEmpty())
                };
            }
            is Result.Error -> {
                updateNoDataVisibility(true);
                showLoading(false)
                Toast.makeText(requireContext(), result.error, Toast.LENGTH_SHORT).show()
            }
        }
    }
    fun updateNoDataVisibility(showNoData: Boolean) {
        binding.tvEmptyData.visibility = if (showNoData) View.VISIBLE else View.GONE
    }

}