/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditOfComponent } from './editOf.component';

describe('EditOfComponent', () => {
  let component: EditOfComponent;
  let fixture: ComponentFixture<EditOfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
