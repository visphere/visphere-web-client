/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { CheckboxFormInputComponent } from './checkbox-form-input.component';

describe('CheckboxFormInputComponent', () => {
  let component: CheckboxFormInputComponent;
  let fixture: ComponentFixture<CheckboxFormInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PopulateFormGroupService],
    }).compileComponents();

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      testField: new FormControl(false),
    });
    populateFormGroup.setField(formGroup);

    fixture = TestBed.createComponent(CheckboxFormInputComponent);
    component = fixture.componentInstance;

    component.i18nPrefix = 'I18N_PREFIX';
    component.formControlIdentifier = 'testField';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
