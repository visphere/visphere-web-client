/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { MyAccountSettingsPageComponent } from './my-account-settings-page.component';

describe('MyAccountSettingsPageComponent', () => {
  let component: MyAccountSettingsPageComponent;
  let fixture: ComponentFixture<MyAccountSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(MyAccountSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
