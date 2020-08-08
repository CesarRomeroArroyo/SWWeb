import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private languageService: LanguageService
  ) { }
}
