/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-join-sphere-form',
  templateUrl: './join-sphere-form.component.html',
  providers: [PopulateFormGroupService],
})
export class JoinSphereFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  joinSphereForm: FormGroup;

  isLoading$ = this._guildService.isLoading$;

  readonly defaultPrefix = 'vsph.clientCommon.client.modals';

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _guildService: GuildService,
    private readonly _router: Router
  ) {
    super();
    this.joinSphereForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(regex.SPHERE_CODE),
      ]),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.joinSphereForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitJoinSphere(): void {
    const { code } = this.joinSphereForm.getRawValue();
    this.wrapAsObservable$(
      this._guildService.joinToSphereViaCode$(code)
    ).subscribe({
      next: async (guildId: number) =>
        await this._router.navigateByUrl(`/guild/${guildId}`),
    });
  }
}
