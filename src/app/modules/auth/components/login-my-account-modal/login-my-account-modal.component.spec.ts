/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { AppModule } from '~/root-mod/app.module';
import { LoginMyAccountModalComponent } from './login-my-account-modal.component';

describe('LoginMyAccountModalComponent', () => {
  let component: LoginMyAccountModalComponent;
  let fixture: ComponentFixture<LoginMyAccountModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MyAccountsService],
    });
    fixture = TestBed.createComponent(LoginMyAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
