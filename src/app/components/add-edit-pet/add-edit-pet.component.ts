import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/interface/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css'],
})
export class AddEditPetComponent {
  loading: boolean = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
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
      age: this.form.value.age,
      race: this.form.value.race,
      color: this.form.value.color,
      weight: this.form.value.weight,
    };

    console.log(pet);
    //Consumo de endpoint
    this.petService.postPet(pet).subscribe({
      next: () => {
        this.petService.successMessage('¡La mascota fue registrada con éxito!');
        this.router.navigate(['/listPets']);
      },
      error: () => console.log('Ha ocurrido un error al crear la mascota'),
      complete: () => console.log('postPet complete'),
    });

    this.form.reset;
  }
}
