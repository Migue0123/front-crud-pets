import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pet } from '../interface/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Pet/';

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
