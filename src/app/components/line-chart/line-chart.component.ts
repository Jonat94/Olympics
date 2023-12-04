import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { LineChartData } from '../../core/models/LineChartData';
import { take } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  @Input() dataId: number = 1;
  public dataset: LineChartData[] | null = [];
  dataLoaded: boolean = false;
  chartView: [number, number] = [600, 300];

  constructor(
    private responsive: BreakpointObserver,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe automatique
      .subscribe(() => {
        this.dataLoaded = true;
        this.dataset = this.olympicService.buildLineChartData(this.dataId);
      });

    this.responsive
      .observe(['(max-width: 640px)', '(min-width: 640px)'])
      .subscribe((result) => {
        if (this.responsive.isMatched('(max-width: 640px)')) {
          this.chartView = [350, 300];
        }
        if (this.responsive.isMatched('(min-width: 640px)')) {
          this.chartView = [600, 300];
        }
      });
  }

  public getOlympicService() {
    return this.olympicService;
  }
}
