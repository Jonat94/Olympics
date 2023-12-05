import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  public countryId!: number;
  public numberOfentries: number = 0;
  public dataLoaded: boolean = false;
  public countryName: String = '';
  public numberOfMedals: number = 0;
  public numberOfAthletes: number = 0;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];

    //take(2) to avoid catching only an empty array in case of page reload.
    this.olympicService.dataLoaded$.pipe(take(2)).subscribe((value) => {
      this.dataLoaded = value;
      this.countryName = this.olympicService.getCountryById(this.countryId);
      this.numberOfentries = this.olympicService.getNumberOfEntriesById(
        this.countryId
      );
      this.numberOfMedals = this.olympicService.getNumberOfMedalsById(
        this.countryId
      );
      this.numberOfAthletes = this.olympicService.getNumberOfAthletesById(
        this.countryId
      );
    });
  }
}
