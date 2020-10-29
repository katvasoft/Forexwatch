package com.katvasoft.forexwatch_runner


import com.katvasoft.forexwatch.runner.controller.ForexwatchRunnerApplication
import com.katvasoft.forexwatch.runner.controller.domain.FStrategy
import com.katvasoft.forexwatch.runner.controller.domain.FStrategyParameter
import com.katvasoft.forexwatch.runner.controller.domain.Setting
import com.katvasoft.forexwatch.runner.controller.dto.AccountDTO
import com.katvasoft.forexwatch.runner.controller.helper.Constants
import com.katvasoft.forexwatch.runner.controller.repository.FStrategyRepository
import com.katvasoft.forexwatch.runner.controller.repository.OrderInfoRepository
import com.katvasoft.forexwatch.runner.controller.service.SettingService
import org.junit.Before
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringRunner
import java.util.*


@RunWith(SpringRunner::class)
@SpringBootTest()
@ContextConfiguration(classes = arrayOf(ForexwatchRunnerApplication::class))
class ForexwatchRunnerApplicationTests() {

	@Autowired lateinit var strategyRepo : FStrategyRepository

	@Autowired lateinit var orderRepo : OrderInfoRepository

	@Autowired lateinit var settingService: SettingService



	@Before
	fun addStrategy() {

		val params = mutableListOf<FStrategyParameter>()

		val strategy = FStrategy(id = UUID.randomUUID().toString(),strategyName = "Test", parameters = params,running =  false)

		val param = FStrategyParameter(id = UUID.randomUUID().toString(),parameterName = "Test param", parameterValue = "Test param value", strategy = strategy)

		strategy.parameters?.add(param)

		strategyRepo.save(strategy)

		val setting = Setting(null,null, Constants.PROP_SETTING_EMAIL_RECEIVER,"tuomas.katva@gmail.com")

		settingService.saveSetting(setting)

	}

	@Ignore
	@Test
	fun testContextLoads() {
	}



	@Test
	fun testFindStrategy() {

		val strategies = strategyRepo.findAll()

		org.junit.Assert.assertNotNull(strategies)

		org.junit.Assert.assertTrue(strategies.first() != null)

	}



	fun createAccountDto() : AccountDTO {

		val accountInfoDTO = AccountDTO(accountName = "Test account", accountBalance = 100.0, accountEquity = 100.0)

		return accountInfoDTO
	}
}

