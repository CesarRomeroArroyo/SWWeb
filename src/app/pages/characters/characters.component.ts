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
  characterTem: CharacterInterface[];

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
    this.state.setData({ search: true, showLoading: true });
    this.state.getObservable().subscribe((data: any) => {
      if (data.film) {
        this.film = data.film;
        if (data.search)
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
        name: this.translate.translate("SELECT_FILM"),
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
      this.characters = chars;
      this.characterTem = chars;
      this.state.setData({ search: false, showLoading: false });
    });
  }

  showCrawl(film) {
    this.state.setData({ search: false, showModal: true, crawl: film.opening_crawl });
  }

  searchEyes(searchText: string) {
    searchText = searchText.toLowerCase();
    this.characterTem = this.characters.filter(result => {
      return result.eye_color.toLowerCase().includes(searchText);
    });
    console.log(this.characters);
  }

  searchGender(searchText: string) {
    searchText = searchText.toLowerCase();
    this.characterTem = this.characters.filter(result => {
      return result.gender.toLowerCase().includes(searchText);
    });
    console.log(this.characters);
  }

  searchFilms(e) { console.log(e); }

}
