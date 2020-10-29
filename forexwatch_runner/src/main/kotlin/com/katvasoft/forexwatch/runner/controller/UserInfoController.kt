package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.dto.PasswordChangeDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AppUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/usr")
class UserInfoController {

    @Autowired
    lateinit var userRepository: AppUserRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    @Lazy
    @Autowired
    lateinit var bCryptPasswordEncoder : PasswordEncoder

    @PostMapping("pword")
    fun changePassword(@RequestBody passwordChangeDTO: PasswordChangeDTO) {
        val usrId = authHelper.getLoggedUserId()
        val usr = userRepository.findOne(usrId)


        if(bCryptPasswordEncoder.matches(passwordChangeDTO.oldPassword,usr.password)) {
            usr.password = bCryptPasswordEncoder.encode(passwordChangeDTO.newPassword)
            userRepository.save(usr)
        }

    }

}