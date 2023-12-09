/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { UpdatableEmailStartFormComponent } from './updatable-email-start-form.component';

describe('UpdatableEmailStartFormComponent', () => {
  let component: UpdatableEmailStartFormComponent;
  let fixture: ComponentFixture<UpdatableEmailStartFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(UpdatableEmailStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
