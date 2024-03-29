/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AddMyAccountModalComponent } from './add-my-account-modal.component';

describe('AddMyAccountModalComponent', () => {
  let component: AddMyAccountModalComponent;
  let fixture: ComponentFixture<AddMyAccountModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [PopulateFormGroupService, MyAccountsService],
    }).compileComponents();
    fixture = TestBed.createComponent(AddMyAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
