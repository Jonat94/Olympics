import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/Olympic';
import { LineChartData } from '../models/LineChartData';
import { Serie } from '../models/Serie';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);
  private countries: Country[] = [];
  private loaded$ = new BehaviorSubject<boolean>(false);
  private pieChartData: { name: String; value: number }[] = [];
  private lineChartData: LineChartData[] = [];

  private loaded: boolean = false;

  constructor(private http: HttpClient) {}
  //A commenter
  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.countries = value;
        this.loaded$.next(true);
        this.pieChartData = this.buildPieChartData();
        this.loaded = true;
        //this.lineChartData = this.buildLineChartData(2);
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
    console.log('rrrrrrrrr');
    console.log(this.countries);
    console.log(this.countries[id - 1].participations);
    console.log(id);

    for (let p of this.countries[id - 1].participations) {
      console.log('zzzzzzz');
      console.log(p);
      console.log(this.countries[id - 1]);

      objSerie.name = p.year.toString();
      objSerie.value = p.medalsCount;
      series.push(objSerie);
      objSerie = new Object() as Serie; //reinitialisation de la variable / nlle objet
    }
    lineChartData.name = this.getCountryById(id);
    lineChartData.series = series;
    dataset.push(lineChartData);
    console.log(dataset);
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
  getNumberOfEntriesById(id: number): Number {
    return this.countries[id - 1].participations.length;
  }
  //A commenter
  getNumberOfCountries() {
    return this.countries.length;
  }
}
