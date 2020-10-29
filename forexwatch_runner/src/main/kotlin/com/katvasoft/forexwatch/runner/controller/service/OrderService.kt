package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.dto.StatsDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.OrderInfoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestBody
import java.util.*
import javax.validation.Valid


@Service
class OrderService {

    @Autowired
    lateinit var orderRepository : OrderInfoRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var authHelper : AuthHelper

    fun checkIsOrderFound(label: String?, id : String?) : OrderInfo? {

        return if(id != null) {
            val order = orderRepository.findByOrderId(id)
            if(order != null) {
                order
            } else if (label != null){
                orderRepository.findByOrderLabel(label)
            } else {
                null
            }
        } else if(label != null) {
            orderRepository.findByOrderLabel(label)
        } else {
            null
        }

    }

    fun getBasicStats(numberFromDays : Int) : List<StatsDTO> {

        val accounts = authHelper.listUserAccounts(authHelper.getLoggedUserId())

        val dateQuerys = accounts.map { acc -> getBasicDateRangeQuery(acc.accountId, numberFromDays) }

        val orders = dateQuerys.flatMap { dateRangeQueryDTO -> findOrderByDateRange(dateRangeQueryDTO)  }

        val strategyOrders = orders.filter { ord -> ord.strategyName != null }

        val strategys = orderRepository.findDistinctStrategyName().filterNotNull()

        val stats = strategys.map { strategy -> calculateBasicStats(strategyOrders.filter { ord -> ord.strategyName.equals(strategy) } )}
                .filterNotNull()

        return  stats
    }

    fun calculateBasicStats(orders : List<OrderInfo>) : StatsDTO? {

        val profitLoss = orders.sumByDouble { orderInfo -> orderInfo.orderProfitLoss?: 0.0 }
        val profitLossPips = orders.sumByDouble { orderInfo -> orderInfo.orderProfitLossPips ?: 0.0 }
        if(orders.isNotEmpty()) {
            val order = orders.get(0)

            val accountInfo = order.accountId?.let { accountRepository.findById(it) }
            val profitLossPercentage = accountInfo?.accountInitialBalance?.let { ((profitLoss / accountInfo.accountInitialBalance!!) * 100) }

            return StatsDTO(order.accountId,accountInfo?.accountName,order.strategyName,profitLossPips,profitLoss,accountInfo?.accountInitialBalance,profitLossPercentage)

        } else {
            return null
        }

    }


    fun getBasicDateRangeQuery(accountId : String?, days: Int) : DateRangeQueryDTO {
        val cal = Calendar.getInstance()
        cal.add(Calendar.DATE,days)
        val today = Date()
        val dateRange = DateRangeQueryDTO(accountId = accountId, fromDate = cal.time, toDate = today)
        return dateRange

    }

    fun findOrderByDateRange(@Valid @RequestBody dateRange : DateRangeQueryDTO) : List<OrderInfo> {
        return if(dateRange.fromDate != null && dateRange.toDate != null && dateRange.strategyName == null) {
            val foundOrders =  orderRepository.findByOrderDateBetweenAndAccountIdOrderByOrderDateDesc(dateRange.fromDate,dateRange.toDate, dateRange.accountId ?: "");
            foundOrders
        } else if (dateRange.fromDate != null && dateRange.toDate != null && dateRange.strategyName != null) {
            val foundOrders = orderRepository.findByOrderDateBetweenAndStrategyNameAndAccountIdOrderByOrderDateDesc(dateRange.fromDate,dateRange.toDate,dateRange.strategyName, dateRange.accountId ?: "")
            foundOrders
        }

        else {
            listOf<OrderInfo>()
        }

    }

    /*
    fun checkAndUpdateOrAddOrder(orderDto : OrderDTO) {

        if(orderDto.accountId == null) {
            throw RuntimeException("No account id found for order")
        }

        val account = this.accountRepository.findById(orderDto.accountId)

        val order = checkIsOrderFound(orderDto.orderLabel,orderDto.orderId)

        if(order != null) {
            val updatedOrder = mapOrderDtoToExistingOrderInfo(orderDto,order)
            if(!updatedOrder.orderOpen) {
                orderNotifier.sendOrderCloseMessage(orderDto)
            }
            this.orderRepository.save(updatedOrder)
        } else {
            val newOrder = mapOrderDTOToNewOrderInfo(orderDto, account)
            this.orderRepository.save(newOrder)
            orderNotifier.sendOrderCreatedMessage(orderDto)
        }

    }*/



}