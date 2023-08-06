/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: birth-date.validator.ts
 *    Last modified: 7/13/23, 12:01 AM
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

import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Injectable } from "@angular/core";

import { TimeUtilsService } from "~/shared-mod/services/time-utils/time-utils.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: "root" })
export class BirthDateValidator {

    constructor(
        private readonly _timeUtilsService: TimeUtilsService,
    ) {
    };

    validate(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.touched) return null;

            const countOfNulls = Object
                .values(control.value)
                .filter(v => !v).length;

            if (countOfNulls === 0) {
                if (!this._timeUtilsService.checkIfDateIsValid(control.value)) {
                    return { invalid: true };
                }
                if (!this._timeUtilsService.checkIfUserHas13YearsOld(control.value)) {
                    return { inappropriateAge: true };
                }
                return null;
            }
            if (countOfNulls < 3 && countOfNulls > 0) {
                return { notAll: true };
            }
            if (countOfNulls === 3) {
                return { required: true };
            }
            return null;
        };
    };
}
