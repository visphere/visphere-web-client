/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordStrengthMeterComponent } from './password-strength-meter.component';

describe('PasswordStrenghtMeterComponent', () => {
  let component: PasswordStrengthMeterComponent;
  let fixture: ComponentFixture<PasswordStrengthMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordStrengthMeterComponent],
      providers: [PopulateFormGroupService],
    });

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      testField: new FormControl(''),
    });
    populateFormGroup.setField(formGroup);

    fixture = TestBed.createComponent(PasswordStrengthMeterComponent);
    component = fixture.componentInstance;
    component.formControlIdentifier = 'testField';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
