import { Component } from '@angular/core';
import { Animal } from '../petshop/lista-pets/lista-pets.component';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animal-add',
  templateUrl: './animal-add.component.html',
  styleUrls: ['./animal-add.component.css']
})
export class AnimalAddComponent {
  animal: Animal = new Animal();

  constructor(private animalService: AnimalService) { }

  adicionarAnimal() {
    this.animalService.adicionarAnimal(this.animal)
      .subscribe(() => {
        alert('Animal cadastrado com sucesso!');
        this.animal = new Animal();
      });
  }
}
