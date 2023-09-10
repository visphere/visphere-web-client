/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthContentWrapperComponent } from './auth-content-wrapper.component';

describe('AuthContentWrapperComponent', () => {
  let component: AuthContentWrapperComponent;
  let fixture: ComponentFixture<AuthContentWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthContentWrapperComponent],
    });
    fixture = TestBed.createComponent(AuthContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
