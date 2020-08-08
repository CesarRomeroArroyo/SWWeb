import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  engine: any;
  constructor(
    private languageService: LanguageService,
    private http: HttpClient
  ) { }

  public init(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const language = this.languageService.getCurrentLanguage();
        const translate = localStorage.getItem(language.toLowerCase());
        if(translate){
          this.engine = JSON.parse(translate);
          return resolve(this.engine);
        } else {
          const languageFilePath: string = 'assets/language/' + language + '.js';
          this.http.get(languageFilePath).toPromise().then(res => {
            localStorage.setItem(language.toLowerCase(), JSON.stringify(res));
            this.engine = res;
            return resolve(this.engine);
          });
        }
          
    });
  }

  public translate(key: string): string {
      return this.engine[key];
  }
}
