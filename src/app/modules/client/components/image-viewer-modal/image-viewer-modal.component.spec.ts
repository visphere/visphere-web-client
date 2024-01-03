/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { ImageViewerModalComponent } from './image-viewer-modal.component';

describe('ImageViewerModalComponent', () => {
  let component: ImageViewerModalComponent;
  let fixture: ComponentFixture<ImageViewerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ImageViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
