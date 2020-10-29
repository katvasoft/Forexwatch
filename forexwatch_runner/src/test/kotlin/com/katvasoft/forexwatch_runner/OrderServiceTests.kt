package com.katvasoft.forexwatch_runner


import com.katvasoft.forexwatch.runner.controller.ForexwatchRunnerApplication
import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.OrderInfoRepository
import com.katvasoft.forexwatch.runner.controller.service.AccountService
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringRunner
import java.time.LocalDate
import java.time.ZoneId
import java.util.*

@RunWith(SpringRunner::class)
@SpringBootTest()
@ContextConfiguration(classes = arrayOf(ForexwatchRunnerApplication::class))
@DataJpaTest
class OrderServiceTests {

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var orderRepository: OrderInfoRepository

    @Before
    fun addOrders() {
        val account = AccountInfo("123","tester",100.0, 10.0,100.0,"123",
                                100.0,100.0,"tester", 100.0,"Test")
        val defaultZoneId = ZoneId.systemDefault()
        accountRepository.save(account)
        val dates = getTestFromAndToDate()

        val order = OrderInfo("1324","test strategy","test order 123",1.0,"BUY","EURUSD",
                                    "123","123","This is just a test", Date.from(dates.first.atStartOfDay(defaultZoneId).toInstant()),
                                    Date.from(dates.second.atStartOfDay(defaultZoneId).toInstant()),1.2356,1.2354,1.2340,20.0,
                                    1.12374,1.12374,20.0,false,"tester")

        orderRepository.save(order)
    }

    fun getTestFromAndToDate() : Pair<LocalDate,LocalDate> {
        val fromDate = LocalDate.parse("2020-02-02")
        val toDate = LocalDate.parse("2020-02-03")
        return Pair<LocalDate,LocalDate>(fromDate,toDate)
    }

    @Test
    fun testFindOrdersBetween() {

        val fromDate = LocalDate.parse("2020-02-01")
        val toDate = LocalDate.parse("2020-02-04")
        val defaultZoneId = ZoneId.systemDefault()

        val result = this.orderRepository.findByOrderDateBetweenAndAccountIdOrderByOrderDateDesc(Date.from(fromDate.atStartOfDay(defaultZoneId).toInstant()),
                                                                                                 Date.from(toDate.atStartOfDay(defaultZoneId).toInstant()),
                                                                                                    "123")

        assert(result.isNotEmpty() && result.size == 1)

    }


    fun testTryFindOrdersBetween() {

        val fromDate = LocalDate.parse("2020-02-01")
        val toDate = LocalDate.parse("2020-02-04")
        val defaultZoneId = ZoneId.systemDefault()

        val result = this.orderRepository.findByOrderDateBetweenAndAccountIdOrderByOrderDateDesc(Date.from(fromDate.atStartOfDay(defaultZoneId).toInstant()),
                Date.from(toDate.atStartOfDay(defaultZoneId).toInstant()),
                "111")

        assert(result.isEmpty() && result.size == 0)
    }
}