import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';
import { FilmInterface } from 'src/app/interface/film.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string;
  films: FilmInterface[];
  animated: boolean;
  constructor(
    public translate: TranslateService,
    private translateService: TranslateService,
    private api: ApiService
  ) {
    this.search = "";
    this.animated = false;
  }

  ngOnInit() {
    this.initTranslation();
    this.api.getFilms().subscribe(resp => this.films = resp);
  }

  async initTranslation() {
    await this.translateService.init();
  }

  animatedText() {
    this.animated = !this.animated;
  }

  searchFilm(param) {
    this.api.getFilms(param).subscribe(films => this.films = films);
  }
}
