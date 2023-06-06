import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pet } from 'src/app/interface/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-see-pet',
  templateUrl: './see-pet.component.html',
  styleUrls: ['./see-pet.component.css'],
})
export class SeePetComponent implements OnInit, OnDestroy {
  id!: number;
  pet!: Pet;
  //pet$!: Observable<Pet>;

  loading: boolean = false;
  routeSub!: Subscription;

  constructor(
    private petService: PetService,
    private activatedRoute: ActivatedRoute
  ) {
    //Solo se atrapa el id cuando entra por primera vez al componente
    //this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((data) => {
      this.id = data['id'];
      this.getPet();
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getPet() {
    //Pipe Async
    //this.pet$ = this.petService.getPet(this.id);

    this.loading = true;
    this.petService.getPet(this.id).subscribe({
      next: (data) => {
        (this.loading = false), (this.pet = data);
      },
      error: () =>
        console.log('Ha ocurrido un error al momento de buscar la mascota'),
      complete: () => console.log('getPet complete'),
    });
  }
}
