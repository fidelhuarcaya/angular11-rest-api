import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAlumnoComponent } from './modify-alumno.component';

describe('ModifyAlumnoComponent', () => {
  let component: ModifyAlumnoComponent;
  let fixture: ComponentFixture<ModifyAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
