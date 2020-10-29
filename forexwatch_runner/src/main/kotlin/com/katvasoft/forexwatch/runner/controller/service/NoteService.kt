package com.katvasoft.forexwatch.runner.controller.service

import com.katvasoft.forexwatch.runner.controller.domain.DailyNote
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.DailyNoteRepository
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*
import java.util.stream.Collectors

@Service
class NoteService {

    @Autowired
    lateinit var dailyNoteRepository: DailyNoteRepository

    @Autowired
    lateinit var authHelper: AuthHelper

    val logger = LoggerFactory.getLogger(this.javaClass)

    fun findAll() : List<DailyNote>  {

        val userId = this.authHelper.getLoggedUserId()
        val userAccounts = this.authHelper.listUserAccounts(userId)
        return userAccounts?.flatMap { account -> dailyNoteRepository.findAllByAccountId(account.accountId!!) }

    }

    fun saveNote(note: DailyNote) : DailyNote {
        if(note.id != null) {
            val existingNote = this.dailyNoteRepository.findOne(note.id)
            existingNote.note = note.note
            existingNote.noteTitle = note.noteTitle
            existingNote.noteDate = Date()
            return this.dailyNoteRepository.save(existingNote)
        } else {
            note.noteDate = Date()
            note.id = UUID.randomUUID().toString()
            return this.dailyNoteRepository.save(note)
        }

    }

    fun deleteNote(noteId: String) {
        this.dailyNoteRepository.delete(noteId)
    }

    fun findWithDateRange(fromDate: Date, toDate: Date, accountId: String) : List<DailyNote> {
        return this.dailyNoteRepository.findByNoteDateBetweenAndAccountId(fromDate, toDate, accountId)
    }

    fun findAllUserNotesWithDays(days: Int) : List<DailyNote> {
        val accounts = this.authHelper.listUserAccounts(this.authHelper.getLoggedUserId())
        return accounts.flatMap { account ->  this.findWithDateRange(getDateWithDays(days), Date(),account.accountId!!)}
    }

    fun findAllValidNotesForUser() : List<DailyNote> {
        val accounts = this.authHelper.listUserAccounts(this.authHelper.getLoggedUserId())
        return accounts.flatMap { accountDTO -> this.dailyNoteRepository.findByAccountIdAndNoteValidUntilBefore(accountDTO.accountId!!,Date())  }
    }

    fun getDateWithDays(days: Int) : Date {
        val cal = Calendar.getInstance()
        cal.add(Calendar.DATE,days)
        return cal.time
    }

}
