package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.AccountAlert
import org.springframework.data.repository.CrudRepository

interface AccountAlertRepository : CrudRepository<AccountAlert,String> {

    fun findByAccountId(accountId : String) : List<AccountAlert>
}