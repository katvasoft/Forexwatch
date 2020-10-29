package com.katvasoft.forexwatch.runner.controller

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@SpringBootApplication
@EnableScheduling
class ForexwatchRunnerApplication

fun main(args: Array<String>) {
    SpringApplication.run(ForexwatchRunnerApplication::class.java, *args)
}

