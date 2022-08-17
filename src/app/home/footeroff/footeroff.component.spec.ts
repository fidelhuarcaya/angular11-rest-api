import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooteroffComponent } from './footeroff.component';

describe('FooteroffComponent', () => {
  let component: FooteroffComponent;
  let fixture: ComponentFixture<FooteroffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooteroffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooteroffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
