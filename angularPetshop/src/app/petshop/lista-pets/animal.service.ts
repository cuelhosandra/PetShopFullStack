import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from './animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:8080/api/animais';

  constructor(private http: HttpClient) { }

  listarAnimais(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  adicionarAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal);
  }

  atualizarAnimal(animal: Animal): Observable<Animal> {
    const url = `${this.apiUrl}/${animal.numeroCadastro}`;
    return this.http.put<Animal>(url, animal);
  }
}
