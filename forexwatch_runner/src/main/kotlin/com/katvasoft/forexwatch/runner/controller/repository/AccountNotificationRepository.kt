package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.AccountNotification
import org.springframework.data.repository.CrudRepository

interface AccountNotificationRepository : CrudRepository<AccountNotification, String> {

    fun findByUserId(userId : String) : List<AccountNotification>

}
