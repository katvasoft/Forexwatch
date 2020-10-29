package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.domain.AccountInfo
import com.katvasoft.forexwatch.runner.controller.dto.AccountDTO
import com.katvasoft.forexwatch.runner.controller.repository.AccountRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AccountService {

    @Autowired
    lateinit var accountRepository: AccountRepository;

    fun addOrUpdateAccount(accountInfoDTO: AccountDTO) {

        val account = accountInfoDTO.accountId?.let { this.accountRepository.findById(it) }
        if(account != null) {
            this.accountRepository.save(mapDtoToDomain(accountInfoDTO,account))
        } else {
            this.accountRepository.save(mapDtoToDomain(accountInfoDTO))
        }

    }

    fun mapDtoToDomain(accountInfoDTO: AccountDTO) : AccountInfo {

        return AccountInfo(accountInfoDTO.accountId,accountInfoDTO.accountName,accountInfoDTO.accountEquity ,accountInfoDTO.accountUsedMargin,
                            accountInfoDTO.accountBalance,null,accountInfoDTO.accountLeverage,accountInfoDTO.accountFreeMargin)

    }

    fun mapDtoToDomain(accountInfoDTO: AccountDTO, accountInfo: AccountInfo) : AccountInfo {

        accountInfo.accountBalance = accountInfoDTO.accountBalance
        accountInfo.accountEquity = accountInfoDTO.accountEquity
        accountInfo.accountFreeMargin = accountInfoDTO.accountFreeMargin
        accountInfo.accountUsedMargin = accountInfoDTO.accountUsedMargin
        accountInfo.accountLeverage = accountInfoDTO.accountLeverage

        return accountInfo

    }

}