package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.domain.OrderInfo
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface AccountRepository : CrudRepository<AccountInfo, String> {

    fun findById(id : String) : AccountInfo

    fun findByUserId(userId : String) : List<AccountInfo>

}