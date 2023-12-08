/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SingleSelectSpinnerComponent } from './single-select-spinner.component';

describe('SingleSelectSpinnerComponent', () => {
  let component: SingleSelectSpinnerComponent;
  let fixture: ComponentFixture<SingleSelectSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PopulateFormGroupService, PopulateFormControlService],
    }).compileComponents();

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      testField: new FormControl(null),
    });
    populateFormGroup.setField(formGroup);

    const populateFormControl = TestBed.inject(PopulateFormControlService);
    populateFormControl.setFields('testField', 'I18N_PREFIX');

    fixture = TestBed.createComponent(SingleSelectSpinnerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
