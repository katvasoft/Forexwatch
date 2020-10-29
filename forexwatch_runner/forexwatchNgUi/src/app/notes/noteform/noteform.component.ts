import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-noteform',
  templateUrl: './noteform.component.html',
  styleUrls: ['./noteform.component.css']
})
export class NoteformComponent implements OnInit {

  @Input()
  note: any; 

  @Input('accounts')
  accounts$ : Observable<any>;



  @Output()
  notesave = new EventEmitter();

  @Output()
  cancelform = new EventEmitter();

  @Output()
  deletenote = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  saveNote() {
    this.notesave.emit(this.note);
  }

  cancel() {
    this.cancelform.emit('');
  }

  delete() {
    this.deletenote.emit(this.note);
  }

}
