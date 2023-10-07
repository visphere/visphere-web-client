/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SharedModule } from '~/shared-mod/shared.module';
import { SnackbarsContainerComponent } from './snackbars-container.component';

describe('SnackbarsContainerComponent', () => {
  let component: SnackbarsContainerComponent;
  let fixture: ComponentFixture<SnackbarsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SnackbarsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
