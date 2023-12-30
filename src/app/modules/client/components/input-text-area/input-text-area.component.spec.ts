/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { WsService } from '~/client-mod/services/ws/ws.service';
import { AppModule } from '~/root-mod/app.module';
import { InputTextAreaComponent } from './input-text-area.component';

describe('InputTextAreaComponent', () => {
  let component: InputTextAreaComponent;
  let fixture: ComponentFixture<InputTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [WsService, GuildService],
    }).compileComponents();
    fixture = TestBed.createComponent(InputTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
