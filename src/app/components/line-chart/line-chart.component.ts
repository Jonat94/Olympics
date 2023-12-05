import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { LineChartData } from '../../core/models/LineChartData';
import { Subscription, take } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit, OnDestroy {
  @Input() dataId: number = 1;
  public dataset: LineChartData[] | null = [];
  dataLoaded: boolean = false;
  chartView: [number, number] = [600, 300];
  subscription!: Subscription;

  constructor(
    private responsive: BreakpointObserver,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.subscription = this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe automatique
      .subscribe(() => {
        this.dataLoaded = true;
        this.dataset = this.olympicService.buildLineChartData(this.dataId);
      });

    this.responsive
      .observe(['(max-width: 640px)', '(min-width: 640px)'])
      .subscribe(() => {
        if (this.responsive.isMatched('(max-width: 640px)')) {
          this.chartView = [350, 300];
        }
        if (this.responsive.isMatched('(min-width: 640px)')) {
          this.chartView = [600, 300];
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // public getOlympicService() {
  //   return this.olympicService;
  // }
}
