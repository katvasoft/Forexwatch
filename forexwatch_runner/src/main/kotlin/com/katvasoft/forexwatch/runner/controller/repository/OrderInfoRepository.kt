package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface OrderInfoRepository : CrudRepository<OrderInfo, String> {

    fun findByOrderDateBetweenAndAccountIdOrderByOrderDateDesc(fromDate : Date, toDate : Date, accountId : String) : List<OrderInfo>

    fun findByOrderDateBetweenAndStrategyNameAndAccountIdOrderByOrderDateDesc(fromDate : Date, toDate : Date, strategyName : String, accountId : String) : List<OrderInfo>

    fun findByOrderLabel ( orderLabel : String) : OrderInfo?

    fun findByOrderId (orderId : String ) : OrderInfo?

    @Query("SELECT DISTINCT o.strategyName FROM OrderInfo o")
    fun findDistinctStrategyName() : List<String>

}