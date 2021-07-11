import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGymComponent } from './details-gym.component';

describe('DetailsGymComponent', () => {
  let component: DetailsGymComponent;
  let fixture: ComponentFixture<DetailsGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGymComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
