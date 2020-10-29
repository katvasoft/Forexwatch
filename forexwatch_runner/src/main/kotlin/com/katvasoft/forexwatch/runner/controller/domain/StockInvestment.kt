package com.katvasoft.forexwatch.runner.controller.domain

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class StockInvestment (

    @Id
    val id : String? = null,

    val name : String? = null,

    var stockCount : Int? = null,

    var stockPriceWhenBought : Double? = null,

    var stockPriceAtTheMoment : Double? = null,

    var percentageChangeToday : Double? = null,

    var currentValue : Double? = null,

    var currentProfitPercentage : Double? = null,

    var currentProfit : Double? = null,

    val accountId : String? = null

)