/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { AppModule } from '~/root-mod/app.module';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { SphereMessagesContentComponent } from './sphere-messages-content.component';

describe('SphereMessagesContentComponent', () => {
  let component: SphereMessagesContentComponent;
  let fixture: ComponentFixture<SphereMessagesContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [
        MessagesService,
        ParticipantService,
        PasswordConfirmationService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereMessagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
