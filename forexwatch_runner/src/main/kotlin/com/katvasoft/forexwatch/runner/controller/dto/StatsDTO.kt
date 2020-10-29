package com.katvasoft.forexwatch.runner.controller.dto

data class StatsDTO (

        val accountId: String? = null,

        val accountName: String? = null,

        val strategyName: String? = null,

        val profitLossPips: Double? = null,

        val profitLoss: Double? = null,

        val initialDeposit: Double? = null,

        val percentProfitLossFromInitialSum: Double? = null
)