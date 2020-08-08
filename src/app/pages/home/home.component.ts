import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( 
    public translate: TranslateService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.initTranslation();
  }

  async initTranslation(){
    await this.translateService.init();
  }

}
