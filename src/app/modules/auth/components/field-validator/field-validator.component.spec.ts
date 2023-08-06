/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: field-validator.component.spec.ts
 *    Last modified: 7/11/23, 12:24 AM
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

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AppModule } from "~/root-mod/app.module";
import { AuthModule } from "~/auth-mod/auth.module";

import { FieldValidatorComponent } from "./field-validator.component";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("FieldValidatorComponent", () => {
    let component: FieldValidatorComponent;
    let fixture: ComponentFixture<FieldValidatorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AuthModule,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(FieldValidatorComponent);
        component = fixture.componentInstance;

        component.formControlIdentifier = "testControl";
        component.formGroup = new FormGroup({
            "testControl": new FormControl("", [ Validators.required ]),
        });

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
