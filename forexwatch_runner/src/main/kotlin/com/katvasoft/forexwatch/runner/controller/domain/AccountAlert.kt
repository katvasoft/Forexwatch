package com.katvasoft.forexwatch.runner.controller.domain

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class AccountAlert (

        @Id
        val id : String? = null,

        val accountId : String? = null,

        val strategyId : String? = null,

        val minBalance : Double? = null,

        val strategyDaysToCheck : Int? = null
)