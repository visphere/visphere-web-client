/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { PopulateFormGroupService } from './populate-form-group.service';

describe('PopulateFormGroupService', () => {
  let service: PopulateFormGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopulateFormGroupService],
    });
    service = TestBed.inject(PopulateFormGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
