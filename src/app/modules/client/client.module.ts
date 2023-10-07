/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClientRootComponent } from '~/client-mod/client-root.component';
import { ClientRoutingModule } from '~/client-mod/client-routing.module';
import { ClientEntryPointPageComponent } from '~/client-mod/pages/client-entry-point-page/client-entry-point-page.component';

@NgModule({
  declarations: [ClientEntryPointPageComponent, ClientRootComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClientRoutingModule,
    TranslateModule,
    FormsModule,
  ],
})
export class ClientModule {}
