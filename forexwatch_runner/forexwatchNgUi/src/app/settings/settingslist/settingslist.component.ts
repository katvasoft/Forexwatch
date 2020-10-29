import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-settingslist',
  templateUrl: './settingslist.component.html',
  styleUrls: ['./settingslist.component.css']
})
export class SettingsListComponent implements OnInit {

  @Input()
  settings: [];

  @Output()
  editsetting = new EventEmitter();

  @Output()
  deleteSetting = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(setting: any) {
    this.editsetting.emit(setting);
  }

  delete(setting: any) {
    this.deleteSetting.emit(setting);
  }

}
