package com.katvasoft.forexwatch.runner.controller.dto

import org.hibernate.validator.constraints.NotBlank
import java.util.*

data class DateRangeQueryDTO (
        val fromDate : Date? = null,
        val toDate : Date? = null,
        val strategyName : String? = null,
        @NotBlank(message = "Account id is mandatory")
        val accountId : String? = null,
        val priority : Int? = null,
        val orderId : String? = null,
        val logEventType : String? = null
)