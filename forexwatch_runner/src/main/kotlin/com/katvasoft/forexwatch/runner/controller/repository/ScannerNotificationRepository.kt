package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.ScannerNotification
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ScannerNotificationRepository : CrudRepository<ScannerNotification, String> {

    fun findByAccountIdAndNotificationDateBetween(accountId: String, fromDate : Date, toDate : Date) : List<ScannerNotification>

    fun findAllByAccountId(accountId: String) : List<ScannerNotification>

    fun findAllByAccountIdAndPriorityAndNotificationDateBetween(accountId: String, priority: Int, from : Date, to : Date) : List<ScannerNotification>
}