import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteOptionsComponent } from './note-options.component';

describe('NoteOptionsComponent', () => {
  let component: NoteOptionsComponent;
  let fixture: ComponentFixture<NoteOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteOptionsComponent]
    });
    fixture = TestBed.createComponent(NoteOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
