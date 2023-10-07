/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AppModule } from '~/root-mod/app.module';
import { FinishResetPasswordFormComponent } from './finish-reset-password-form.component';

describe('FinishResetPasswordFormComponent', () => {
  let component: FinishResetPasswordFormComponent;
  let fixture: ComponentFixture<FinishResetPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService],
    }).compileComponents();
    fixture = TestBed.createComponent(FinishResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
