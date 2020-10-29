package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.repository.AppUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl : UserDetailsService {

    @Autowired
    lateinit var appUserRepository : AppUserRepository

    override fun loadUserByUsername(username: String?): UserDetails {

        if(username != null) {

            val appUser = appUserRepository.findByUsername(username)


            return User(appUser?.username, appUser?.password, arrayListOf())
        } else {

            throw UsernameNotFoundException("No username given")

        }

    }
}