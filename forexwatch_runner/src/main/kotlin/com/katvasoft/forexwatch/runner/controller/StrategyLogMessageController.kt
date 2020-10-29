package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.StrategyLogMessage
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.repository.StrategyLogMessageRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("api/log/strategy")
class StrategyLogMessageController {

    @Autowired
    lateinit var strategyLogMessageRepository : StrategyLogMessageRepository

    @GetMapping
    fun listAll() = strategyLogMessageRepository.findAll()

    @PostMapping("find/date")
    fun findByDateRange( @RequestBody dateRangeQueryDTO: DateRangeQueryDTO) : List<StrategyLogMessage> {

        return if(dateRangeQueryDTO.fromDate != null && dateRangeQueryDTO.toDate != null) {

            strategyLogMessageRepository.findByLogDateBetweenOrderByLogDateDesc(dateRangeQueryDTO.fromDate, dateRangeQueryDTO.toDate)

        } else {

            listOf<StrategyLogMessage>()

        }

    }

    @PostMapping("remove/date")
    fun removeByByDateRange(@RequestBody dateRangeQueryDTO: DateRangeQueryDTO) {

        if(dateRangeQueryDTO.fromDate != null && dateRangeQueryDTO.toDate != null) {

            val logMessages = strategyLogMessageRepository.findByLogDateBetweenOrderByLogDateDesc(dateRangeQueryDTO.fromDate, dateRangeQueryDTO.toDate)

            logMessages.forEach{ lm -> strategyLogMessageRepository.delete(lm.id)}

        }

    }

}