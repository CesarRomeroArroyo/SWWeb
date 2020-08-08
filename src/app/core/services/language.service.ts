import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class LanguageService {

  constructor(
  ) {}
 
  private getFirstBrowserLanguage(): string {
      const nav: Navigator = window.navigator;
      const browserLanguagePropertyKeys: any = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
      let i = 0;
      let language = '';

      for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
          language = nav[browserLanguagePropertyKeys[i]];
          if (language && language.length) {
              return language;
          }
      }
      return null;
  }

  public getCurrentLanguage(): string {
      let language: string = this.getFirstBrowserLanguage() || 'en-US';
      if (language.indexOf('-') !== -1) {
          language = language.split('-')[0];
      }
      if (language.indexOf('_') !== -1) {
          language = language.split('_')[0];
      }
      if (language === '') {
          language = 'en';
      }
      return language;
  }

}
