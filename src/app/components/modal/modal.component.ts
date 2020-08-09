import { Component, OnInit } from '@angular/core';
import { StateApp } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  crawl: string;
  show: boolean;
  constructor(
    private state: StateApp 
  ) { }

  ngOnInit() {
    this.show = false;
    this.state.getObservable().subscribe((data) => {
      if(data.crawl){
        this.show = data.showModal;
        this.crawl = data.crawl;
      }
    });
  }

  hideModal(){
    this.show = false;
    this.state.setData({search: false, showModal: false, crawl: ""});
  }

}
