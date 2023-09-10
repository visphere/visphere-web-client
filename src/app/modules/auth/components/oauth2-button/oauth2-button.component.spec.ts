/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { Oauth2ButtonComponent } from './oauth2-button.component';

describe('Oauth2ButtonComponent', () => {
  let component: Oauth2ButtonComponent;
  let fixture: ComponentFixture<Oauth2ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();
    fixture = TestBed.createComponent(Oauth2ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
