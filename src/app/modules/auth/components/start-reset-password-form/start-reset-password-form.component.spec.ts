/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AppModule } from '~/root-mod/app.module';
import { StartResetPasswordFormComponent } from './start-reset-password-form.component';

describe('StartResetPasswordFormComponent', () => {
  let component: StartResetPasswordFormComponent;
  let fixture: ComponentFixture<StartResetPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService],
    }).compileComponents();
    fixture = TestBed.createComponent(StartResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
