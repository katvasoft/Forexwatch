package com.katvasoft.forexwatch.runner.controller.domain

import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Setting (

        @Id
        val id : String? = null,

        var settingGroupName : String? = "",

        var settingName : String = "",

        var settingValue : String = "",

        var settingAccountId : String = ""

)




