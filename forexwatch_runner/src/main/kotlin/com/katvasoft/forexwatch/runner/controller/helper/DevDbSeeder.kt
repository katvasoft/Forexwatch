package com.katvasoft.forexwatch.runner.controller.helper

import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.domain.AppUser
import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import com.katvasoft.forexwatch.runner.controller.domain.StrategyLogMessage
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.AppUserRepository
import com.katvasoft.forexwatch.runner.controller.repository.OrderInfoRepository
import com.katvasoft.forexwatch.runner.controller.repository.StrategyLogMessageRepository
import org.hibernate.criterion.Order
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.core.env.Environment
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.*

@Service
class DevDbSeeder {

    @Autowired
    lateinit var environment : Environment

    @Autowired
    lateinit var orderInfoRepository :  OrderInfoRepository

    @Autowired
    lateinit var appUserRepository : AppUserRepository

    @Autowired
    lateinit var bcrypPasswordEncoder : BCryptPasswordEncoder

    @Autowired
    lateinit var strategyLogMessageRepository : StrategyLogMessageRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @EventListener
    fun seedDb(event : ContextRefreshedEvent) {

        if(environment.activeProfiles != null && !environment.activeProfiles.isEmpty() &&
                 environment.activeProfiles.last().equals("development")) {

            val orders = this.orderInfoRepository.findAll()

            val accounts = this.accountRepository.findAll()

            if(accounts == null || accounts.count() < 1) {

                val accountInfo = AccountInfo(id = UUID.randomUUID().toString(), accountName = "testAccount", accountEquity = 5200.0, accountBalance = 5000.0, accountFreeMargin = 5100.0, accountUsedMargin = 100.0)

                accountRepository.save(accountInfo)
            }

            if(orders == null || orders.count() < 1) {

                val orderInfo = OrderInfo(id = UUID.randomUUID().toString(), strategyName = "Test Strategy",
                        lots = 10000.0, orderType = "BUY", orderInstrument = "EURUSD", orderProfitLossPips = 21.2, orderComment = "order comment",
                        orderLabel = "Test order", orderDate = Date(), orderOpen = true )

                orderInfoRepository.save(orderInfo)

                val orderInfoTwo = OrderInfo(id = UUID.randomUUID().toString(), strategyName = "Test Strategy", orderProfitLossPips = 25.2,
                        lots = 10000.0, orderType = "BUY", orderInstrument = "EURUSD", orderLabel = "Test order 2", orderDate = Date(), orderOpen = false)

                orderInfoRepository.save(orderInfoTwo)

                val usr = appUserRepository.findByUsername("admin")

                if (usr == null) {

                    val ussr = AppUser(username = "admin", password = bcrypPasswordEncoder.encode("admin"))

                    this.appUserRepository.save(ussr)
                }

                val strategyLogMessage = StrategyLogMessage(id = UUID.randomUUID().toString(), logDate = Date(), logMessage = "This is a test log message",
                        detailLogMessage = "This is a test", messageType = "Order info", orderId = "12", orderLabel = "Test order label")

                this.strategyLogMessageRepository.save(strategyLogMessage)



            }

        } else if(environment.activeProfiles != null && !environment.activeProfiles.isEmpty() &&
                environment.activeProfiles.last().equals("prod")) {

            val usr = appUserRepository.findByUsername("admin")

            if(usr == null) {

                val ussr = AppUser(username = "admin", password = bcrypPasswordEncoder.encode("ThePword"))

                this.appUserRepository.save(ussr)
            }

        }

    }

}