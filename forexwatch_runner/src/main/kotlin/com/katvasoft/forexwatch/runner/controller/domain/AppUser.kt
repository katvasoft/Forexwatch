package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class AppUser (

        @Id
        val id : String?  = UUID.randomUUID().toString(),

        var username : String = "",

        var password: String = ""
)