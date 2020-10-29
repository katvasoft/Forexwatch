package com.katvasoft.forexwatch.runner.controller.dto

data class  AccountAlertDTO (

        val id : String? = null,

        val accountId : String? = null,

        val accountName : String? = null,

        val strategyId : String? = null,

        val strategyName : String? = null,

        val minBalance : Double? = null,

        val strategyDaysToCheck : Int? = null

)