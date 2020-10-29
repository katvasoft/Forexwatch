package com.katvasoft.forexwatch.runner.controller.domain

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class DailyNote (

        @Id
        var id : String? = null,

        var noteDate : Date? = null,

        var noteValidUntil : Date? = null,

        var noteTitle : String? = null,

        @Column(length=8060)
        var note : String? = null,

        var accountId : String? = null,

        var instrument : String? = null

)