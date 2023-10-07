/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { AbstractControl, ValidationErrors } from '@angular/forms';

export type ExtendedValidatorErrors = ValidationErrors | null;

export type FcValidatorErrors = (
  control: AbstractControl
) => ExtendedValidatorErrors;
