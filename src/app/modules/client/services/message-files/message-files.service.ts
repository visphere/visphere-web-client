/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ElementRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlobFile } from '~/client-mod/model/message.model';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { actionAddSnackbar } from '~/shared-mod/store/actions';

@Injectable()
export class MessageFilesService {
  private _appendFiles: BlobFile[] = [];
  private _fileInputRef?: ElementRef;

  readonly maxFiles = 5;
  readonly maxFileSizeMb = 20;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _store: Store<ClientReducer>
  ) {}

  setFileInputRef(fileInputRef: ElementRef | undefined): void {
    this._fileInputRef = fileInputRef;
  }

  addFilesToMessage(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (this.appendFiles.length < this.maxFiles) {
        this.validateAppendingFile(files[i]);
      }
    }
    this.clearInputRef();
  }

  addFilesByPaste(event: ClipboardEvent): void {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          this.validateAppendingFile(item.getAsFile());
        }
      }
      this.clearInputRef();
    }
  }

  removeFile(fileIndex: number): void {
    const selectedFile = this.appendFiles[fileIndex];
    if (selectedFile && selectedFile.isImage) {
      URL.revokeObjectURL(selectedFile.imageSrc);
    }
    this.appendFiles.splice(fileIndex, 1);
    this.clearInputRef();
  }

  clearFileList(): void {
    this.revokeAllBlobObjects();
    this._appendFiles.splice(0, this._appendFiles.length);
  }

  revokeAllBlobObjects(): void {
    for (const file of this.appendFiles) {
      if (file.isImage) {
        URL.revokeObjectURL(file.imageSrc);
      }
    }
  }

  private validateAppendingFile(file: File | null): void {
    if (!file) {
      return;
    }
    const result = this._formHelperService.validateFileInput(
      file,
      [],
      this.maxFileSizeMb
    );
    if (!result) {
      this.appendFiles.push({
        file,
        isImage: file.type.startsWith('image'),
        imageSrc: URL.createObjectURL(file),
      });
      return;
    }
    this._store.dispatch(
      actionAddSnackbar({
        content: {
          i18nPrefix: 'vsph.common.file.error.',
          placeholder: result.i18nError,
          parameters: result.params,
        },
        severity: 'danger',
      })
    );
  }

  private clearInputRef(): void {
    if (this._fileInputRef) {
      this._fileInputRef.nativeElement.value = '';
    }
  }

  get appendFiles(): BlobFile[] {
    return this._appendFiles;
  }
}
