/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { JoinLinkService } from '~/client-mod/services/join-link/join-link.service';
import { AppModule } from '~/root-mod/app.module';
import { JoinToGuildPageComponent } from './join-to-guild-page.component';

describe('JoinToGuildPageComponent', () => {
  let component: JoinToGuildPageComponent;
  let fixture: ComponentFixture<JoinToGuildPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [JoinLinkService],
    }).compileComponents();
    fixture = TestBed.createComponent(JoinToGuildPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
