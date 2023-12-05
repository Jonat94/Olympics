import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
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
  private olympicUrl = environment.baseUrl; //'./assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[] | null>(null);
  public dataLoaded$ = new BehaviorSubject<boolean>(false);
  private countries: Country[] = [];
  private pieChartData: { name: string; value: number }[] = [];
  private lineChartData: LineChartData[] = [];
  public errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Get the data from the server and load them into local
   * variables. Throw exception in case of http error.
   * Return an observable that emits the http response body
   */
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.countries = value;
        this.pieChartData = this.buildPieChartData();
        this.olympics$.next(value);
        this.dataLoaded$.next(true);
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  /**
   * count the number of medals optained by each country for the
   * pie chart display.
   * @return array containing the medals count per country name.
   */
  public buildPieChartData() {
    const medalsCount = [];

    for (const c of this.countries) {
      const obj = {} as Serie;
      obj.value = c.participations.reduce(
        (acc, cur) => acc + cur.medalsCount,
        0
      );
      obj.name = c.country;
      medalsCount.push(obj);
    }
    return medalsCount;
  }

  /**
   * Build the line chart dataset
   * @param id country id
   * @returns Array containing the medals count per country name.
   */
  public buildLineChartData(id?: number) {
    const dataset: LineChartData[] = [];
    const lineChartData = {} as LineChartData;
    const series: Serie[] = [];
    let objSerie = {} as Serie;

    if (id == undefined) return null; //avoid exception in case of bad id

    for (const p of this.countries[id - 1].participations) {
      objSerie.name = p.year.toString();
      objSerie.value = p.medalsCount;
      series.push(objSerie);
      objSerie = new Object() as Serie; //reinit variable with a new object
    }
    lineChartData.name = this.getCountryById(id);
    lineChartData.series = series;
    dataset.push(lineChartData);
    return dataset;
  }

  getLineChartData() {
    return this.lineChartData;
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getPieChartData() {
    return this.pieChartData;
  }

  /**
   * @param argId contry id
   * @returns country name
   */

  getCountryById(argId: number): string {
    for (const country of this.countries)
      if (country.id == argId) return country.country;
    return '';
  }

  /**
   * @param ctryName : name of the country
   * @returns id : of the country
   */

  getIdByCountry(ctryName: string) {
    for (const country of this.countries)
      if (country.country == ctryName) return country.id;
    return null;
  }
  /**
   * exctract from the data the number of participation of a
   * particular country
   * @returns number of participation
   */
  public getNumberOfGames() {
    const games: number[] = [];
    for (const country of this.countries)
      for (const participation of country.participations) {
        if (!games.includes(participation.year)) games.push(participation.year);
      }
    return games.length;
  }
  /**
   *
   * @returns totals medals of all countries
   */
  getTotalMedals() {
    return this.pieChartData.reduce((acc, cur) => acc + cur.value, 0);
  }
  /**
   * excract from the data the number of athletes of a
   * particular country
   * @param id country Id
   * @returns number of athletes sent to the males for a particular country
   */
  getNumberOfAthletesById(id: number): number {
    if (this.countries.length != 0) {
      return this.countries[id - 1].participations.reduce(
        (acc, cur) => acc + cur.athleteCount,
        0
      );
    }
    return 0;
  }
  /**
   * extract froma the pie chart dataset the number of medals obtained by a country
   * @param id country id
   * @returns the number of medals of a particular country
   */

  getNumberOfMedalsById(id: number): number {
    if (this.pieChartData.length != 0) return this.pieChartData[id - 1].value;
    return 0;
  }
  /**
   * @param id: country id
   * @returns number of participation of a country
   */
  getNumberOfEntriesById(id: number): number {
    if (this.countries.length != 0)
      //avoid exception
      return this.countries[id - 1].participations.length;
    return 0;
  }

  getNumberOfCountries() {
    return this.countries.length;
  }
}
