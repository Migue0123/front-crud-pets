import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPetComponent } from './add-edit-pet.component';

describe('AddEditPetComponent', () => {
  let component: AddEditPetComponent;
  let fixture: ComponentFixture<AddEditPetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPetComponent]
    });
    fixture = TestBed.createComponent(AddEditPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
