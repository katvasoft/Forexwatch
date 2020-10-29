package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class ScannerNotification (

        @Id
        var id : String? = null,

        var scannerName : String? = null,

        var instrument : String? = null,

        var priority : Int? = null,

        var notificationDate : Date? = null,

        var notificationMessage : String? = null,

        var accountId : String? = null
)