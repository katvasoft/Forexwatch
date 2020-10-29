package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class StrategyLogEvent (
        @Id
        val id : String? = null,

        var accountId : String? = null,

        var strategyName : String? = null,

        var logMessage : String? = null,

        var logEventDate : Date? = null,

        var logMessageType : String? = null,

        var orderId : String? = null
)

