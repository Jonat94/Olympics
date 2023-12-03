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
  //[x: string]: any;

  private olympicUrl = environment.baseUrl; //'./assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[] | null>(null);
  public nbCountries$ = new BehaviorSubject<number>(0);
  public dataLoaded$ = new BehaviorSubject<boolean>(false);
  public numberOfgames$ = new BehaviorSubject<number>(0);
  public totalMedals$ = new BehaviorSubject<number>(0);
  private data: String[] = [];
  private countries: Country[] = [];
  //private loaded$ = new BehaviorSubject<boolean>(false);
  private pieChartData: { name: String; value: number }[] = [];
  private lineChartData: LineChartData[] = [];
  //public httpError: boolean = false;
  public errorMessage: String = '';
  private loaded: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}
  //A commenter
  loadInitialData() {
    let dataObj = {};
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.countries = value;
        this.pieChartData = this.buildPieChartData();
        this.olympics$.next(value);
        this.nbCountries$.next();
        dataObj.numberOfCountrie = this.getNumberOfCountries();

        this.numberOfgames$.next(this.getNumberOfGames());
        this.totalMedals$.next(this.getTotalMedals());
        this.dataLoaded$.next(true);
        this.loaded = true;
        // this.httpError = false;
      }),
      catchError((err) => {
        this.olympics$.next(null);
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

  isLoaded() {
    try {
      return this.loaded;
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
  // getCountries() {
  //   return this.countries;
  // }

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
  getNumberOfAthletesById(id: number): Number {
    try {
      return this.countries[id - 1].participations.reduce(
        (acc, cur) => acc + cur.athleteCount,
        0
      );
    } catch (error) {
      throw error;
    }
  }
  //A commenter
  getNumberOfMedalsById(id: number): Number {
    try {
      return this.pieChartData[id - 1].value;
    } catch (error) {
      throw error;
    }
  }
  //A commenter
  getNumberOfEntriesById(id: number): number {
    try {
      return this.countries[id - 1].participations.length;
    } catch (error) {
      throw error;
    }
  }

  getNumberOfCountries() {
    try {
      return this.countries.length;
    } catch (error) {
      //this.router.navigate(['error']);
      throw error;
    }
  }
  checkCountryId(id: number): boolean {
    console.log('ffffff' + this.getNumberOfCountries());
    // if (id <= 5) return true;
    // return false;
    // )
    return true; //id <= this.getNumberOfCountries(); //&& id > 0 ? true : false;
  }
}
