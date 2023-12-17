/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { CreateTextChannelModalComponent } from './create-text-channel-modal.component';

describe('CreateTextChannelModalComponent', () => {
  let component: CreateTextChannelModalComponent;
  let fixture: ComponentFixture<CreateTextChannelModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [PopulateFormGroupService],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateTextChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
