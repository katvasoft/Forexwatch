package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.NewsEvent
import com.katvasoft.forexwatch.runner.controller.dto.JForexStatusDTO
import com.katvasoft.forexwatch.runner.controller.dto.StockInvestmentDTO
import com.katvasoft.forexwatch.runner.controller.helper.Constants
import com.katvasoft.forexwatch.runner.controller.repository.NewsEventRepository
import com.katvasoft.forexwatch.runner.controller.repository.StockInvestmentRepository
import com.katvasoft.forexwatch.runner.controller.service.SettingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.lang.RuntimeException

@RestController
@RequestMapping("external/api")
class ExternalApiController {

    @Autowired
    lateinit var settingService: SettingService



    @Autowired
    lateinit var newsEventRepository: NewsEventRepository

    @Autowired
    lateinit var stockInvestmentRepository: StockInvestmentRepository

    @PostMapping("{clientKey}/stock")
    fun saveStockInvestmentUpdateInfo(@PathVariable clientKey: String, @RequestBody stockInvestmentDTO: StockInvestmentDTO) {
        try {

            val setting = settingService.findByName(Constants.PROP_SETTING_CLIENT_ID)

            if(setting != null && setting.settingValue.equals(clientKey)) {

                val stocks = stockInvestmentDTO.name?.let { stockInvestmentDTO.stockCount?.let { it1 -> stockInvestmentRepository.findByNameAndStockCount(it, it1) } }

                if (stocks != null && stocks.isNotEmpty()) {
                  stocks.forEach { s -> {
                      s.currentProfit = stockInvestmentDTO.currentProfit
                      s.currentProfitPercentage = stockInvestmentDTO.currentProfitPercentage
                      s.currentValue = stockInvestmentDTO.currentValue
                      s.percentageChangeToday = stockInvestmentDTO.percentageChangeToday
                      s.stockCount = stockInvestmentDTO.stockCount
                      s.stockPriceAtTheMoment = stockInvestmentDTO.stockPriceAtTheMoment
                      stockInvestmentRepository.save(s)
                  } }
                }

            } else {
                throw NotFoundException("Not found")
            }

        } catch (e : Exception) {
            throw NotFoundException(e.toString())
        }
    }

    @PostMapping("{clientKey}/newsEvent")
    fun saveNewsEvent(@PathVariable clientKey: String, @RequestBody newsEvent: NewsEvent) {

        try {

            val setting = settingService.findByName(Constants.PROP_SETTING_CLIENT_ID)

            if(setting != null && setting.settingValue.equals(clientKey)) {

                newsEventRepository.save(newsEvent)

            } else {
                throw NotFoundException("Not found")
            }

        } catch (e : Exception)  {
            throw NotFoundException(e.toString())
        }

    }

}

@ResponseStatus(code = HttpStatus.NOT_FOUND)
class NotFoundException(msg : String) : RuntimeException(msg)