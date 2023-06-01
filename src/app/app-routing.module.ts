import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { PetListComponent } from './components/pet-list/pet-list.component';
import { AddEditPetComponent } from './components/add-edit-pet/add-edit-pet.component';
import { SeePetComponent } from './components/see-pet/see-pet.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'petList',
    pathMatch: 'full',
  },
  {
    path: 'petList',
    component: PetListComponent,
  },
  {
    path: 'addPet',
    component: AddEditPetComponent,
  },
  {
    path: 'seePet/:id',
    component: SeePetComponent,
  },
  {
    path: 'editPet/:id',
    component: AddEditPetComponent,
  },
  {
    path: '**',
    redirectTo: 'petList',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
