import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StateApp } from 'src/app/core/services/state.service';
import { FilmInterface } from 'src/app/interface/film.interface';
import { TranslateService } from 'src/app/core/services/translate.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { CharacterInterface } from 'src/app/interface/character.interface';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnChanges {
	film: FilmInterface;
	characters: CharacterInterface[] = [];
	characterShow: CharacterInterface[] = [];

	films: FilmInterface[] = [];
	filmSelected: FilmInterface = {
		name: '',
		characters: [],
		director: '',
		episode: 0,
		opening_crawl: '',
		url: ''
	}

	searchEyesText: string = '';
	searchGenderText: string = '';

	public pageRegister: number;
	public pagesNumber: number;
	public registerNumber: number;
	public actualPage: number;
	public currentPage: number;
	public nextPage: number;

	constructor(
		public translate: TranslateService,
		private api: ApiService,
		private router: Router,
		private state: StateApp
	) {
		this.actualPage = 1;
		this.currentPage = 0;
		this.nextPage = 10;
	}

	ngOnInit() {
		this.init();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.pageRegister = 10;
		this.registerNumber = (this.characterShow) ? this.characterShow.length : 0;
		this.pagesNumber = Math.ceil((this.registerNumber / 10));
		this.setDataGrid(this.characters);
	}

	init() {
		this.state.setData({ search: true, showLoading: true });
		this.state.getObservable().subscribe((data: any) => {
			if (data.film) {
				this.film = data.film;
				if (data.search)
					this.getCharacters();
			}
			else {
				this.router.navigate(["home"]);
			}
		});
		this.uploadCombo();
	}

	uploadCombo() {
		this.api.getFilms().subscribe(result => {
			this.films = result;
			this.films.unshift({
				name: this.translate.translate("SELECT_FILM"),
				characters: [],
				director: '',
				episode: 0,
				opening_crawl: '',
				url: ''
			});
			this.filmSelected = this.films[0];
		});
	}

	getCharacters() {
		this.api.getCharacters(this.film.characters).subscribe((chars) => {
			this.characters = chars;
			this.characterShow = this.characters;
			this.state.setData({ search: false, showLoading: false });
			this.setDataGrid(this.characters);
		});
	}

	showCrawl(film) {
		this.state.setData({ search: false, showModal: true, crawl: film.opening_crawl });
	}

	setDataGrid(data: any[]) {
		console.log(data);
		this.characterShow = (data) ? data.slice(this.currentPage, this.nextPage) : [];
		console.log(this.characterShow);
	}

	onNextPage() {
		if ((this.actualPage + 1) > this.pagesNumber) {
			this.actualPage = this.pagesNumber;
		} else {
			this.actualPage++;
			this.currentPage = this.currentPage + 10;
			this.nextPage = this.nextPage + 10;
			this.setDataGrid(this.characterShow);
		}
	}

	onPreviusPage() {
		if ((this.actualPage - 1) === 0) {
			this.actualPage = 1;
		} else {
			this.actualPage--;
			this.currentPage = this.currentPage - 10;
			this.nextPage = this.nextPage - 10;
			this.setDataGrid(this.characterShow);
		}
	}

	searchEyes(searchText: string) {
		if (searchText.length > 0) {
			this.searchGenderText = '';
			searchText = searchText.toLowerCase();
			this.characterShow = this.characters.filter(result => {
				return result.eye_color.toLowerCase().indexOf(searchText) >= 0;
			});
		} else {
			this.characterShow = this.characters;
		}

	}

	searchGender(searchText: string) {
		if (searchText.length > 0) {
			this.searchEyesText = '';
			searchText = searchText.toLowerCase();
			this.characterShow = this.characters.filter(result => {
				return result.gender.toLowerCase().indexOf(searchText) >= 0;
			});
		} else {
			this.characterShow = this.characters;
		}
	}

	searchFilms(e) {
		if (e.name == this.translate.translate("SELECT_FILM")) {
			this.characterShow = this.characters;
			this.setDataGrid(this.characters);
		} else {
			let filter = this.characters.filter((result: any) => {
				return result.filmFilter.indexOf(e.url) >= 0;
			});
			console.log(filter);
			this.actualPage = 1;
			this.currentPage = 0;
			this.nextPage = 10;
			this.setDataGrid(filter)
		}
	}
}
