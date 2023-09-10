/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';
import { Oauth2Type } from '~/auth-mod/types/oauth2.type';
import { environment } from '~/env/environment';

@Component({
  selector: 'msph-oauth2-button',
  templateUrl: './oauth2-button.component.html',
  host: { class: 'flex' },
})
export class Oauth2ButtonComponent {
  @Input() oauth2Type!: Oauth2Type;
  path = environment.contentDistributorBaseUrl;
}
