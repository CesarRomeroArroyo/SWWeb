import { Component, OnInit } from '@angular/core';
import { StateApp } from 'src/app/core/services/state.service';
import { FilmInterface } from 'src/app/interface/film.interface';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { CharacterInterface } from 'src/app/interface/character.interface';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  film: FilmInterface;
  characters: CharacterInterface[];

  films: FilmInterface[] = [];
  filmSelected: FilmInterface = {
    name: '',
    characters: [],
    director: '',
    episode: 0,
    opening_crawl: ''
  }

  constructor(
    public translate: TranslateService,
    private api: ApiService,
    private router: Router,
    private state: StateApp
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.state.getObservable().subscribe((data: any) => {
      if (data.film) {
        this.film = data.film;
        console.log(this.film);
        this.getCharacters();
      }
      else {
        this.router.navigate(["home"]);
      }
    });
    this.uploadCombo();
  }

  uploadCombo() {
    this.api.getFilms().subscribe(result => {
      this.films = result;
      this.films.unshift({
        name: 'Seleccionar pelicula',
        characters: [],
        director: '',
        episode: 0,
        opening_crawl: ''
      });
      this.filmSelected = this.films[0];
    });
  }

  getCharacters() {
    this.api.getCharacters(this.film.characters).subscribe((chars) => {
      console.log(chars);
      this.characters = chars;
    });
  }

  searchEyes() { }
  searchGender() { }
  searchFilms(e) { console.log(e); }
}
