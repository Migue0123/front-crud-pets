import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

//Modulos
import { SharedModule } from './shared/shared/shared.module';

//Components
import { AppComponent } from './app.component';
import { AddEditPetComponent } from './components/add-edit-pet/add-edit-pet.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { SeePetComponent } from './components/see-pet/see-pet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddEditPetComponent,
    PetListComponent,
    SeePetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
