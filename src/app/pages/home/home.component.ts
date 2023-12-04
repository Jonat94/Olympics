import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //public httpErrors: boolean = true;
  nbCountries: number = 0;
  dataLoaded: boolean = false;
  numberOfGames: number = 0;
  totalMedals: number = 0;

  constructor(private olympicService: OlympicService) {}
  ngOnInit() {
    this.olympicService.dataLoaded$.pipe(take(2)).subscribe((value) => {
      this.dataLoaded = value;
      this.nbCountries = this.olympicService.getNumberOfCountries();
      this.numberOfGames = this.olympicService.getNumberOfGames();
      this.totalMedals = this.olympicService.getTotalMedals();
    });

    // this.olympicService.nbCountries$.subscribe(
    //   (value) => (this.nbCountries = value)
    // );

    // this.olympicService.numberOfgames$.subscribe(
    //   (value) => (this.numberOfGames = value)
    // );

    // this.olympicService.totalMedals$.subscribe(
    //   (value) => (this.totalMedals = value)
    // );
  }
  /*
  getOlympicService() {
    return this.olympicService;
  }
  */
}
