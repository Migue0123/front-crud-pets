import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from 'src/app/interface/pet';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css'],
})
export class AddEditPetComponent {
  loading: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  addPet() {
    //const name = this.form.get('name')?.value;
    //const name = this.form.value.name;

    const pet: Pet = {
      name: this.form.value.name,
      race: this.form.value.race,
      age: this.form.value.age,
      color: this.form.value.color,
      weight: this.form.value.weight,
    };

    console.log(pet);
  }
}
