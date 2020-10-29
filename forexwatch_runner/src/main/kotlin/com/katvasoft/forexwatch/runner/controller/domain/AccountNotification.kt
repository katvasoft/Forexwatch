package com.katvasoft.forexwatch.runner.controller.domain

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class AccountNotification (

        @Id
        val id : String? = null,

        var notEndpoint : String? = null,

        var key256dh : String? = null,

        var keyAuth : String? = null,

        var userId : String? = null
)