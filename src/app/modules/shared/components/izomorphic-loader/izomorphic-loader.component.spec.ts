/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { IzomorphicLoaderComponent } from './izomorphic-loader.component';

describe('IzomorphicLoaderComponent', () => {
  let component: IzomorphicLoaderComponent;
  let fixture: ComponentFixture<IzomorphicLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
    fixture = TestBed.createComponent(IzomorphicLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
