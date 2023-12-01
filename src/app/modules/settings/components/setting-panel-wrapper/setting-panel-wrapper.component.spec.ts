/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { SettingPanelWrapperComponent } from './setting-panel-wrapper.component';

describe('SettingPanelWrapperComponent', () => {
  let component: SettingPanelWrapperComponent;
  let fixture: ComponentFixture<SettingPanelWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SettingPanelWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
