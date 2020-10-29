package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.AccountNotification
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountNotificationRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("api/notification")
class AccountNotificationController {

    val logger = LoggerFactory.getLogger(this.javaClass)

    @Autowired
    lateinit var accountNotificationRepository: AccountNotificationRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    @PostMapping
    fun saveNotificationSubscription(@RequestBody accountNotification: AccountNotification) {
        val accNot = AccountNotification(UUID.randomUUID().toString(),accountNotification.notEndpoint,accountNotification.key256dh,accountNotification.keyAuth,authHelper.getLoggedUserId())
        this.accountNotificationRepository.save(accNot)
    }

    @DeleteMapping("account/{id}")
    fun removeAccountNotifications(@PathVariable id: String) {
        val notifications = this.accountNotificationRepository.findByUserId(id)
        notifications.forEach{
            this.accountNotificationRepository.delete(it.id)
        }
    }
}