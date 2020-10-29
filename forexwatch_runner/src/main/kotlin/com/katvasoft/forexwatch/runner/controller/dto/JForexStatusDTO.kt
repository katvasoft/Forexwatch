package com.katvasoft.forexwatch.runner.controller.dto

data class JForexStatusDTO (

        val connected : Boolean = false,
        val subscribedInstruments : List<String>? = null,
        val startedStrategies : List<JStrategyInfoDTO>? = null

)