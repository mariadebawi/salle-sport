/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RenouvelementComponent } from './Renouvelement.component';

describe('RenouvelementComponent', () => {
  let component: RenouvelementComponent;
  let fixture: ComponentFixture<RenouvelementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenouvelementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenouvelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
