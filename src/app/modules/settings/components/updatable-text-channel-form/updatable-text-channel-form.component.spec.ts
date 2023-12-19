/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { UpdatableTextChannelFormComponent } from './updatable-text-channel-form.component';

describe('UpdatableTextChannelFormComponent', () => {
  let component: UpdatableTextChannelFormComponent;
  let fixture: ComponentFixture<UpdatableTextChannelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PopulateFormGroupService],
    }).compileComponents();
    fixture = TestBed.createComponent(UpdatableTextChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
