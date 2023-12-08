/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-conditional-tooltip-wrapper',
  templateUrl: './conditional-tooltip-wrapper.component.html',
})
export class ConditionalTooltipWrapperComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() condition = true;
  @Input() i18nTooltipInfo = '';
  @Input() contentTemplate: any;

  tooltipProps?: NgxTippyProps;

  constructor(
    private readonly _populateTooltipService: PopulateTooltipService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._populateTooltipService.field$).subscribe(
      props => (this.tooltipProps = props)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
