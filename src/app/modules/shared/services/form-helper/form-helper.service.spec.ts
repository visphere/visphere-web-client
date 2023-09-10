/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { FormHelperService } from './form-helper.service';

describe('FormHelperService', () => {
  let service: FormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
