package com.example.kulinerin.ui.profile

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.example.kulinerin.R
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.databinding.FragmentProfileBinding
import com.example.kulinerin.ui.LoginActivity
import com.example.kulinerin.ui.viewmodel.ProfileViewModel
import com.example.kulinerin.ui.viewmodel.ProfileViewModelFactory
import com.example.kulinerin.utils.Result

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private val  viewModel: ProfileViewModel by viewModels {
        ProfileViewModelFactory.getInstance(requireActivity().application)
    }
    private lateinit var tokenUser: LoginResponse
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)



        binding.btnLogout.setOnClickListener {
            showLogoutDialog()
        }
        binding.btnUpdate.setOnClickListener {
            val intent = Intent(requireContext(), UpdateProfileActivity::class.java)
            startActivity(intent)
        }
        return binding.root
    }
    override fun onResume(){
        super.onResume()
        viewModel.getToken().observe(viewLifecycleOwner) {
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
                    binding.etRegisterNamaPengguna.setText(umkm?.username)
                    binding.etRegisterNo.setText(umkm?.noHp)
                }
                is Result.Error -> {
                    Toast.makeText(requireContext(), result.error, Toast.LENGTH_SHORT).show()
                }
            }
        }

    }
    private fun showLogoutDialog() {
        val customDialogView = LayoutInflater.from(requireContext()).inflate(R.layout.dialog_logout, null)
        val alertDialog = buildAlertDialog(customDialogView)
        val yesButton = customDialogView.findViewById<Button>(R.id.buttonyes)
        val noButton = customDialogView.findViewById<Button>(R.id.buttonno)
        yesButton.setOnClickListener {
            handleYesButtonClick()
        }
        noButton.setOnClickListener {
            alertDialog.dismiss()
        }
        alertDialog.show()
    }
    private fun buildAlertDialog(customDialogView: View): AlertDialog {
        return AlertDialog.Builder(requireContext())
            .setView(customDialogView)
            .create()
    }
    private fun handleYesButtonClick() {
        viewModel.deleteUserLogin()
        startActivity(Intent(requireContext(), LoginActivity::class.java))
        requireActivity().finish()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}