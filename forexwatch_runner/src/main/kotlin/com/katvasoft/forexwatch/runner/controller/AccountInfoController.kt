package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.dto.AccountDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("api/account")
class AccountInfoController {

    @Autowired
    lateinit var accountRepository : AccountRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    val logger = LoggerFactory.getLogger(this.javaClass)

    @GetMapping
    fun listAccounts() : List<AccountDTO>  {
        val userId = authHelper.getLoggedUserId()
        logger.info("Listing user accounts for user : $userId")
        //TODO: Return 403 if appUserId is missing!
        return authHelper.listUserAccounts(userId)
    }

    @PostMapping
    fun addAccount(@Valid @RequestBody accountDto: AccountDTO) : AccountDTO? {

        //TODO: Return 403 if appUserId is missing!
        val appUserId = authHelper.getLoggedUserId()
        if(appUserId != null) {
            val addedAccount = this.accountRepository.save(AuthHelper.mapToEntity(accountDto, appUserId))
            return AuthHelper.mapFromEntity(addedAccount)
        }
        //TODO: return 403 if app user id is missing
        return null
    }

    @PutMapping
    fun updateAccount(@Valid @RequestBody accountDto: AccountDTO) : AccountDTO {

        //TODO: Return 403 if appUserId is missing!
        val appUserId = authHelper.getLoggedUserId()
        if(appUserId != null && accountDto.accountId != null) {

            val accountInfo = this.accountRepository.findById(accountDto.accountId)
            accountInfo.accountBalance = accountDto.accountBalance
            accountInfo.accountEquity = accountDto.accountEquity
            accountInfo.accountFreeMargin = accountDto.accountFreeMargin
            accountInfo.accountUsedMargin = accountDto.accountUsedMargin
            accountInfo.accountInitialBalance = accountDto.accountInitialBalance
            accountInfo.accountType = accountDto.accountType
            accountInfo.accountComment = accountDto.accountComment
            this.accountRepository.save(accountInfo)
        } else {
            logger.warn("Did not find any user with id : $appUserId")
        }
        return accountDto
    }

    @DeleteMapping("{id}")
    fun deleteAccount(@PathVariable id : String)  = accountRepository.delete(id)






}