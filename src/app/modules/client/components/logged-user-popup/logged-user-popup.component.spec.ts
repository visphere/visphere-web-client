/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { LoggedUserPopupComponent } from './logged-user-popup.component';

describe('LoggedUserPopupComponent', () => {
  let component: LoggedUserPopupComponent;
  let fixture: ComponentFixture<LoggedUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LoggedUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
