import { TestBed } from '@angular/core/testing';
import { FormatHelperService } from './format-helper.service';

describe('FormatHelperService', () => {
  let service: FormatHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
