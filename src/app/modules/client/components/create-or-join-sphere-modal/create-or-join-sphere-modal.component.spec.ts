/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { AppModule } from '~/root-mod/app.module';
import { CreateOrJoinSphereModalComponent } from './create-or-join-sphere-modal.component';

describe('CreateOrJoinSphereModalComponent', () => {
  let component: CreateOrJoinSphereModalComponent;
  let fixture: ComponentFixture<CreateOrJoinSphereModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [GuildService],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateOrJoinSphereModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
