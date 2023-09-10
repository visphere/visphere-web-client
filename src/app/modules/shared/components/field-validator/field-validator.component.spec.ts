/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SharedModule } from '~/shared-mod/shared.module';
import { FieldValidatorComponent } from './field-validator.component';

describe('FieldValidatorComponent', () => {
  let component: FieldValidatorComponent;
  let fixture: ComponentFixture<FieldValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [PopulateFormGroupService, PopulateFormControlService],
    }).compileComponents();

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      testField: new FormControl(''),
    });
    populateFormGroup.setField(formGroup);

    const populateFormControl = TestBed.inject(PopulateFormControlService);
    populateFormControl.setFields('testField', 'I18N_PREFIX');

    fixture = TestBed.createComponent(FieldValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
