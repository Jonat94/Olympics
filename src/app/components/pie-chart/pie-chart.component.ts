import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';
import { Serie } from '../../core/models/Serie';
import { take } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  public dataset: Serie[] | null = [];
  public chartView: [number, number] = [350, 350];

  constructor(
    private router: Router,
    private responsive: BreakpointObserver,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe automatiquement
      .subscribe(() => {
        this.dataset = this.olympicService.buildPieChartData();
      });

    this.responsive
      .observe(['(max-width: 640px)', '(min-width: 640px)'])
      .subscribe((result) => {
        if (this.responsive.isMatched('(max-width: 640px)')) {
          console.log('screens matches 640px');
          this.chartView = [350, 350];
        }
        if (this.responsive.isMatched('(min-width: 640px)')) {
          console.log('screens matches 640px');
          this.chartView = [500, 500];
        }
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
