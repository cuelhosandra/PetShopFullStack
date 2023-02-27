import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalAddComponent } from './animal-add/animal-add.component';
import { AnimalListComponent } from './petshop/lista-pets/lista-pets.component';

const routes: Routes = [
  { path: '', redirectTo: '/animais', pathMatch: 'full' },
  { path: 'animais', component: AnimalListComponent },
  { path: 'animais/add', component: AnimalAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
