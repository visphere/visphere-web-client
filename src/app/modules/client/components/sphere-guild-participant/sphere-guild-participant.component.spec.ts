/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { AppModule } from '~/root-mod/app.module';
import { SphereGuildParticipantComponent } from './sphere-guild-participant.component';

describe('SphereGuildParticipantComponent', () => {
  let component: SphereGuildParticipantComponent;
  let fixture: ComponentFixture<SphereGuildParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [GuildService, ParticipantService],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereGuildParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
