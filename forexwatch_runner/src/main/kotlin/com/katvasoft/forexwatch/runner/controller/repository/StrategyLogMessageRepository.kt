package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.StrategyLogMessage
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StrategyLogMessageRepository : CrudRepository<StrategyLogMessage, String> {

    fun findByLogDateBetweenOrderByLogDateDesc(from : Date, to : Date) : List<StrategyLogMessage>

}