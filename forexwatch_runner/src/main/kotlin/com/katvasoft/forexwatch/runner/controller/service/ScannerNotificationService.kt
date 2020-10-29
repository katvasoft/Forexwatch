package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.domain.ScannerNotification
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.ScannerNotificationRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class ScannerNotificationService {

    @Autowired
    lateinit var scannerNotificationRepository: ScannerNotificationRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    val logger = LoggerFactory.getLogger(this.javaClass)

    fun findWithDateRange(dateFrom: Date, dateTo: Date) : List<ScannerNotification> {
        val userId = this.authHelper.getLoggedUserId()
        val accounts = this.authHelper.listUserAccounts(userId)

        return accounts.flatMap { accountDTO ->
            this.scannerNotificationRepository.findByAccountIdAndNotificationDateBetween(accountDTO.accountId!!, dateFrom, dateTo) }
    }

    fun findWithDateRangeAndAccountId(dateFrom: Date, dateTo: Date, accountId : String) : List<ScannerNotification> {

        return this.scannerNotificationRepository.findByAccountIdAndNotificationDateBetween(accountId, dateFrom, dateTo)
    }

    fun findWithDateRangeAccountIdAndPriority(dateFrom: Date, dateTo: Date, accountId: String, priority: Int) : List<ScannerNotification> {

        return this.scannerNotificationRepository.findAllByAccountIdAndPriorityAndNotificationDateBetween(accountId,priority,dateFrom,dateTo)
    }

}