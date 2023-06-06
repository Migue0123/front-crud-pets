import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pet } from '../interface/pet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Pet/';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  postPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.myAppUrl}${this.myApiUrl}`, pet);
  }

  successMessage(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
