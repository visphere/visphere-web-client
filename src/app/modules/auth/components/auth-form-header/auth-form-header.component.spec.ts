/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { AuthFormHeaderComponent } from './auth-form-header.component';

describe('AuthFormHeaderComponent', () => {
  let component: AuthFormHeaderComponent;
  let fixture: ComponentFixture<AuthFormHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AuthFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
