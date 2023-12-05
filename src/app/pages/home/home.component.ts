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
  nbCountries: number = 0;
  dataLoaded: boolean = false;
  numberOfGames: number = 0;
  totalMedals: number = 0;

  constructor(private olympicService: OlympicService) {}
  ngOnInit() {
    //take(2) to avoid catching only an empty array in case of page reload.
    this.olympicService.dataLoaded$.pipe(take(2)).subscribe((value) => {
      this.dataLoaded = value;
      this.nbCountries = this.olympicService.getNumberOfCountries();
      this.numberOfGames = this.olympicService.getNumberOfGames();
      this.totalMedals = this.olympicService.getTotalMedals();
    });
  }
}
