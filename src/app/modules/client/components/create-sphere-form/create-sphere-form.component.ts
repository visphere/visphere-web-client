/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SphereGuildCategory } from '~/client-mod/model/guild.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-create-sphere-form',
  templateUrl: './create-sphere-form.component.html',
  providers: [PopulateFormGroupService],
})
export class CreateSphereFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  createSphereForm: FormGroup;
  categories: SphereGuildCategory[] = [];
  selectedCategory?: SphereGuildCategory;

  isLoading$ = this._guildService.isLoading$;
  isFormLoading$ = this._guildService.isFormLoading$;

  readonly commonPrefix = 'vsph.clientCommon.client.modals';

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _guildService: GuildService,
    private readonly _router: Router
  ) {
    super();
    this.createSphereForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      isPrivate: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.createSphereForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
    this.wrapAsObservable$(this._guildService.getSphereCategories$()).subscribe(
      categories => {
        this.categories = categories;
        this.selectedCategory = categories[0];
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitCreateSphereForm(): void {
    this.wrapAsObservable$(
      this._guildService.createNewSphere$(
        this.createSphereForm.getRawValue(),
        this.selectedCategory!.name
      )
    ).subscribe({
      next: async (guildId: number) =>
        await this._router.navigateByUrl(`/guild/${guildId}`),
    });
  }

  handleToggleCategory(category: SphereGuildCategory): void {
    this.selectedCategory = category;
  }
}
