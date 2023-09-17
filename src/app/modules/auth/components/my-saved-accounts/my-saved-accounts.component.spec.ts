/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { AppModule } from '~/root-mod/app.module';
import { MySavedAccountsComponent } from './my-saved-accounts.component';

describe('MySavedAccountsComponent', () => {
  let component: MySavedAccountsComponent;
  let fixture: ComponentFixture<MySavedAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MyAccountsService],
    }).compileComponents();
    fixture = TestBed.createComponent(MySavedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
