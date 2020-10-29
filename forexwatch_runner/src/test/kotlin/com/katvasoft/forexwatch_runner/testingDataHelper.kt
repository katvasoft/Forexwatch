package com.katvasoft.forexwatch_runner

import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.domain.AppUser
import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


fun getTestUsers() : List<AppUser>   {
    return listOf<AppUser>(AppUser("1234","tester","tester"),
            AppUser("5678","anotherTester","tester"))
}

fun getTestAccounts() : List<AccountInfo> {
    return listOf(AccountInfo("123","tester",100.0, 10.0,100.0,"123",
            100.0,100.0,"1234"),
            AccountInfo("456","anotherTester",100.0, 10.0,100.0, "123",
    100.0,100.0,"5678"))
}

fun getTestFromAndToDate(dateFrom: String, dateTo: String) : Pair<LocalDate, LocalDate> {
    val fromDate = LocalDate.parse(dateFrom)
    val toDate = LocalDate.parse(dateTo)
    return Pair<LocalDate, LocalDate>(fromDate,toDate)
}

fun getTestOrders() : List<OrderInfo> {
    val defaultZoneId = ZoneId.systemDefault()
    val dates = getTestFromAndToDate("2020-02-02","2020-02-03")
    val ndDates = getTestFromAndToDate("2020-01-02","2020-01-03")

    return listOf(
            OrderInfo("1324","test strategy","test order 123",1.0,"BUY","EURUSD",
                    "123","123","This is just a test", Date.from(dates.first.atStartOfDay(defaultZoneId).toInstant()),
                    Date.from(dates.second.atStartOfDay(defaultZoneId).toInstant()),1.2356,1.2354,1.2340,20.0,
                    1.12374,1.12374,20.0,false,null),
            OrderInfo("5678","test strategy 456","test order 456",1.0,"BUY","EURUSD",
                    "2352","456","This is just a test", Date.from(dates.first.atStartOfDay(defaultZoneId).toInstant()),
                    Date.from(dates.second.atStartOfDay(defaultZoneId).toInstant()),1.2356,1.2354,1.2340,20.0,
                    1.12374,1.12374,20.0,false,null),
            OrderInfo("5363","test strategy","test order 456",1.0,"BUY","EURUSD",
                    "2323552","123","This is just a test", Date.from(ndDates.first.atStartOfDay(defaultZoneId).toInstant()),
                    Date.from(ndDates.second.atStartOfDay(defaultZoneId).toInstant()),1.2356,1.2354,1.2340,20.0,
                    1.12374,1.12374,20.0,false,"tester")

    )

}