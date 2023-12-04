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
  //A commenter
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

  //A commenter
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

  //A commenter
  public buildLineChartData(id?: number) {
    let dataset: LineChartData[] = [];
    let lineChartData = {} as LineChartData;
    let series: Serie[] = [];
    let objSerie = {} as Serie;
    try {
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
  //A commenter
  getCountryById(argId: number): String {
    try {
      for (let country of this.countries)
        if (country.id == argId) return country.country;
      return '';
    } catch (error) {
      throw error;
    }
  }
  //A commenter
  getIdByCountry(ctryName: String) {
    try {
      for (let country of this.countries)
        if (country.country == ctryName) return country.id;
      return null;
    } catch (error) {
      throw error;
    }
  }
  //A commenter
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
  //A commenter
  getTotalMedals() {
    try {
      return this.pieChartData.reduce((acc, cur) => acc + cur.value, 0);
    } catch (error) {
      throw error;
    }
  }
  //A commenter
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
  //A commenter
  getNumberOfMedalsById(id: number): number {
    try {
      if (this.pieChartData.length != 0) return this.pieChartData[id - 1].value;
      return 0;
    } catch (error) {
      throw error;
    }
  }
  //A commenter
  getNumberOfEntriesById(id: number): number {
    try {
      console.log(id);
      console.log(this.countries);
      if (this.countries.length != 0)
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
