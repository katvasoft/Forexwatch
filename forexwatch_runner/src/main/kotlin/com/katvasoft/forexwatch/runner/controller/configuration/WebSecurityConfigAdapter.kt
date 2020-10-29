package com.katvasoft.forexwatch.runner.controller.configuration

import com.katvasoft.forexwatch.runner.controller.configuration.filter.CorsFilter
import com.katvasoft.forexwatch.runner.controller.configuration.filter.JwtAuthFilter
import com.katvasoft.forexwatch.runner.controller.configuration.filter.JwtTokenAuthFilter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.access.channel.ChannelProcessingFilter

@Configuration
@EnableWebSecurity
class WebSecurityConfigAdapter : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var userDetailsService : UserDetailsService

    @Autowired
    lateinit var bcryptEncoder : PasswordEncoder

    override fun configure(http: HttpSecurity?) {

        http?.authorizeRequests()
                ?.antMatchers(HttpMethod.OPTIONS, "/**")?.permitAll()
                ?.antMatchers("/login")?.permitAll()
                ?.antMatchers("/api/**")?.authenticated()
                ?.anyRequest()?.permitAll()
                ?.antMatchers("/external/**")?.permitAll()
                ?.and()
                ?.addFilterBefore(CorsFilter(),ChannelProcessingFilter::class.java)
                ?.addFilter(JwtAuthFilter(authenticationManager()))
                ?.addFilter(JwtTokenAuthFilter(authenticationManager()))
                ?.sessionManagement()?.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ?.and()?.cors()?.disable()?.csrf()?.disable()



    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.userDetailsService(userDetailsService)?.passwordEncoder(bcryptEncoder)

    }

    @Bean
    fun pwordEncoder() : PasswordEncoder {

        return BCryptPasswordEncoder()
    }
}