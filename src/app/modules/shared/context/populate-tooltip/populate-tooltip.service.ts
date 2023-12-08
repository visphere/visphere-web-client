/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { AbstractPopulateField } from '~/shared-mod/context/abstract-populate-field';

@Injectable()
export class PopulateTooltipService extends AbstractPopulateField<NgxTippyProps> {}
