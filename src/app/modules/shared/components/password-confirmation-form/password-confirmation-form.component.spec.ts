/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { PasswordConfirmationFormComponent } from './password-confirmation-form.component';

describe('PasswordConfirmationFormComponent', () => {
  let component: PasswordConfirmationFormComponent;
  let fixture: ComponentFixture<PasswordConfirmationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PopulateFormGroupService, PasswordConfirmationService],
    }).compileComponents();
    fixture = TestBed.createComponent(PasswordConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
