package com.katvasoft.forexwatch.runner.controller

import com.katvasoft.forexwatch.runner.controller.domain.DailyNote
import com.katvasoft.forexwatch.runner.controller.dto.DateRangeQueryDTO
import com.katvasoft.forexwatch.runner.controller.helper.AuthHelper
import com.katvasoft.forexwatch.runner.controller.repository.DailyNoteRepository
import com.katvasoft.forexwatch.runner.controller.service.NoteService
import org.mockito.internal.util.collections.ListUtil
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/note")
class NoteController {

    @Autowired
    lateinit var noteService: NoteService

    @PostMapping
    fun saveNote(@RequestBody dailyNote: DailyNote) : DailyNote {
        return this.noteService.saveNote(dailyNote)
    }

    @DeleteMapping("{noteId}")
    fun deleteNote(@PathVariable noteId : String) {
        this.noteService.deleteNote(noteId)
    }

    @PostMapping("query")
    fun listNotesByDate(@RequestBody dateRangeQueryDTO: DateRangeQueryDTO) : List<DailyNote> {
        return if(dateRangeQueryDTO.fromDate != null && dateRangeQueryDTO.toDate != null && dateRangeQueryDTO.accountId != null) {
            this.noteService.findWithDateRange(dateRangeQueryDTO.fromDate,dateRangeQueryDTO.toDate, dateRangeQueryDTO.accountId)
        } else {
            emptyList()
        }
    }

    @GetMapping
    fun listCurrentAndValidNotes() : Set<DailyNote> {
        val currentNotes =  this.noteService.findAllUserNotesWithDays(-1)
        val validNotes = this.noteService.findAllValidNotesForUser()
        return currentNotes.union(validNotes)
    }
}