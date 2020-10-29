package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class OrderInfo (

        @Id
        val id : String? = null,

        var strategyName : String = "",

        var orderLabel : String = "",

        var lots : Double = 0.0,

        var orderType : String = "",

        var orderInstrument : String = "",

        var orderId : String = "",

        var accountId : String? = null,

        var orderComment : String? = null,

        var orderDate : Date? = null,

        var orderCloseDate: Date? = null,

        var orderAskPrice : Double? = 0.0,

        var orderBidPrice : Double? = 0.0,

        var orderStopLoss : Double? = 0.0,

        var orderProfitLoss : Double? = 0.0,

        var orderTakeProfit : Double? = 0.0,

        var orderClosePrice : Double? = 0.0,

        var orderProfitLossPips : Double? = 0.0,

        var orderOpen : Boolean = false,

        var userId : String? = null

)