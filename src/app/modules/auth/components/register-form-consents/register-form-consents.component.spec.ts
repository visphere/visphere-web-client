/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { RegisterFormConsentsComponent } from './register-form-consents.component';

describe('RegisterFormConsentsComponent', () => {
  let component: RegisterFormConsentsComponent;
  let fixture: ComponentFixture<RegisterFormConsentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [PopulateFormGroupService],
    }).compileComponents();

    const populateFormGroup = TestBed.inject(PopulateFormGroupService);
    const formGroup = new FormGroup({
      allowNotifs: new FormControl(false),
      enabledMfa: new FormControl(true),
      agreeTerms: new FormControl(false),
    });
    populateFormGroup.setField(formGroup);

    fixture = TestBed.createComponent(RegisterFormConsentsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
