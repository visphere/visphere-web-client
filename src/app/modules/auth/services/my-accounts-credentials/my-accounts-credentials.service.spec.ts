import { TestBed } from '@angular/core/testing';
import { MyAccountsCredentialsService } from './my-accounts-credentials.service';

describe('MyAccountsCredentialsService', () => {
  let service: MyAccountsCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAccountsCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
