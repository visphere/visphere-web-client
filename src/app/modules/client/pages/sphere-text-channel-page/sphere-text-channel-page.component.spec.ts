/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { SphereTextChannelPageComponent } from './sphere-text-channel-page.component';

describe('SphereTextChannelPageComponent', () => {
  let component: SphereTextChannelPageComponent;
  let fixture: ComponentFixture<SphereTextChannelPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereTextChannelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
