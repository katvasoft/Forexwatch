import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwordchangeComponent } from './pwordchange.component';

describe('PwordchangeComponent', () => {
  let component: PwordchangeComponent;
  let fixture: ComponentFixture<PwordchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwordchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwordchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
