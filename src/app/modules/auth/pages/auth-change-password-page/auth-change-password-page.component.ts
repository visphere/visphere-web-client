/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'msph-auth-change-password-page',
  templateUrl: './auth-change-password-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
})
export class AuthChangePasswordPageComponent {
  token: string;

  constructor(private readonly _activatedRoute: ActivatedRoute) {
    this.token = String(this._activatedRoute.snapshot.paramMap.get('token'));
  }
}
