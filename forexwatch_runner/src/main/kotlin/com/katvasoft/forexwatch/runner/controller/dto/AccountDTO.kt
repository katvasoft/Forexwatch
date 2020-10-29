package com.katvasoft.forexwatch.runner.controller.dto

import org.hibernate.validator.constraints.NotBlank

data class AccountDTO (

        val accountId : String? = null,

        @NotBlank(message = "Account name is mandatory")
        val accountName : String? = null,

        val accountEquity : Double? = null,

        val accountUsedMargin : Double? = null,

        val accountFreeMargin : Double? = null,

        val accountBalance : Double? = null,

        val accountType : String? = null,

        val accountLeverage : Double ? = null,

        val accountInitialBalance : Double? = null,

        val accountComment: String? = null,

        val apiKey : String? = null

)