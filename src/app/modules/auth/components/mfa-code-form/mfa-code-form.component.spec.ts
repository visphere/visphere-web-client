/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { MfaCodeService } from '~/auth-mod/services/mfa-code/mfa-code.service';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { MfaCodeFormComponent } from './mfa-code-form.component';

describe('MfaCodeFormComponent', () => {
  let component: MfaCodeFormComponent;
  let fixture: ComponentFixture<MfaCodeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MfaCodeService, PopulateFormGroupService],
    }).compileComponents();
    fixture = TestBed.createComponent(MfaCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
