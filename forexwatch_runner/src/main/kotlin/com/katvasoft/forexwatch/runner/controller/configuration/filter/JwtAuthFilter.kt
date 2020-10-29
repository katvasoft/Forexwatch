package com.katvasoft.forexwatch.runner.controller.configuration.filter

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.User
import io.jsonwebtoken.Jwts
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import com.fasterxml.jackson.databind.ObjectMapper
import com.katvasoft.forexwatch.runner.controller.domain.AppUser
import com.katvasoft.forexwatch.runner.controller.helper.Constants
import io.jsonwebtoken.SignatureAlgorithm

import java.io.IOException
import java.util.*

class JwtAuthFilter (val authManager : AuthenticationManager) : UsernamePasswordAuthenticationFilter() {



    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication {
        try {

            val appUser = ObjectMapper().readValue(request!!.inputStream, AppUser::class.java)

            return authManager.authenticate(UsernamePasswordAuthenticationToken(appUser.username,appUser.password, arrayListOf()))

        } catch (io : IOException) {
            throw io
        }
    }


    override fun successfulAuthentication(request: HttpServletRequest?, response: HttpServletResponse?, chain: FilterChain?, authResult: Authentication?) {

        if(authResult != null && authResult.principal is User) {
            val principal = authResult.principal as User
            val token = Jwts.builder()
                    .setSubject(principal.username)
                    .setExpiration(Date(System.currentTimeMillis() + Constants.JWT_EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS512, Constants.JWT_SECRET)
                    .compact()

            response?.setHeader(Constants.JWT_HEADER_STRING, Constants.JWT_TOKEN_PREFIX + token)

        }



    }
}