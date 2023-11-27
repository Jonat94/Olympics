import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  public param!: number;

  constructor(
    private route: ActivatedRoute,
    public olympicService: OlympicService
  ) {}
  ngOnInit(): void {
    this.param = +this.route.snapshot.params['id'];
  }
}
