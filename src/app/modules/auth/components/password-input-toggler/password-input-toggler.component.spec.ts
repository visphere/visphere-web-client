/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordInputTogglerComponent } from './password-input-toggler.component';

describe('PasswordInputTogglerComponent', () => {
  let component: PasswordInputTogglerComponent;
  let fixture: ComponentFixture<PasswordInputTogglerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [PopulateFormGroupService, PopulateFormControlService],
    }).compileComponents();

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      testField: new FormControl(''),
    });
    populateFormGroup.setField(formGroup);

    const populateFormControl = TestBed.inject(PopulateFormControlService);
    populateFormControl.setFields('testField', 'I18N_PREFIX');

    fixture = TestBed.createComponent(PasswordInputTogglerComponent);
    component = fixture.componentInstance;
    component.formControlIdentifier = 'testField';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
