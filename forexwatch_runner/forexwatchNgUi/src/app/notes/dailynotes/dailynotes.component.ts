import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-dailynotes',
  templateUrl: './dailynotes.component.html',
  styleUrls: ['./dailynotes.component.css'],
  viewProviders: [MatExpansionPanel] 
})
export class DailynotesComponent implements OnInit {

  @Input()
  notes: [];

  @Input()
  showedit = false;

  @Output()
  editnote = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(note: any) {
    this.editnote.emit(note);
  }

}
