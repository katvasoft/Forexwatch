package com.katvasoft.forexwatch.runner.controller.domain


import javax.persistence.*


@Entity
data class FStrategy (

        @Id
        val id : String? = null,

        var strategyName : String = "",

        var jforexId : Long? = null,

        var completeClassname : String = "",

        var clazzClassLocation : String  = "",

        @OneToMany(mappedBy = "strategy", fetch = FetchType.EAGER, cascade = [(CascadeType.ALL)])
        var parameters: MutableList<FStrategyParameter>? = null,

        var running : Boolean = false

)