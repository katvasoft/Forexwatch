package com.katvasoft.forexwatch_runner

import com.fasterxml.jackson.databind.ObjectMapper
import com.katvasoft.forexwatch.runner.controller.ForexwatchRunnerApplication
import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import com.katvasoft.forexwatch.runner.controller.dto.AccountDTO
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.AppUserRepository
import com.katvasoft.forexwatch.runner.controller.repository.OrderInfoRepository
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [ForexwatchRunnerApplication::class])
@AutoConfigureMockMvc
@TestPropertySource(locations = ["classpath:application.properties"])
class OrderControllerTests {

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var orderRepository: OrderInfoRepository

    @Autowired
    lateinit var appUserRepository: AppUserRepository

    @Autowired
    lateinit var objectMapper : ObjectMapper

    @Autowired
    lateinit var mockMvc : MockMvc

    @Before
    fun addOrders() {

        val users = getTestUsers()
        users.forEach{usr -> appUserRepository.save(usr)}

        val accounts = getTestAccounts()
        accounts.forEach{acc -> accountRepository.save(acc)}

        val orders = getTestOrders()
        orders.forEach{order -> orderRepository.save(order)}
    }



    @Test
    @WithMockUser("tester")
    fun testListAllOrders() {

        val mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/order").accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk).andReturn()

        val content = mvcResult.response.contentAsString
        val orderList = objectMapper.readValue(content, arrayOf<OrderInfo>()::class.java)
        assert(orderList.isNotEmpty())
    }

    @Test
    @WithMockUser("tester")
    fun testQueryOrders() {

        val defaultZoneId = ZoneId.systemDefault()
        val fromDate = LocalDate.parse("2020-02-01")
        val toDate = LocalDate.parse("2020-02-04")
        val dateRange = DateRangeQueryDTO(Date.from(fromDate.atStartOfDay(defaultZoneId).toInstant()),Date.from(toDate.atStartOfDay(defaultZoneId).toInstant()),null,"123")

        val mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/order/find/date")
                .content(objectMapper.writeValueAsString(dateRange))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk).andReturn()

        val content = mvcResult.response.contentAsString
        val orderList = objectMapper.readValue(content, arrayOf<OrderInfo>()::class.java)
        assert(orderList.isNotEmpty())
        assert(orderList.size == 1)
    }

    @Test
    @WithMockUser("tester")
    fun testAddAccount() {

        val accountDto = AccountDTO(accountId = "798532", accountName = "Added test account",accountEquity = 100.0,
                         accountUsedMargin = 0.0, accountFreeMargin = 100.0, accountBalance = 100.0)


        val mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.post("/api/account")
                .content(objectMapper.writeValueAsString(accountDto))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk).andReturn()

        val content = mvcResult.response.contentAsString
        val newAccountDto = objectMapper.readValue(content,AccountDTO::class.java)
        assert(newAccountDto != null)

        val secondResult = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/account").accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print()).andExpect(MockMvcResultMatchers.status().isOk).andReturn()

        val accountContent = secondResult.response.contentAsString
        val accountList = objectMapper.readValue(accountContent, arrayOf<AccountDTO>()::class.java)
        assert(accountList != null)
        assert(accountList.size == 2)

    }

}