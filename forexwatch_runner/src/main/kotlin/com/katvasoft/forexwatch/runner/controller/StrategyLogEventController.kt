package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.StrategyLogEvent
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.StrategyLogEventRepository
import com.katvasoft.forexwatch.runner.controller.service.StrategyLogService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("api/strategyLog")
class StrategyLogEventController {

    @Autowired
    lateinit var strategyLogService: StrategyLogService

    val logger = LoggerFactory.getLogger(this.javaClass)

    @PostMapping
    fun findLogEventsByDateRange(@Valid @RequestBody dateRange : DateRangeQueryDTO) : List<StrategyLogEvent> {
        val retVal = strategyLogService.listByDateRangeQuery(dateRange)
        return retVal;
    }

    @GetMapping("type")
    fun listLogEventTypes() = strategyLogService.listLogEventTypes()

}