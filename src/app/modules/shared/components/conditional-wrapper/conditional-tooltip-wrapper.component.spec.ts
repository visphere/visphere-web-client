/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { ConditionalTooltipWrapperComponent } from './conditional-tooltip-wrapper.component';

describe('ConditionalTooltipWrapperComponent', () => {
  let component: ConditionalTooltipWrapperComponent;
  let fixture: ComponentFixture<ConditionalTooltipWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PopulateTooltipService],
    }).compileComponents();
    fixture = TestBed.createComponent(ConditionalTooltipWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
