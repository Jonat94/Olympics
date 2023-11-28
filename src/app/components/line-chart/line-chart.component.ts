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
  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(() => {
      console.log('eeeeeeee');
      console.log(this.olympicService.buildLineChartData(this.dataId));
      console.log(this.dataset);
      this.dataset = this.olympicService.buildLineChartData(this.dataId);
    });
    // console.log('dataset');
    // console.log(this.dataset);
    console.log('data func');
    console.log(this.olympicService.buildLineChartData(this.dataId));
  }

  public getOlympicService() {
    return this.olympicService;
  }

  // public dataset = [
  //   {
  //     name: 'Germany',
  //     series: [
  //       {
  //         name: '1990',
  //         value: 62000000,
  //       },
  //       {
  //         name: '2010',
  //         value: 73000000,
  //       },
  //       {
  //         name: '2011',
  //         value: 89400000,
  //       },
  //     ],
  //   },
  // ];

  public dataset: LineChartData[] | null = [
    // {
    //   name: 'Spain',
    //   series: [
    //     {
    //       name: '2008',
    //       value: 20,
    //     },
    //     {
    //       name: '2012',
    //       value: 9,
    //     },
    //     {
    //       name: '2016',
    //       value: 17,
    //     },
    //     {
    //       name: '2020',
    //       value: 19,
    //     },
    //   ],
    // },
  ];
}
