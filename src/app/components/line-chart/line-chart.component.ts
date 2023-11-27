import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}
  @Input() dataId?: number;
  ngOnInit(): void {
    //  this.olympicService.getOlympics().subscribe();
  }

  public getOlympicService() {
    return this.olympicService;
  }
}
