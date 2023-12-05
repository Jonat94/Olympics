import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Router } from '@angular/router';
import { Serie } from '../../core/models/Serie';
import { Subscription, take } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, OnDestroy {
  public dataset: Serie[] | null = [];
  public chartView: [number, number] = [350, 350];
  subscription!: Subscription;

  constructor(
    private router: Router,
    private responsive: BreakpointObserver,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe after taking one data
      .subscribe(() => {
        this.dataset = this.olympicService.buildPieChartData();
      });

    this.subscription = this.responsive
      .observe(['(max-width: 640px)', '(min-width: 640px)'])
      .subscribe(() => {
        if (this.responsive.isMatched('(max-width: 640px)')) {
          this.chartView = [350, 350];
        }
        if (this.responsive.isMatched('(min-width: 640px)')) {
          this.chartView = [500, 500];
        }
      });
  }

  onSelect($event: Event): void {
    const obj = JSON.parse(JSON.stringify($event)); //used tobuild a javascript object from an unkon type object.
    this.router.navigate([
      `country/${this.olympicService.getIdByCountry(obj.name)}`,
    ]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
