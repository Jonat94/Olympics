import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  getNumberOfAthletesById(id: number): Number {
    return this.countries[id - 1].participations.reduce(
      (acc, cur) => acc + cur.athleteCount,
      0
    );
  }
  getNumberOfMedalsById(id: number): Number {
    console.log(this.dataset);
    return this.dataset[id - 1].value;
  }
  getNumberOfEntriesById(id: number): Number {
    return this.countries[id - 1].participations.length;
  }
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);
  public countries: Country[] = [];
  private dataLoaded: boolean = false;
  public loaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.countries = value;
        // console.log('ttt' + this.countries);
        this.loaded$.next(true);
        this.setupDataset();
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

  public getNumberOfGames() {
    let games: number[] = [];
    for (let country of this.countries)
      for (let participation of country.participations) {
        //console.log(participation.year);
        if (!games.includes(participation.year)) games.push(participation.year);
      }
    // console.log('aaaaaa' + games.length);
    return games.length;
  }

  getNumberOfCountries() {
    return this.countries.length;
  }

  //public medalsCount: { name: String; value: number }[] = [];
  public dataset: { name: String; value: number }[] = [];

  public setupDataset() {
    let medalsCount = [];
    for (let c of this.countries) {
      let obj: { name: String; value: number };
      obj = { name: '', value: 0 };
      obj.value = c.participations.reduce(
        (acc, cur) => acc + cur.medalsCount,
        0
      );
      obj.name = c.country;
      medalsCount.push(obj);
    }
    this.dataset = medalsCount;
  }
  getTotalMedals() {
    return this.dataset.reduce((acc, cur) => acc + cur.value, 0);
  }
}
