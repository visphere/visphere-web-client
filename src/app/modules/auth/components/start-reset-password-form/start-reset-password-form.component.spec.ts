/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: start-reset-password-form.component.spec.ts
 *   Created at: 2023-08-27, 00:10:52
 *   Last updated at: 2023-08-27, 00:15:44
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
