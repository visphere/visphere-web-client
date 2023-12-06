/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserDataFillFormResDto } from '~/auth-mod/models/oauth2-data.model';
import { FillDataService } from '~/auth-mod/services/fill-data/fill-data.service';
import { AccountValueAlreadyExistValidator } from '~/auth-mod/validators/account-value-already-exist.validator';
import { environment } from '~/env/environment';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { regex } from '~/shared-mod/validators/regex.constant';
import { requiredBoolValidator } from '~/shared-mod/validators/required-bool.validator';

@Component({
  selector: 'vsph-fill-data-form',
  templateUrl: './fill-data-form.component.html',
  providers: [PopulateFormGroupService],
})
export class FillDataFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  fillDataForm!: FormGroup;
  path = environment.baseLandingUrl;
  selectAllToggle = false;
  controls = [
    { name: 'allowNotifs', isRequired: false },
    { name: 'agreeTerms', isRequired: true },
  ];
  someNoSelected = true;
  allSelected = false;

  isLoading$: Observable<boolean> = this._fillDataService.isLoading$;

  userData$: Observable<UserDataFillFormResDto | null> =
    this._fillDataService.userData$;

  formDisabled$: Observable<boolean> =
    this._populateFormGroupService.formDisabled$;

  constructor(
    private readonly _fillDataService: FillDataService,
    private readonly _birthDateValidator: BirthDateValidator,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _accountValueAlreadyExistValidator: AccountValueAlreadyExistValidator,
    private readonly _formHelperService: FormHelperService
  ) {
    super();
    this.wrapAsObservable$(this.userData$).subscribe(data => {
      this.fillDataForm = new FormGroup({
        username: new FormControl(
          data?.username,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(regex.USERNAME),
          ],
          [this._accountValueAlreadyExistValidator.validate('username')]
        ),
        firstName: new FormControl(data?.firstName, [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl(data?.lastName, [
          Validators.required,
          Validators.minLength(2),
        ]),
        birthDate: new FormControl(
          { day: null, month: null, year: null },
          this._birthDateValidator.validate()
        ),
        allowNotifs: new FormControl(false),
        agreeTerms: new FormControl(false, [requiredBoolValidator()]),
      });
      this._fillDataService.setReactiveForm(this.fillDataForm);
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.fillDataForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
    this.wrapAsObservable$(this.fillDataForm.valueChanges).subscribe(() => {
      const { someNoSelected, allSelected } =
        this._formHelperService.boolFormDetails(
          this.fillDataForm,
          this.controls
        );
      this.someNoSelected = someNoSelected;
      this.allSelected = allSelected;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitFillDataForm(): void {
    this.wrapAsObservable$(this._fillDataService.submitForm$()).subscribe();
  }

  handleToggleAllValues(): void {
    this.selectAllToggle = !this.selectAllToggle;
    this._formHelperService.toggleAllBoolValues(
      this.fillDataForm,
      this.controls,
      this.selectAllToggle
    );
  }

  handleClickCheckbox(): void {
    if (this.someNoSelected) {
      this.selectAllToggle = false;
    }
    if (this.allSelected) {
      this.selectAllToggle = true;
    }
  }

  get checkIfFormIsInvalid(): boolean {
    return this._fillDataService.checkIfFormIsInvalid();
  }
}
