/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { AppModule } from '~/root-mod/app.module';
import { SphereGuildPageComponent } from './sphere-guild-page.component';

describe('SphereGuildPageComponent', () => {
  let component: SphereGuildPageComponent;
  let fixture: ComponentFixture<SphereGuildPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [GuildService],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereGuildPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
