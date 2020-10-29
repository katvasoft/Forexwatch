package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import com.katvasoft.forexwatch.runner.controller.domain.StrategyLogEvent
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.dto.DropdownValueDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.StrategyLogEventRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class StrategyLogService {

    @Autowired
    lateinit var strategyLogEventRepository: StrategyLogEventRepository

    @Autowired
    lateinit var authHelper : AuthHelper

    val logger = LoggerFactory.getLogger(this.javaClass)

    fun listLogEventTypes() : List<DropdownValueDTO> {
        val logEventTypes = this.strategyLogEventRepository.findDistinctLogMessageType()
        return logEventTypes.map { et -> DropdownValueDTO(et, et) }
    }

    fun listByDateRangeQuery(dateRange: DateRangeQueryDTO) : List<StrategyLogEvent> {

        return if(dateRange.fromDate != null && dateRange.toDate != null && dateRange.strategyName == null && dateRange.accountId != null) {
            if(dateRange.logEventType != null) {
                return this.strategyLogEventRepository.findByLogEventDateBetweenAndAccountIdAndLogMessageTypeOrderByLogEventDateDesc(dateRange.fromDate,dateRange.toDate,dateRange.accountId,dateRange.logEventType)
            } else {
                return this.strategyLogEventRepository.findByLogEventDateBetweenAndAccountIdOrderByLogEventDateDesc(dateRange.fromDate,dateRange.toDate,dateRange.accountId)
            }

        } else if (dateRange.fromDate != null && dateRange.toDate != null && dateRange.strategyName != null && dateRange.accountId != null) {
            return this.strategyLogEventRepository.findByLogEventDateBetweenAndAccountIdAndStrategyNameOrderByLogEventDateDesc(dateRange.fromDate,dateRange.toDate,dateRange.accountId, dateRange.strategyName)
        }

        else {
            listOf<StrategyLogEvent>()
        }
    }
}