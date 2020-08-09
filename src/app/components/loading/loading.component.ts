import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/core/services/translate.service';
import { StateApp } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  show: boolean;
  constructor(
    public translate: TranslateService,
    private state: StateApp
  ) { }

  ngOnInit() {
    this.show = false;
    this.state.getObservable().subscribe((data)=>{
        this.show = data.showLoading;
    });
  }

}
