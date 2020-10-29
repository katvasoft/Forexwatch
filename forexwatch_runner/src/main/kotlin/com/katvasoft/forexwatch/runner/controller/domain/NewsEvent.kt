package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class NewsEvent {

    @Id
    val id : String? = null

    var newsEventDate : Date? = Date()

    var currency : String? = null

    var newsEventMsg : String? = null

    // From 1 - 3. Bigger the number more volatile news is
    var volatility : Int? = null

    var previous : Double? = null

    var expected : Double? = null

    var actual : Double? = null

    var buy : Boolean? = null

}