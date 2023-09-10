/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {
  let pipe: SanitizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    }).compileComponents();
    pipe = new SanitizePipe(TestBed.inject(DomSanitizer));
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove scripts value', () => {
    const mockedExploit =
      "<script>alert('hello! I am very angry exploit :)')</script><h2>I'm polite.</h2>";
    const result = pipe.transform(mockedExploit);
    expect(result).toBe("<h2>I'm polite.</h2>");
  });
});
