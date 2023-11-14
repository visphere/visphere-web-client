/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { Oauth2LoginService } from '~/auth-mod/services/oauth2-login/oauth2-login.service';
import { AppModule } from '~/root-mod/app.module';
import { Oauth2ButtonComponent } from './oauth2-button.component';

describe('Oauth2ButtonComponent', () => {
  let component: Oauth2ButtonComponent;
  let fixture: ComponentFixture<Oauth2ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [Oauth2LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(Oauth2ButtonComponent);
    component = fixture.componentInstance;

    component.oauth2Type = 'facebook';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
