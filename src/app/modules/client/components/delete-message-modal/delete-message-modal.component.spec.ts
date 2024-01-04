/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { AppModule } from '~/root-mod/app.module';
import { DeleteMessageModalComponent } from './delete-message-modal.component';

describe('DeleteMessageModalComponent', () => {
  let component: DeleteMessageModalComponent;
  let fixture: ComponentFixture<DeleteMessageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule, MessagesService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
