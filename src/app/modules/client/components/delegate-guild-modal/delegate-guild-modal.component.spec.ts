/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { AppModule } from '~/root-mod/app.module';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { DelegateGuildModalComponent } from './delegate-guild-modal.component';

describe('DelegateGuildModalComponent', () => {
  let component: DelegateGuildModalComponent;
  let fixture: ComponentFixture<DelegateGuildModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [
        PasswordConfirmationService,
        ParticipantService,
        GuildService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DelegateGuildModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
