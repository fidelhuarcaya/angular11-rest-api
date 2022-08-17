import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpatodosComponent } from './headerpatodos.component';

describe('HeaderpatodosComponent', () => {
  let component: HeaderpatodosComponent;
  let fixture: ComponentFixture<HeaderpatodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderpatodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderpatodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
