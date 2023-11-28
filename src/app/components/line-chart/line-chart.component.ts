import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { LineChartData } from '../../core/models/LineChartData';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}
  @Input() dataId?: number;
  public dataset: LineChartData[] | null = [];

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(() => {
      this.dataset = this.olympicService.buildLineChartData(this.dataId);
    });
  }

  public getOlympicService() {
    return this.olympicService;
  }
}
