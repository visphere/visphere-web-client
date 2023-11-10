/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ModalUtilsService } from './modal-utils.service';

describe('ModalUtilsService', () => {
  let service: ModalUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
