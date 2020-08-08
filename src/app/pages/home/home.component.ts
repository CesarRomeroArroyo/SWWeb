import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string;
  constructor(
    public translate: TranslateService,
    private translateService: TranslateService,
    private api: ApiService
  ) {
    this.search = "";
  }

  ngOnInit() {
    this.initTranslation();
    this.api.getFilms().subscribe(resp => console.log(resp));
    this.api.getCharacters().subscribe(resp => console.log(resp));
  }

  async initTranslation() {
    await this.translateService.init();
  }

}
