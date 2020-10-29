package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.AccountAlert
import com.katvasoft.forexwatch.runner.controller.dto.AccountAlertDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountAlertRepository
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.validation.Valid

@RestController
@RequestMapping("api/accountAlert")
class AccountAlertController {

    @Autowired
    lateinit var accountAlertRepository: AccountAlertRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    @GetMapping
    fun listAccountAlerts() : List<AccountAlertDTO> {

        val appUserId = this.authHelper.getLoggedUserId()
        if(appUserId != null) {
            val accountInfos =  this.accountRepository.findByUserId(appUserId)
            val alerts = accountInfos.flatMap{ ai -> accountAlertRepository.findByAccountId(ai.id!!) }
            val accountInfoMap = accountInfos.map { it.id to it }.toMap()
            val alertDtos = alerts.map { ai ->
                val accountInfo = accountInfoMap.get(ai.accountId)
                 AccountAlertDTO(ai.id,ai.accountId, accountInfo?.accountName, ai.strategyId,ai.strategyId,ai.minBalance, strategyDaysToCheck = ai.strategyDaysToCheck)
            }
            return alertDtos
        }else {
            return emptyList()
        }
    }

    @PostMapping
    fun saveAlert(@Valid @RequestBody accountAlert: AccountAlertDTO) {

        val saveAccount = if (accountAlert.id == null) AccountAlert(UUID.randomUUID().toString(),accountAlert.accountId,accountAlert.strategyName,accountAlert.minBalance, accountAlert.strategyDaysToCheck) else
            AccountAlert(accountAlert.id,accountAlert.accountId,accountAlert.strategyName,accountAlert.minBalance,accountAlert.strategyDaysToCheck)

        accountAlertRepository.save(saveAccount)
    }

    @DeleteMapping(value = "{id}")
    fun deleteAlert(@PathVariable id: String) = accountAlertRepository.delete(id)

}