package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.StockInvestment
import org.springframework.data.repository.CrudRepository

interface StockInvestmentRepository : CrudRepository<StockInvestment, String> {

    fun findByAccountId(accountId : String) : List<StockInvestment>

    fun findByNameAndStockCount(name : String, stockCount : Int) : List<StockInvestment>
}