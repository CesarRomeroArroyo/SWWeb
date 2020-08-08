import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private url: string = environment.api;

	constructor(private http: HttpClient) { }

	getFilms(): Observable<any> {
		return this.http.get(`${this.url}/films/`).pipe(map((result: any) => {
			let films: any[] = [];
			result.results.forEach(element => {
				let film = {
					name: element.title,
					episode: element.episode_id,
					director: element.director,
					characters: element.characters,
					opening_crawl: element.opening_crawl
				}
				films.push(film);
			});
			return films;
		}));
	}

	getCharacters(): Observable<any> {
		return this.http.get(`${this.url}/people/`).pipe(map((result : any) => {
			let characters: any[] = [];
			result.results.forEach(element => {
				let character = {
					name: element.name,
					eye_color: element.eye_color,
					gender: element.gender,
					films: element.films
				}
				characters.push(character);
			});
			return characters;
		}));
	}
}
