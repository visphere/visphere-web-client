/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from '~/env/environment';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { FileExtensionType } from '~/shared-mod/types/file-extensions.type';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Component({
  selector: 'vsph-image-loader-modal',
  templateUrl: './image-loader-modal.component.html',
})
export class ImageLoaderModalComponent {
  @Input() isActive = false;
  @Input() i18nPrefix = '';
  @Input() isLoading = false;

  @Output() handleEmitOnClose = new EventEmitter<void>();
  @Output() handleEmitOnUpload = new EventEmitter<File>();

  @ViewChild('fileDropRef', { static: false }) fileDropEl?: ElementRef;

  uploadedFile?: File;
  croppedBlob?: Blob;
  isDragged = false;
  isFileLoaded = false;

  readonly path = environment.contentDistributorBaseUrl;
  readonly allowedExt: FileExtensionType[] = ['jpeg', 'jpg', 'png'];
  readonly maxFileSizeMb = 5;
  readonly maxSizeWidthPx = 500;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _store: Store<SharedReducer>
  ) {}

  handleEmitOnDrag(isDragged: boolean): void {
    this.isDragged = isDragged;
  }

  fileBrowseHandler(target: EventTarget | null): void {
    const fileTarget = target as HTMLInputElement & EventTarget;
    if (fileTarget.files) {
      this.validateFileAndOpenResizeMode(fileTarget.files[0]);
    }
  }

  handleImageCropped(event: ImageCroppedEvent) {
    if (event.blob && this.uploadedFile) {
      this.croppedBlob = event.blob;
    }
  }

  handleSendLoadedImage(): void {
    if (this.croppedBlob && this.uploadedFile) {
      const file = new File([this.croppedBlob], this.uploadedFile.name, {
        type: this.croppedBlob.type,
      });
      this.handleEmitOnUpload.emit(file);
    }
  }

  handleLoadImageFailed(): void {
    this.uploadedFile = undefined;
    this.isFileLoaded = false;
    this.showErrorSnackbar('failedToLoadFile');
  }

  handleRemoveImage(): void {
    this.uploadedFile = undefined;
    this.isFileLoaded = false;
    if (this.fileDropEl?.nativeElement) {
      (this.fileDropEl?.nativeElement as HTMLInputElement).value = '';
    }
  }

  validateFileAndOpenResizeMode(file: File): void {
    const result = this._formHelperService.validateFileInput(
      file,
      this.allowedExt,
      this.maxFileSizeMb
    );
    if (result) {
      this.showErrorSnackbar(result.i18nError, result.params);
      return;
    }
    const image = new Image();
    image.onload = async () => {
      try {
        this.uploadedFile = await this._formHelperService.scaleImageWithKeepAr(
          image,
          this.maxSizeWidthPx
        );
      } catch (err) {
        this.showErrorSnackbar('failedToLoadFile');
      }
    };
    image.src = URL.createObjectURL(file);
  }

  private showErrorSnackbar(
    placeholder: string,
    parameters?: { [key: string]: any }
  ): void {
    this._store.dispatch(
      NgrxAction_SHA.__addSnackbar({
        content: {
          i18nPrefix: 'vsph.common.file.error.',
          placeholder,
          parameters,
        },
        severity: 'danger',
      })
    );
  }
}
