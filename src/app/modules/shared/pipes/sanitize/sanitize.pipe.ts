/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

@Pipe({ name: 'sanitize' })
export class SanitizePipe implements PipeTransform {
  constructor(private readonly _domSanitizer: DomSanitizer) {}

  transform(notSecureHtmlContent: string): unknown {
    const purified = DOMPurify.sanitize(notSecureHtmlContent);
    return this._domSanitizer.sanitize(
      SecurityContext.HTML,
      this._domSanitizer.bypassSecurityTrustHtml(purified)
    );
  }
}
