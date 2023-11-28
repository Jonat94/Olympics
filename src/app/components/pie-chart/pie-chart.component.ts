import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';
import { Serie } from '../../core/models/Serie';
import { take } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  public dataset: Serie[] | null = [];

  constructor(private router: Router, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe automatiquement
      .subscribe(() => {
        this.dataset = this.olympicService.buildPieChartData();
      });
  }

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
