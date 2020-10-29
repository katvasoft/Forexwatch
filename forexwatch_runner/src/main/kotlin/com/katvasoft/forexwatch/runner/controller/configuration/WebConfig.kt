package com.katvasoft.forexwatch.runner.controller.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

@Configuration
class WebConfig {

    @Bean
    fun corsHeaders(): WebMvcConfigurer {
        return object : WebMvcConfigurerAdapter() {
            override fun addCorsMappings(registry: CorsRegistry?) {
                configure(registry!!.addMapping("/**"))

            }
        }
    }

    private fun configure(corsRegistration: CorsRegistration): CorsRegistration {
        corsRegistration
                .allowedOrigins("*")
                .allowedMethods("POST", "PUT", "GET", "OPTIONS")
                .allowedHeaders("Authorization", "origin", "content-type", "accept", "x-requested-with")
                .exposedHeaders("Authorization","Accept")
                .allowCredentials(true)
                .maxAge(3600)
        return corsRegistration
    }

}