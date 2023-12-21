package com.example.kulinerin.data.datastore

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.example.kulinerin.data.response.LoginResponse
import com.example.kulinerin.data.response.TokenSession
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "token")
class UserPreferences private constructor(private val dataStore: DataStore<Preferences>) {
    private val userTokenKey = stringPreferencesKey(USER_TOKEN_KEY)
    fun getSession(): Flow<LoginResponse> = dataStore.data.map {
        LoginResponse(
            token = it[userTokenKey] ?: ""
        )
    }
    suspend fun saveSession(data: LoginResponse) = dataStore.edit {
        with(it) {
            this[userTokenKey] = data.token ?: ""
        }
    }
    suspend fun deleteSession() = dataStore.edit { it.clear() }
    companion object {
        @Volatile
        private var INSTANCE: UserPreferences? = null
        fun getInstance(dataStore: DataStore<Preferences>): UserPreferences {
            return INSTANCE ?: synchronized(this) {
                val instance = UserPreferences(dataStore)
                INSTANCE = instance
                instance
            }
        }
        private const val USER_TOKEN_KEY = "token"
    }
}