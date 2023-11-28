import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  constructor(private router: Router, private olympicService: OlympicService) {}

  public getOlympicService() {
    return this.olympicService;
  }
  //A commenter
  onSelect($event: Event): void {
    let obj = JSON.parse(JSON.stringify($event));
    this.router.navigate([
      `country/${this.olympicService.getIdByCountry(obj.name)}`,
    ]);
  }
}
