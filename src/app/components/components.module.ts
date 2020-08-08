import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film/film.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    FilmComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilmComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
