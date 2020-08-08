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
  constructor(
    public translate: TranslateService,
    private api: ApiService,
    private router: Router,
    private state: StateApp
  ) { }

  ngOnInit() {
    this.state.getObservable().subscribe((data: any) => {
      this.film = data.film;
      console.log(this.film);
      this.getCharacters();
    });
  }

  getCharacters(){
    
    this.api.getCharacters(this.film.characters).subscribe((chars)=> {
      console.log(chars)
    });
  }

}
