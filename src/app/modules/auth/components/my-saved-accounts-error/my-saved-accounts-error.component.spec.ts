/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MySavedAccountsErrorComponent } from './my-saved-accounts-error.component';

describe('MySavedAccountsErrorComponent', () => {
  let component: MySavedAccountsErrorComponent;
  let fixture: ComponentFixture<MySavedAccountsErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    });
    fixture = TestBed.createComponent(MySavedAccountsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
