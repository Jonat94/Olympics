import { Component, OnInit } from '@angular/core';
import { Country } from '../../core/models/Olympic';
import { Input } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  @Input() countries!: Country[];

  constructor(private router: Router, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((value) => {
      this.countries = value;
    });
  }

  public getOlympicService() {
    return this.olympicService;
  }

  onSelect(data: any): void {
    let obj = JSON.parse(JSON.stringify(data));
    console.log(this.countries);
    this.router.navigate([
      `country/${this.olympicService.getIdByCountry(obj.name)}`,
    ]);
  }
}
