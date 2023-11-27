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
  constructor(private router: Router, private olympicService: OlympicService) {}

  ngOnInit(): void {
    //this.olympicService.getOlympics().subscribe();
  }

  public getOlympicService() {
    return this.olympicService;
  }
  //A commenter
  onSelect($event: any): void {
    let obj = JSON.parse(JSON.stringify($event));

    //this.olympicService.buildLineChartData(2);

    this.router.navigate([
      `country/${this.olympicService.getIdByCountry(obj.name)}`,
    ]);
  }
}
