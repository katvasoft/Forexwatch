import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotLogMessagesComponent } from './bot-log-messages.component';

describe('BotLogMessagesComponent', () => {
  let component: BotLogMessagesComponent;
  let fixture: ComponentFixture<BotLogMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotLogMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotLogMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
