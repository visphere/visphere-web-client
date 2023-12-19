/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { AppModule } from '~/root-mod/app.module';
import { SphereGuildParticipantsPanelComponent } from './sphere-guild-participants-panel.component';

describe('SphereGuildParticipantsPanelComponent', () => {
  let component: SphereGuildParticipantsPanelComponent;
  let fixture: ComponentFixture<SphereGuildParticipantsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [ParticipantService],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereGuildParticipantsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
