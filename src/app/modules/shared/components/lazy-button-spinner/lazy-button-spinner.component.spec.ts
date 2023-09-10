/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { LazyButtonSpinnerComponent } from './lazy-button-spinner.component';

describe('LazyButtonSpinnerComponent', () => {
  let component: LazyButtonSpinnerComponent;
  let fixture: ComponentFixture<LazyButtonSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(LazyButtonSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
