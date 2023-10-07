/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterControlListComponent } from './footer-control-list.component';

describe('FooterControlListComponent', () => {
  let component: FooterControlListComponent;
  let fixture: ComponentFixture<FooterControlListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterControlListComponent],
    });
    fixture = TestBed.createComponent(FooterControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
