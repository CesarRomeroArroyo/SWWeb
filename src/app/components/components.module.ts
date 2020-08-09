import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film/film.component';
import { ModalComponent } from './modal/modal.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    FilmComponent,
    ModalComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilmComponent,
    ModalComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
