import { FilmInterface } from './film.interface';
import { Observable } from 'rxjs';

export interface CharacterInterface {
    name: string,
    eye_color: string,
    gender: string,
    films: FilmInterface[] | Observable<FilmInterface[]>,
    filmFilter?: string[]
}