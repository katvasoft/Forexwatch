package com.katvasoft.forexwatch.runner.controller.domain

import javax.persistence.*

@Entity
data class FStrategyParameter (

        @Id
        val id : String? = null,

        var parameterName : String = "",

        var parameterValue : String = "",

        @ManyToOne
        var strategy : FStrategy?  = null

)



