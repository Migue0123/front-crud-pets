import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
    private activateRoute: ActivatedRoute
  ) {
    //Solo se atrapa el id cuando entra por primera vez al componente
    //this.id = parseInt(this.activateRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe((data) => {
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
      error: (error) => console.log(error),
      complete: () => console.log('getPet complete'),
    });
  }
}
