import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from '../../../environments/environment';
import { FilmInterface } from '../../interface/film.interface';
import { CharacterInterface } from '../../interface/character.interface';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private url: string = environment.api;

	constructor(private http: HttpClient) { }

	getFilms(search?): Observable<FilmInterface[]> {
		search = search ? `?search=${search}` : '';
		return this.http.get(`${this.url}/films/${search}`).pipe(map((result: any) => {
			let films: FilmInterface[] = [];
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
			films.sort(function (prev, next) {
				if (prev.episode > next.episode) {
					return 1;
				}
				if (prev.episode < next.episode) {
					return -1
				}
				return 0;
			});
			// console.log(films);
			return films;
		}));
	}

	getCharacters(): Observable<CharacterInterface[]> {
		return this.http.get(`${this.url}/people/`).pipe(map((result: any) => {
			let characters: CharacterInterface[] = [];
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

	searchFilms(search) {
		return this.http.get(`${this.url}/films/?search=${search}`).pipe(map((result: any) => {
			let films: FilmInterface[] = [];
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
			films.sort(function (prev, next) {
				if (prev.episode > next.episode) {
					return 1;
				}
				if (prev.episode < next.episode) {
					return -1
				}
				return 0;
			});
			return films;
		}));
	}
}
