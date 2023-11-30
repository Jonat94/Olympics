import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';
import { LineChartData } from '../models/LineChartData';
import { Serie } from '../models/Serie';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  [x: string]: any;
  private olympicUrl = environment.baseUrl; //'./assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[] | null>(null);
  private countries: Country[] = [];
  //private loaded$ = new BehaviorSubject<boolean>(false);
  private pieChartData: { name: String; value: number }[] = [];
  private lineChartData: LineChartData[] = [];

  private loaded: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}
  //A commenter
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.countries = value;
        this.loaded = true;
        this.pieChartData = this.buildPieChartData();
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        this.router.navigate(['/oupserror']);
        //console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }
  //A commenter
  public buildPieChartData() {
    let medalsCount = [];
    for (let c of this.countries) {
      let obj = {} as Serie;
      obj.value = c.participations.reduce(
        (acc, cur) => acc + cur.medalsCount,
        0
      );
      obj.name = c.country;
      medalsCount.push(obj);
    }
    return medalsCount;
  }

  //A commenter
  public buildLineChartData(id?: number) {
    let dataset: LineChartData[] = [];
    let lineChartData = {} as LineChartData;
    let series: Serie[] = [];
    let objSerie = {} as Serie;

    if (id == undefined) return null;

    for (let p of this.countries[id - 1].participations) {
      objSerie.name = p.year.toString();
      objSerie.value = p.medalsCount;
      series.push(objSerie);
      objSerie = new Object() as Serie; //reinitialisation de la variable / nlle objet
    }
    lineChartData.name = this.getCountryById(id);
    lineChartData.series = series;
    dataset.push(lineChartData);
    return dataset;
  }

  getLineChartData() {
    return this.lineChartData;
  }

  isLoaded() {
    return this.loaded;
  }
  getOlympics() {
    return this.olympics$.asObservable();
  }
  getCountries() {
    return this.countries;
  }

  getPieChartData() {
    return this.pieChartData;
  }
  //A commenter
  getCountryById(argId: number): String {
    for (let country of this.countries)
      if (country.id == argId) return country.country;
    return '';
  }
  //A commenter
  getIdByCountry(ctryName: String) {
    for (let country of this.countries)
      if (country.country == ctryName) return country.id;
    return null;
  }
  //A commenter
  public getNumberOfGames() {
    let games: number[] = [];
    for (let country of this.countries)
      for (let participation of country.participations) {
        if (!games.includes(participation.year)) games.push(participation.year);
      }
    return games.length;
  }
  //A commenter
  getTotalMedals() {
    return this.pieChartData.reduce((acc, cur) => acc + cur.value, 0);
  }
  //A commenter
  getNumberOfAthletesById(id: number): Number {
    return this.countries[id - 1].participations.reduce(
      (acc, cur) => acc + cur.athleteCount,
      0
    );
  }
  //A commenter
  getNumberOfMedalsById(id: number): Number {
    return this.pieChartData[id - 1].value;
  }
  //A commenter
  getNumberOfEntriesById(id: number): number {
    return this.countries[id - 1].participations.length;
  }

  getNumberOfCountries() {
    return this.countries.length;
  }
  checkCountryId(id: number): boolean {
    console.log('ffffff' + this.getNumberOfCountries());
    // if (id <= 5) return true;
    // return false;
    // )
    return true; //id <= this.getNumberOfCountries(); //&& id > 0 ? true : false;
  }
}
