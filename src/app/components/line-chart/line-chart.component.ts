import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { LineChartData } from '../../core/models/LineChartData';
import { take } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}
  @Input() dataId: number = 1;
  public dataset: LineChartData[] | null = [];
  dataLoaded: boolean = false;
  ngOnInit(): void {
    this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe automatiquement
      .subscribe((value) => {
        //console.log('bb' + value);
        this.dataLoaded = true;
        this.dataset = this.olympicService.buildLineChartData(this.dataId);
      });
  }

  public getOlympicService() {
    return this.olympicService;
  }
}
