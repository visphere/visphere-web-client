/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { GuildJoinLinksService } from '~/settings-mod/services/guild-join-links/guild-join-links.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { UpdateJoinLinkModalComponent } from './update-join-link-modal.component';

describe('UpdateJoinLinkModalComponent', () => {
  let component: UpdateJoinLinkModalComponent;
  let fixture: ComponentFixture<UpdateJoinLinkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PopulateFormGroupService, GuildJoinLinksService],
    }).compileComponents();
    fixture = TestBed.createComponent(UpdateJoinLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
