package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.domain.Setting
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.SettingRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.lang.RuntimeException
import java.util.*

@Service
class SettingService {

    @Autowired
    lateinit var settingRepository : SettingRepository

    @Autowired
    lateinit var accountRepository: AccountRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    fun saveSetting(setting : Setting) : Setting {

        if(setting.id != null) {
            return updateSetting(setting)
        } else {
            val existingSetting = this.settingRepository.findBySettingName(setting.settingName)
            if (existingSetting == null) {
                val settingToSave = Setting(id = UUID.randomUUID().toString(), settingName = setting.settingName,
                        settingGroupName = setting.settingGroupName,
                        settingValue = setting.settingValue, settingAccountId =  setting.settingAccountId)
                return this.settingRepository.save(settingToSave)
            } else {
                throw RuntimeException("Setting with same name exists!")
            }
        }

    }

    fun updateSetting(setting : Setting) : Setting {

        val existingSetting = if(setting.id != null) {
            this.settingRepository.findOne(setting.id)
        } else {
            this.settingRepository.findBySettingName(setting.settingName)
        }

        existingSetting.settingName = setting.settingName
        existingSetting.settingValue = setting.settingValue
        existingSetting.settingGroupName = setting.settingGroupName

        return this.settingRepository.save(existingSetting)

    }

    fun deleteSetting(id : String) {

        this.settingRepository.delete(id)

    }

    fun getAccountSettings(accountId : String ) : List<Setting> {

        return this.settingRepository.findBySettingAccountId(accountId)
    }

    fun findByName(name : String) : Setting {

        return this.settingRepository.findBySettingName(name)

    }

    fun findAllSettings() : List<Setting> {
        val userId = authHelper.getLoggedUserId()
        if(userId != null) {
            val accountInfos =  this.accountRepository.findByUserId(userId)
            val allSettings = accountInfos.flatMap { accountInfo -> settingRepository.findBySettingAccountId(accountInfo.id!!) }
            return allSettings
        } else {
            return emptyList()
        }
    }

    fun listSettingGroupNames(accountId: String) : List<String> {
        return this.settingRepository.findDistinctSettingGroupName(accountId).filterNotNull()
    }

}