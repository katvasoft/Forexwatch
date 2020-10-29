package com.katvasoft.forexwatch.runner.controller.helper


import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.dto.AccountDTO
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import com.katvasoft.forexwatch.runner.controller.repository.AppUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.util.*

@Component
class AuthHelper {

    @Autowired
    lateinit var appUserRepository: AppUserRepository

    @Autowired
    lateinit var accountRepository : AccountRepository

    fun getLoggedUserId() : String? {
        val auth = SecurityContextHolder.getContext().authentication;
        val appUser = appUserRepository.findByUsername(auth.name)
        return appUser?.id
    }

    fun listUserAccounts(userId : String?) : List<AccountDTO> {
        if(userId != null) {
            val accountInfos =  this.accountRepository.findByUserId(userId)
            return accountInfos.map { accountInfo -> mapFromEntity(accountInfo) }
        } else {
            return emptyList<AccountDTO>()
        }
    }

    companion object {
        fun mapFromEntity(addedAccount: AccountInfo) = AccountDTO(accountId = addedAccount.id, accountBalance = addedAccount.accountBalance,
                accountFreeMargin = addedAccount.accountFreeMargin,accountUsedMargin = addedAccount.accountUsedMargin,
                accountEquity = addedAccount.accountEquity, accountName = addedAccount.accountName, accountComment = addedAccount.accountComment,
                accountInitialBalance = addedAccount.accountInitialBalance, accountType = addedAccount.accountType, apiKey = addedAccount.accountApiKey)

        fun mapToEntity(accountDto : AccountDTO, appUserId: String) =  AccountInfo(id = accountDto.accountId?: UUID.randomUUID().toString(),
                accountName = accountDto.accountName, accountType = accountDto.accountType,
                accountBalance = accountDto.accountBalance, accountEquity = accountDto.accountEquity,
                accountComment =  accountDto.accountComment, accountInitialBalance = accountDto.accountInitialBalance,
                accountFreeMargin = accountDto.accountFreeMargin, accountUsedMargin = accountDto.accountUsedMargin,
                userId = appUserId, accountApiKey = accountDto.apiKey)
    }
}