/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { WsService } from '~/client-mod/services/ws/ws.service';
import { AppModule } from '~/root-mod/app.module';
import { DeleteMessageModalComponent } from './delete-message-modal.component';

describe('DeleteMessageModalComponent', () => {
  let component: DeleteMessageModalComponent;
  let fixture: ComponentFixture<DeleteMessageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [MessagesService, WsService, GuildService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
