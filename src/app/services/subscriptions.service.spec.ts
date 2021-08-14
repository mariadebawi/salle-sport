/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubscriptionsService } from './subscriptions.service';

describe('Service: Subscriptions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionsService]
    });
  });

  it('should ...', inject([SubscriptionsService], (service: SubscriptionsService) => {
    expect(service).toBeTruthy();
  }));
});
