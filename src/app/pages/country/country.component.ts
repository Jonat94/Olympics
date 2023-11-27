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
  public loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  getOlympicService(): OlympicService {
    return this.olympicService;
  }
  ngOnInit(): void {
    this.param = +this.route.snapshot.params['id'];
    this.olympicService.getOlympics().subscribe((value) => {
      if (value.length != 0) this.loaded = true;
    });
  }
}
