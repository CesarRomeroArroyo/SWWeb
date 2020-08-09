import { Component, OnInit, Input } from '@angular/core';
import { FilmInterface } from 'src/app/interface/film.interface';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { StateApp } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  @Input() film : FilmInterface;
  @Input() showlink : boolean;
  constructor(
    public translate: TranslateService,
    private api: ApiService,
    private router: Router,
    private state: StateApp
  ) { }

  ngOnInit() {
  }

  goCharacter(film){
    this.state.setData({film: film});
    this.router.navigate(["character"])
  }

  showCrawl(film) {
		this.state.setData({ search: false, showModal: true, crawl: film.opening_crawl });
	}

}
