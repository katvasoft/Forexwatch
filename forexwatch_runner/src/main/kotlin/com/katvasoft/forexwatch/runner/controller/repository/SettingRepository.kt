package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.Setting
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface SettingRepository : CrudRepository<Setting, String> {

    fun findBySettingName(settingName : String ) : Setting

    fun findBySettingGroupName(settingGroupName : String) : List<Setting>

    fun findBySettingAccountId(settingAccountId : String) : List<Setting>

    @Query("SELECT DISTINCT s.settingGroupName FROM Setting s WHERE s.settingAccountId = :accountId")
    fun findDistinctSettingGroupName(@Param("accountId") accountId : String) : List<String>

}