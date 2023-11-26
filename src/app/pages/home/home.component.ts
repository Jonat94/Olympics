import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public countries: Country[] = [];

  public olympics$: Observable<Country[] | null> = of(null);
  public linkUrl: string = '/toto';
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((value) => {
      this.countries = value;
      if (value.length != 0) console.log('coucou' + value);
    });
  }
}
