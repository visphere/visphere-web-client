/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { JoinedDateComponent } from './joined-date.component';

describe('JoinedDateComponent', () => {
  let component: JoinedDateComponent;
  let fixture: ComponentFixture<JoinedDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PopulateTooltipService],
    }).compileComponents();
    fixture = TestBed.createComponent(JoinedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
