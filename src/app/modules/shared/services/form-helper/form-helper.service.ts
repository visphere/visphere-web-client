/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileValidatorResponse } from '~/shared-mod/models/file-validator.model';
import { FileExtensionType } from '~/shared-mod/types/file-extensions.type';
import {
  BoolFormValidationDataType,
  ControlType,
} from '~/shared-mod/types/form-helper.types';

@Injectable({ providedIn: 'root' })
export class FormHelperService {
  validateField(formGroup: FormGroup, formControlName: string): boolean {
    const formControl = formGroup.get(formControlName);
    if (!formControl) {
      throw new Error(`Form control name ${formControlName} not exist`);
    }
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  checkError(
    formGroup: FormGroup,
    formControlName: string,
    type: string
  ): boolean {
    return (
      this.getOnlyFirstError(formGroup.get(formControlName)!.errors) === type
    );
  }

  getOnlyFirstError(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }
    const keys = Object.keys(errors);
    if (keys && keys.length > 0) {
      return keys[0];
    }
    return null;
  }

  toggleFormField(
    formGroup: FormGroup,
    formControlName: string,
    isDisabled: boolean
  ): void {
    const formControl = formGroup.get(formControlName);
    if (isDisabled) {
      formControl?.disable();
    } else {
      formControl?.enable();
    }
  }

  boolFormDetails(
    formGroup: FormGroup,
    controls: ControlType[]
  ): BoolFormValidationDataType {
    return {
      someNoSelected: controls.some(c => !formGroup.get(c.name)?.value),
      allSelected:
        controls.map(c => !!formGroup.get(c.name)?.value).filter(v => v)
          .length === controls.length,
    };
  }

  toggleAllBoolValues(
    formGroup: FormGroup,
    controls: ControlType[],
    value: boolean
  ): void {
    controls.forEach(({ name, isRequired }) => {
      const control = formGroup.get(name);
      if (control) {
        control.patchValue(value);
        if (isRequired) {
          control.setErrors(value ? null : { required: true });
        }
      }
    });
  }

  validateFileInput(
    file: File | null,
    allowedExt: FileExtensionType[],
    maxFileSizeMb: number
  ): FileValidatorResponse | null {
    if (!file) {
      return {
        i18nError: `noFileChoose`,
      };
    }
    const fileExt = file.name.slice(
      ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
    );
    if (
      allowedExt.length !== 0 &&
      !(allowedExt as string[]).includes(fileExt)
    ) {
      return {
        i18nError: `notSupportedExt`,
        params: {
          extensions: allowedExt.join(', '),
        },
      };
    }
    const maxSizeInBytes = maxFileSizeMb * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return {
        i18nError: `tooLargeFileSize`,
        params: {
          size: maxFileSizeMb,
        },
      };
    }
    return null;
  }

  scaleImageWithKeepAr(
    image: HTMLImageElement,
    width: number
  ): Promise<File | undefined> {
    return new Promise((res, rej) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        rej();
      }
      canvas.width = width;
      canvas.height = image.height * (width / image.width);
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) {
          res(
            new File([blob], blob.name, {
              type: blob.type,
            })
          );
        } else {
          rej();
        }
      }, 'image/png');
    });
  }

  extractNumberValueParam(
    route: ActivatedRoute,
    name: string
  ): number | undefined {
    return Number(route.snapshot.paramMap.get(name)) ?? undefined;
  }
}
