import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pet } from 'src/app/interface/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css'],
})
export class AddEditPetComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  form: FormGroup;
  id: string | null = '0';
  operacion: string = 'Agregar';
  dataPet!: Pet;

  paramSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.paramSub = this.activatedRoute.paramMap.subscribe((data) => {
      this.id = data.get('id');
    });

    if (this.id != null) {
      this.operacion = 'Editar';
      this.getPet(Number(this.id));
    }
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  getPet(id: number) {
    this.loading = true;
    this.petService.getPet(id).subscribe({
      next: (data) => {
        this.form.setValue({
          name: data.name,
          race: data.race,
          color: data.color,
          age: data.age,
          weight: data.weight,
        });
        this.loading = false;
      },
      error: () => console.log('Ha ocurrido un error al traer la mascota'),
      complete: () => console.log('getPet complete'),
    });
  }

  addEditPet() {
    //const name = this.form.get('name')?.value;
    //const name = this.form.value.name;

    const pet: Pet = {
      name: this.form.value.name,
      age: this.form.value.age,
      race: this.form.value.race,
      color: this.form.value.color,
      weight: this.form.value.weight,
    };

    if (this.id != null) {
      pet.id = parseInt(this.id);
      this.editPet(parseInt(this.id), pet);
    } else {
      this.addPet(pet);
    }
  }

  addPet(pet: Pet) {
    this.loading = true;
    this.petService.AddPet(pet).subscribe({
      next: () => {
        this.petService.successMessage('¡La mascota fue registrada con éxito!');
        this.router.navigate(['/listPets']);
        this.loading = false;
      },
      error: () => console.log('Ha ocurrido un error al crear la mascota'),
      complete: () => console.log('postPet complete'),
    });
  }

  editPet(id: number, pet: Pet) {
    this.loading = true;
    this.petService.updatePet(id, pet).subscribe({
      next: () => {
        this.petService.successMessage('¡La mascota fue editada con éxito!');
        this.router.navigate(['/listPets']);
        this.loading = false;
      },
      error: () => console.log('Ha ocurrido un error al editar la mascota'),
      complete: () => console.log('updatePet complete'),
    });
  }
}
