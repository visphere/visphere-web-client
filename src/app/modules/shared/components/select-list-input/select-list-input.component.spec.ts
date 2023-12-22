/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SelectListInputComponent } from './select-list-input.component';

describe('SelectListInputComponent', () => {
  let component: SelectListInputComponent;
  let fixture: ComponentFixture<SelectListInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [PopulateFormGroupService],
    }).compileComponents();
    fixture = TestBed.createComponent(SelectListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
