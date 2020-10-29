package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.StockInvestment
import com.katvasoft.forexwatch.runner.controller.dto.StockInvestmentDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.StockInvestmentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("api/stockInvestment")
class StockInvestmentController {

    @Autowired
    lateinit var stockInvestmentRepository: StockInvestmentRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    @GetMapping(value = "account/{id}")
    fun listAccountStockInvestments(@PathVariable id: String) : List<StockInvestmentDTO> {
        val appUserId = this.authHelper.getLoggedUserId()
        if(appUserId != null) {

            val stocks = stockInvestmentRepository.findByAccountId(id)
            return stocks.map { s -> StockInvestmentDTO(s.id,s.name,s.stockCount,s.stockPriceWhenBought,s.stockPriceAtTheMoment,s.percentageChangeToday,s.currentValue,s.currentProfitPercentage,s.currentProfit) }

        } else {
            return emptyList()
        }
    }

    @PostMapping("account/{id}")
    fun saveAccountStockInvestment(@PathVariable id : String,@RequestBody s : StockInvestmentDTO) : StockInvestment? {

        val stock = StockInvestment(UUID.randomUUID().toString(),s.name,s.stockCount,s.stockPriceWhenBought,s.stockPriceAtTheMoment,s.percentageChangeToday,s.currentValue,s.currentProfitPercentage,s.currentProfit,id)

        val savedStock = stockInvestmentRepository.save(stock)

        return savedStock
    }

    @DeleteMapping("{id}")
    fun deleteStockInvestment(@PathVariable id : String) {

        stockInvestmentRepository.delete(id)

    }

}