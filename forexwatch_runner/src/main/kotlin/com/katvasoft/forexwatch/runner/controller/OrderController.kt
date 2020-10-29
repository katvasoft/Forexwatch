package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.dto.DropdownValueDTO
import com.katvasoft.forexwatch.runner.controller.dto.OrderUpdateDTO
import com.katvasoft.forexwatch.runner.controller.dto.StatsDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.OrderInfoRepository
import com.katvasoft.forexwatch.runner.controller.service.OrderService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid


@RestController
@RequestMapping("api/order")
class OrderController {

    @Autowired
    lateinit var orderInforRepository :  OrderInfoRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var orderService: OrderService

    @Autowired
    lateinit var authHelper: AuthHelper

    val logger = LoggerFactory.getLogger(this.javaClass)

    @GetMapping
    fun listAll() = orderInforRepository.findAll()

    @GetMapping("{id}")
    fun findById(@PathVariable id : String) = orderInforRepository.findOne(id)

    @GetMapping("strategy/name")
    fun listOrderStrategies() : List<DropdownValueDTO> {
       val strategies = orderInforRepository.findDistinctStrategyName()
        return strategies.map { strat -> DropdownValueDTO(strat, strat) }
    }

    @PostMapping("comment")
    fun saveOrderComment(@RequestBody orderCommentUpdate: OrderUpdateDTO) {
        if(orderCommentUpdate.orderId != null) {

            val order = this.orderInforRepository.findOne(orderCommentUpdate.orderId)
            if(order != null) {
                order.orderComment = orderCommentUpdate.orderComment
                this.orderInforRepository.save(order)
            }
        }

    }

    @PostMapping
    fun saveOrder(@RequestBody orderInfo : OrderInfo) : OrderInfo?  {

        var ordInfo : OrderInfo? = null

        when {
            orderInfo.id != null -> {
                val ord = this.orderInforRepository.findOne(orderInfo.id)
                ord.orderComment = orderInfo.orderComment
                ordInfo = ord
            }
            else -> ordInfo = orderInfo
        }
        return orderInforRepository.save(ordInfo)

    }

    @GetMapping("stats")
    fun getUserAccountStats() : List<StatsDTO> {

        return orderService.getBasicStats(-14)

    }

    @GetMapping("stats/{accountId}")
    fun getStats(@PathVariable accountId: String): List<StatsDTO> {
        val today = Date()
        val cal = Calendar.getInstance()
        cal.time = today
        cal.add(Calendar.DATE, -14)

        val fromDate = cal.time
        val foundOrders =  orderInforRepository.findByOrderDateBetweenAndAccountIdOrderByOrderDateDesc(fromDate,today, accountId)
        val groupedOrders = foundOrders.groupBy { it -> it.strategyName }
        val stats = groupedOrders.keys.map (fun (key: String): StatsDTO {
            val orders = groupedOrders.get(key)
            val pipSum = orders?.map{it -> it.orderProfitLossPips}?.takeIf { it.isNotEmpty() }?.reduce {sum ,  it -> sum!! + it!!}

            val profitLoss = orders?.map{it -> it.orderProfitLoss}?.takeIf { it.isNotEmpty() }?.reduce {sum,  it -> sum!! + it!!}
            val account = this.accountRepository.findOne(accountId)
            return StatsDTO(accountId,account.accountName,key,pipSum,profitLoss)
        })

        return  stats

    }

    @DeleteMapping("{orderId}")
    fun deleteOrder(@PathVariable orderId: String) = orderInforRepository.delete(orderId)

    @PostMapping("find/date")
    fun findOrderByDateRange(@Valid @RequestBody dateRange : DateRangeQueryDTO) : List<OrderInfo> {

        logger.info("Querying logs with date range from: ${dateRange.fromDate} to: ${dateRange.toDate}")
        return orderService.findOrderByDateRange(dateRange)

    }

}