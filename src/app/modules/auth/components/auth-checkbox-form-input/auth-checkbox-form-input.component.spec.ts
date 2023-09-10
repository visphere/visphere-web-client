/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AuthCheckboxFormInputComponent } from './auth-checkbox-form-input.component';

describe('AuthCheckboxFormInputComponent', () => {
  let component: AuthCheckboxFormInputComponent;
  let fixture: ComponentFixture<AuthCheckboxFormInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [PopulateFormGroupService],
    }).compileComponents();

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      testField: new FormControl(false),
    });
    populateFormGroup.setField(formGroup);

    fixture = TestBed.createComponent(AuthCheckboxFormInputComponent);
    component = fixture.componentInstance;

    component.i18nPrefix = 'I18N_PREFIX';
    component.formControlIdentifier = 'testField';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
