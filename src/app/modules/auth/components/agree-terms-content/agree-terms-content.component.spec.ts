/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/root-mod/modules/shared/context/populate-form-group/populate-form-group.service';
import { AgreeTermsContentComponent } from './agree-terms-content.component';

describe('AgreeTermsContentComponent', () => {
  let component: AgreeTermsContentComponent;
  let fixture: ComponentFixture<AgreeTermsContentComponent>;

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

    fixture = TestBed.createComponent(AgreeTermsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
