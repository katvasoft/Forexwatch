package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.ScannerNotification
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.service.ScannerNotificationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("api/scannerNotification")
class ScannerNotificationController {

    @Autowired
    lateinit var scannerNotificationService: ScannerNotificationService

    @PostMapping("query")
    fun listScannerNotificationsByDate(@RequestBody dateRangeQueryDTO: DateRangeQueryDTO) : List<ScannerNotification> {
        return if(dateRangeQueryDTO.accountId != null && dateRangeQueryDTO.fromDate != null && dateRangeQueryDTO.toDate != null) {
            if(dateRangeQueryDTO.priority == null) {
                this.scannerNotificationService.findWithDateRangeAndAccountId(dateRangeQueryDTO.fromDate,dateRangeQueryDTO.toDate, dateRangeQueryDTO.accountId)
            } else {
                this.scannerNotificationService.findWithDateRangeAccountIdAndPriority(dateRangeQueryDTO.fromDate,dateRangeQueryDTO.toDate,dateRangeQueryDTO.accountId,dateRangeQueryDTO.priority)
            }

        } else if (dateRangeQueryDTO.fromDate != null && dateRangeQueryDTO.toDate != null && dateRangeQueryDTO.accountId == null) {
            this.scannerNotificationService.findWithDateRange(dateRangeQueryDTO.fromDate, dateRangeQueryDTO.toDate)
        } else {
            emptyList()
        }
    }

    @GetMapping
    fun listCurrentDatesNotifications(): List<ScannerNotification> {
        val today = Date()

        val cal = Calendar.getInstance()
        cal.time = today
        cal.add(Calendar.DATE, -1)

        return this.scannerNotificationService.findWithDateRange(cal.time, today)
    }

}