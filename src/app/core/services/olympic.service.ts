import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  private pieChartData: { name: String; value: number }[] = [];
  private lineChartData: LineChartData[] = [];
  public errorMessage: String = '';

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
    let medalsCount = [];
    try {
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
    } catch (error) {
      throw error;
    }
  }

  /**
   * Buld the line chart dataset
   * @param id country id
   * @returns Array containing the medals count per country name.
   */
  public buildLineChartData(id?: number) {
    let dataset: LineChartData[] = [];
    let lineChartData = {} as LineChartData;
    let series: Serie[] = [];
    let objSerie = {} as Serie;
    try {
      if (id == undefined) return null; //avoid exception in case of bad id

      for (let p of this.countries[id - 1].participations) {
        objSerie.name = p.year.toString();
        objSerie.value = p.medalsCount;
        series.push(objSerie);
        objSerie = new Object() as Serie; //reinit variable with a new object
      }
      lineChartData.name = this.getCountryById(id);
      lineChartData.series = series;
      dataset.push(lineChartData);
      return dataset;
    } catch (error) {
      throw error;
    }
  }

  getLineChartData() {
    try {
      return this.lineChartData;
    } catch (error) {
      throw error;
    }
  }

  getOlympics() {
    try {
      return this.olympics$.asObservable();
    } catch (error) {
      throw error;
    }
  }

  getPieChartData() {
    try {
      return this.pieChartData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param argId contry id
   * @returns country name
   */

  getCountryById(argId: number): String {
    try {
      for (let country of this.countries)
        if (country.id == argId) return country.country;
      return '';
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param ctryName name of the country
   * @returns id of the country
   */

  getIdByCountry(ctryName: String) {
    try {
      for (let country of this.countries)
        if (country.country == ctryName) return country.id;
      return null;
    } catch (error) {
      throw error;
    }
  }
  /**
   * excract from the data the number of participation of a
   * particular country
   * @returns number of participation
   */
  public getNumberOfGames() {
    try {
      let games: number[] = [];
      for (let country of this.countries)
        for (let participation of country.participations) {
          if (!games.includes(participation.year))
            games.push(participation.year);
        }
      return games.length;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @returns totals medals of all countries
   */
  getTotalMedals() {
    try {
      return this.pieChartData.reduce((acc, cur) => acc + cur.value, 0);
    } catch (error) {
      throw error;
    }
  }
  /**
   * excract from the data the number of athletes of a
   * particular country
   * @param id country Id
   * @returns number of athletes sent to the males for a particular country
   */
  getNumberOfAthletesById(id: number): number {
    try {
      if (this.countries.length != 0) {
        return this.countries[id - 1].participations.reduce(
          (acc, cur) => acc + cur.athleteCount,
          0
        );
      }
    } catch (error) {
      throw error;
    }
    return 0;
  }
  /**
   * extract froma the pie chart dataset the number of medals obtained by a country
   * @param id country id
   * @returns the number of medals of a particular country
   */

  getNumberOfMedalsById(id: number): number {
    try {
      if (this.pieChartData.length != 0) return this.pieChartData[id - 1].value;
      return 0;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @param id: country id
   * @returns number of participation of a country
   */
  getNumberOfEntriesById(id: number): number {
    try {
      if (this.countries.length != 0)
        //avoid exception
        return this.countries[id - 1].participations.length;
      return 0;
    } catch (error) {
      throw error;
    }
  }

  getNumberOfCountries() {
    try {
      return this.countries.length;
    } catch (error) {
      throw error;
    }
  }
}
