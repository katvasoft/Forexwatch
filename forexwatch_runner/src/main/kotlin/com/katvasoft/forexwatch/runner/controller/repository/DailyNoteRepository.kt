package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.DailyNote
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface DailyNoteRepository : CrudRepository<DailyNote,String>{

    fun findByNoteDateBetweenAndAccountId(fromDate: Date, toDate: Date, accountId: String) : List<DailyNote>

    fun findByAccountIdAndNoteValidUntilBefore(accountId: String, currentDate: Date) : List<DailyNote>

    fun findAllByAccountId(accountId: String) : List<DailyNote>
}
