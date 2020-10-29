package com.katvasoft.forexwatch.runner.controller.domain

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class AccountInfo (

    @Id
    val id : String? = null,

    var accountName : String? = null,

    var accountEquity : Double? = null,

    var accountUsedMargin : Double? = null,

    var accountBalance : Double? = null,

    var accountApiKey : String? = null,

    var accountLeverage : Double? = null,

    var accountFreeMargin : Double? = null,

    var userId: String? = null,

    var accountInitialBalance: Double? = null,

    var accountType: String? = null,

    var accountComment: String? = null
)