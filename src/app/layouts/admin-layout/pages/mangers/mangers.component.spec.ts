import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangersComponent } from './mangers.component';

describe('MangersComponent', () => {
  let component: MangersComponent;
  let fixture: ComponentFixture<MangersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
