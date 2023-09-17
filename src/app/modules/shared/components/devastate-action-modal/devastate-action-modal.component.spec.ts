/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { DevastateActionModalComponent } from './devastate-action-modal.component';

describe('DevastateActionModalComponent', () => {
  let component: DevastateActionModalComponent;
  let fixture: ComponentFixture<DevastateActionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(DevastateActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
