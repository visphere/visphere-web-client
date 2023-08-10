/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: auth-change-password-page.component.spec.ts
 *    Last modified: 7/10/23, 8:52 PM
 *    Project name: moonsphere
 *    Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project completing a
 * engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '~/root-mod/app.module';
import { AuthModule } from '~/auth-mod/auth.module';

import { AuthChangePasswordPageComponent } from './auth-change-password-page.component';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('AuthChangePasswordPageComponent', () => {
  let component: AuthChangePasswordPageComponent;
  let fixture: ComponentFixture<AuthChangePasswordPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AuthChangePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
