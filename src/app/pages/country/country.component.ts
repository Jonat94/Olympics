import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  public countryId!: number;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  getOlympicService(): OlympicService {
    return this.olympicService;
  }
  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
  }
}
