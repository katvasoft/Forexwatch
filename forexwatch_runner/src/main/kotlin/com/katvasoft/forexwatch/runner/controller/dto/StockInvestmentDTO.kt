package com.katvasoft.forexwatch.runner.controller.dto

data class StockInvestmentDTO (

    val id : String? = null,

    val name : String? = null,

    val stockCount : Int? = null,

    val stockPriceWhenBought : Double? = null,

    val stockPriceAtTheMoment : Double? = null,

    val percentageChangeToday : Double? = null,

    val currentValue : Double? = null,

    val currentProfitPercentage : Double? = null,

    val currentProfit : Double? = null
)