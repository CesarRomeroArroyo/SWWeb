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
  constructor(
    public translate: TranslateService,
    private api: ApiService,
    private router: Router,
    private state: StateApp
  ) { }

  ngOnInit() {
    this.state.setData({search: true});
    this.state.getObservable().subscribe((data: any) => {
      if(data.film){
        this.film = data.film;
        console.log(this.film);
        if(data.search)
          this.getCharacters();
      }
      else {
        this.router.navigate(["home"]);
      }
    });
  }

  getCharacters(){
    this.api.getCharacters(this.film.characters).subscribe((chars)=> {
      console.log(chars);
      this.characters = chars;
    });
  }

  showCrawl(film){
    this.state.setData({search: false});
    this.state.setData({showModal: true});
    this.state.setData({crawl: film.opening_crawl});
  }
  

}
