/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { FillDataService } from '~/auth-mod/services/fill-data/fill-data.service';
import { AppModule } from '~/root-mod/app.module';
import { FillDataFormComponent } from './fill-data-form.component';

describe('FillDataFormComponent', () => {
  let component: FillDataFormComponent;
  let fixture: ComponentFixture<FillDataFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [FillDataService],
    }).compileComponents();
    fixture = TestBed.createComponent(FillDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
