import { Component, OnInit } from '@angular/core';
import { Animal } from '../lista-pets/animal.service';
import { AnimalService } from '../lista-pets/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './lista-pets.component.html',
  styleUrls: ['./lista-pets.component.css']
})
export class AnimalListComponent implements OnInit {
  animais: Animal[] = [];

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.listarAnimais();
  }

  listarAnimais() {
    this.animalService.listarAnimais()
      .subscribe(animais => this.animais = animais);
  }

  removerAnimal(numeroCadastro: number) {
    if (confirm('Tem certeza que deseja remover este animal?')) {
      this.animalService.removerAnimal(numeroCadastro)
        .subscribe(() => {
          alert('Animal removido com sucesso!');
          this.listarAnimais();
        });
    }
  }
}
