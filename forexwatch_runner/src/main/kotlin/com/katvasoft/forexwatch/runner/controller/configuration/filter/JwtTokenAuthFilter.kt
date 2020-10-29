package com.katvasoft.forexwatch.runner.controller.configuration.filter

import com.katvasoft.forexwatch.runner.controller.helper.Constants
import io.jsonwebtoken.Jwts
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.bind.annotation.ResponseStatus
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JwtTokenAuthFilter(authManager : AuthenticationManager) : BasicAuthenticationFilter(authManager) {

    override fun doFilterInternal(request: HttpServletRequest?, response: HttpServletResponse?, chain: FilterChain?) {

        val header = request?.getHeader(Constants.JWT_HEADER_STRING)

        if(header == null || !header.startsWith(Constants.JWT_TOKEN_PREFIX)) {
            chain?.doFilter(request,response)
            return
        }

        val auth = getAuthentication(header)
        SecurityContextHolder.getContext().authentication = auth
        chain?.doFilter(request,response)

    }

    fun getAuthentication(token: String?) : UsernamePasswordAuthenticationToken? {

         if(token != null) {

             val strippedToken = token.replace(Constants.JWT_TOKEN_PREFIX, "")

             try {

                 val user = Jwts.parser()
                         .setSigningKey(Constants.JWT_SECRET)
                         .parseClaimsJws(strippedToken)
                         .body
                         .subject;

                 return if(user != null) {

                     UsernamePasswordAuthenticationToken(user,null, arrayListOf())

                 }  else {
                     null
                 }


             } catch ( exp : Exception) {
                 return null
                //throw TokenVerificationException("Could not verify token")
             }


         } else {
             return null
         }

    }

}

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
class TokenVerificationException(msg : String ) : RuntimeException(msg)