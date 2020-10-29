package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.StrategyLogEvent
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StrategyLogEventRepository : CrudRepository<StrategyLogEvent, String> {

    fun findByLogEventDateBetweenAndAccountIdOrderByLogEventDateDesc(fromDate: Date, toDate: Date, accountId : String) : List<StrategyLogEvent>

    fun findByLogEventDateBetweenAndAccountIdAndLogMessageTypeOrderByLogEventDateDesc(fromDate: Date, toDate: Date, accountId : String, logMessageType : String) : List<StrategyLogEvent>

    fun findByLogEventDateBetweenAndOrderIdOrderByLogEventDateDesc(fromDate: Date, toDate: Date, accountId : String) : List<StrategyLogEvent>

    fun findByLogEventDateBetweenAndAccountIdAndStrategyNameOrderByLogEventDateDesc(fromDate: Date, toDate: Date, accountId : String, strategyName : String) : List<StrategyLogEvent>

    @Query("SELECT DISTINCT o.logMessageType FROM StrategyLogEvent o")
    fun findDistinctLogMessageType() : List<String>
}