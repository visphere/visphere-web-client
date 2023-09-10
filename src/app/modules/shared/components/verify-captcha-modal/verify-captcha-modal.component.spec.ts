/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { CaptchaVerificationService } from '~/shared-mod/services/captcha-verification/captcha-verification.service';
import { ModalService } from '~/shared-mod/services/modal/modal.service';
import { SharedModule } from '~/shared-mod/shared.module';
import { VerifyCaptchaModalComponent } from './verify-captcha-modal.component';

describe('VerifyCaptchaModalComponent', () => {
  let component: VerifyCaptchaModalComponent;
  let fixture: ComponentFixture<VerifyCaptchaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SharedModule],
      providers: [CaptchaVerificationService, ModalService],
    }).compileComponents();
    fixture = TestBed.createComponent(VerifyCaptchaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
