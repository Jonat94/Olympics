import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);
  public countries: Country[] = [];
  private dataLoaded: boolean = false;

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.countries = value;
        // console.log('ttt' + this.countries);
        //this.dataLoaded = true;
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        //this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getCountryById(argId: number) {
    for (let country of this.countries)
      if (country.id == argId) return country.country;
    return null;
  }

  getIdByCountry(ctryName: String) {
    for (let country of this.countries)
      if (country.country == ctryName) return country.id;
    return null;
  }

  getNumberOfGames() {
    let games: number[] = [];
    for (let country of this.countries)
      for (let participation of country.participations) {
        //console.log(participation.year);
        if (!games.includes(participation.year)) games.push(participation.year);
      }

    return games.length;
  }

  getNumberOfCountries() {
    return this.countries.length;
  }
}
