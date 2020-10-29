package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.Setting
import com.katvasoft.forexwatch.runner.controller.dto.DropdownValueDTO
import com.katvasoft.forexwatch.runner.controller.service.SettingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.lang.RuntimeException
import java.util.*
import javax.validation.Valid

@RestController
@RequestMapping("api/setting")
class SettingController {

    @Autowired
    lateinit var settingService : SettingService

    @GetMapping
    fun listSettings() : List<Setting> = settingService.findAllSettings()

    @GetMapping("account/{accountId}")
    fun listAccountSettings(@PathVariable accountId : String) = settingService.getAccountSettings(accountId)

    @GetMapping("group/{accountId}")
    fun listSettingGroups(@PathVariable accountId: String) : List<DropdownValueDTO> {
        val settingGroups = this.settingService.listSettingGroupNames(accountId)
        return settingGroups.map { s -> DropdownValueDTO(s,s) }
    }

    @PostMapping
    fun saveSetting(@Valid @RequestBody setting: Setting) : Setting {
        return settingService.saveSetting(setting)
    }

    @PutMapping
    fun updateSetting(@RequestBody setting: Setting) : Setting = settingService.updateSetting(setting)

    @DeleteMapping(value = "{id}")
    fun deleteSetting(@PathVariable id: String ) = settingService.deleteSetting(id)

}