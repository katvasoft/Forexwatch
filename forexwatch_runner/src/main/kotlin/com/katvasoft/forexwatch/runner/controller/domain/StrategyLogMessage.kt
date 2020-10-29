package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class StrategyLogMessage (

        @Id
        val id : String = UUID.randomUUID().toString(),

        var logDate: Date? = null,

        var logMessage : String? = null,

        var detailLogMessage : String? = null,

        var messageType : String? = null,

        var accountId : String? = null,

        var orderId : String? = null,

        var orderLabel : String? = null

)