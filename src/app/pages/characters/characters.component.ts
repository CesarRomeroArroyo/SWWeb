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
  characters: CharacterInterface[] = [];
  characterShow: CharacterInterface[] = [];

  films: FilmInterface[] = [];
  filmSelected: FilmInterface = {
    name: '',
    characters: [],
    director: '',
    episode: 0,
    opening_crawl: '',
    url: ''
  }

  searchEyesText: string = '';
  searchGenderText: string = '';

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
        opening_crawl: '',
        url: ''
      });
      this.filmSelected = this.films[0];
    });
  }

  getCharacters() {
    this.api.getCharacters(this.film.characters).subscribe((chars) => {
      this.characters = chars;
      this.characterShow = this.characters;
      this.state.setData({ search: false, showLoading: false });
    });
  }

  showCrawl(film) {
    this.state.setData({ search: false, showModal: true, crawl: film.opening_crawl });
  }

  searchEyes(searchText: string) {
    if (searchText.length > 0) {
      this.searchGenderText = '';
      searchText = searchText.toLowerCase();
      this.characterShow = this.characters.filter(result => {
        return result.eye_color.toLowerCase().indexOf(searchText) >= 0;
      });
    } else {
      this.characterShow = this.characters;
    }

  }

  searchGender(searchText: string) {
    if (searchText.length > 0) {
      this.searchEyesText = '';
      searchText = searchText.toLowerCase();
      this.characterShow = this.characters.filter(result => {
        return result.gender.toLowerCase().indexOf(searchText) >= 0;
      });
    } else {
      this.characterShow = this.characters;
    }
  }

  searchFilms(e) {
    if (e.name == this.translate.translate("SELECT_FILM")) {
      this.characterShow = this.characters;
    } else {
      this.characterShow = this.characters.filter((result: any) => {
        return result.filmFilter.indexOf(e.url) >= 0;
      });
    }
  }
}
