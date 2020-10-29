import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/State';
import { ListDailyNotesAction, SaveNoteAction, FetchAccountsAction,DeleteNoteAction } from '../store/Actions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Select(AppState.DailyNotes)
  dailyNotes$: Observable<any>;

  @Select(AppState.Accounts)
  accounts$ : Observable<any>;

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$ : Observable<any>;

  @Select(AppState.Message)
  message$ : Observable<any>;

  showEdit = false;

  selectedNote = {
    'id': null,
    'noteDate' : null,
    'noteValidUntil' : null,
    'noteTitle' : null,
    'note' : null,
    'accountId': null,
    'instrument': null
  }


  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new FetchAccountsAction());
    this.store.dispatch(new ListDailyNotesAction());
  }

  saveNote(note: any) {
    this.store.dispatch(new SaveNoteAction(note));
    this.showEdit = false;
  }
  
  cancelEdit(event:any) {
    this.showEdit = false;
    this.emptySelectedNote();
  }

  createNewNote() {
    this.emptySelectedNote();
    this.showEdit = true;
  }

  editNote(note:any) {
    this.selectedNote = note;
    this.showEdit = true;
  }

  delete(note:any) {
    this.store.dispatch(new DeleteNoteAction(note.id));
    this.emptySelectedNote();
    this.showEdit = false;
  }

  emptySelectedNote() {
    this.selectedNote = {
      'id': null,
      'noteDate' : null,
      'noteValidUntil' : null,
      'noteTitle' : null,
      'note' : null,
      'accountId': null,
      'instrument': null
    }
  }

}
