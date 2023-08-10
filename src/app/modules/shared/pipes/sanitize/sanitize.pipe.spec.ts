/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: sanitize.pipe.spec.ts
 *   Created at: 2023-08-06, 18:55:39
 *   Last updated at: 2023-08-11, 00:07:41
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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

import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {
  let pipe: SanitizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();
    pipe = new SanitizePipe(TestBed.inject(DomSanitizer));
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove scripts value', () => {
    const mockedExploit =
      "<script>alert('hello! I am very angry exploit :)')</script><h2>I'm polite.</h2>";
    const result = pipe.transform(mockedExploit);
    expect(result).toBe("<h2>I'm polite.</h2>");
  });
});
