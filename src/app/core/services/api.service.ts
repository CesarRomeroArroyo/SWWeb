import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs';
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
			films = result.results.map(element => {
				return {
					name: element.title,
					episode: element.episode_id,
					director: element.director,
					characters: element.characters,
					opening_crawl: element.opening_crawl,
					url: element.url
				}
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

	getCharacters(characters: string[]): Observable<any[]> {
		const petitions = [];
		characters.forEach((char)=>{
			petitions.push(this.http.get(char));
		});
		return forkJoin(petitions).pipe(map((result: any) => {
			let characters: CharacterInterface[] = [];
			characters = result.map(element => {
				return {
					name: element.name,
					eye_color: element.eye_color,
					gender: element.gender,
					films: this.getFilmsByCharacter(element.films),
					filmFilter: element.films
				}
			});
			return characters;
		})); 
	}

	getFilmsByCharacter(films){
		const petitions = [];
		films.forEach((film)=>{
			petitions.push(this.http.get(film));
		});
		return forkJoin(petitions).pipe(map((result: any) => {
			let films: FilmInterface[] = [];
			films = result.map(element => {
				return {
					name: element.title,
					episode: element.episode_id,
					director: element.director,
					opening_crawl: element.opening_crawl,
					url: element.url
				}
			});
			// console.log(films);
			return films;
		})); 
	}
}
