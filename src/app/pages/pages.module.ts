import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';
import { CharactersComponent } from '../pages/characters/characters.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'character', component: CharactersComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
]


@NgModule({
  declarations: [
    HomeComponent,
    CharactersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule
  ]
})
export class PagesModule { }
