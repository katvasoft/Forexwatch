package com.katvasoft.forexwatch.runner.controller.configuration.filter

import java.io.IOException;
import javax.servlet.FilterChain

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


import org.springframework.web.filter.OncePerRequestFilter

class CorsFilter : OncePerRequestFilter(){

    override fun doFilterInternal(request: HttpServletRequest?, response: HttpServletResponse?, filterChain: FilterChain?) {

        response?.addHeader("Access-Control-Allow-Origin", "*")
        response?.addHeader("Access-Control-Expose-Headers", "Context-Type, Authorization")

        if (request?.getHeader("Access-Control-Request-Method") != null && "OPTIONS" == (request.method)) {

            // CORS "pre-flight" request
            response?.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

            response?.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
            response?.addHeader("Access-Control-Max-Age", "1")
            response?.addHeader("Access-Control-Expose-Headers", "Context-Type, Authorization")
        }

        filterChain?.doFilter(request,response)
    }
}