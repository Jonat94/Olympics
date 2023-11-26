import { Component, OnInit } from '@angular/core';
import { Country } from '../core/models/Olympic';
import { Input } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  ngOnInit(): void {
    this.medalsCount.push({ name: 'test', value: 9 });
    this.olympicService.getOlympics().subscribe((value) => {
      this.countries = value;
      if (value.length != 0) this.setupDataset(); //test si le conteuen de l'observable est un tableau vide
    });
  }
  constructor(private olympicService: OlympicService) {}

  @Input() countries!: Country[];

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    console.log(this.countries);
    console.log(this.dataset);
    this.setupDataset();
  }

  public medalsCount: { name: String; value: number }[] = [];

  public setupDataset() {
    // if (!(this.countries.length == 0)) {
    //   let sumMedals: number = this.countries[0].participations.reduce(
    //     (acc, cur) => acc + cur.medalsCount,
    //     0
    //   );
    //   console.log(sumMedals);
    this.medalsCount = [];
    for (let c of this.countries) {
      let obj = { name: '', value: 0 };
      obj.value = c.participations.reduce(
        (acc, cur) => acc + cur.medalsCount,
        0
      );
      obj.name = c.country;
      this.medalsCount.push(obj);
    }
    //console.log(medalsCount);
    //this.pieChartDatasets[0].data = medalsCount;
    //medalsCount[0].name = 'France';
    console.log(this.medalsCount);
    //console.log(medalsCount2);
    // medalsCount2.push(
    //   cntry[0].participations.reduce((acc, cur) => acc + cur.medalsCount, 0)
    // );
    //});

    //this.pieChartLabels = this.countries.map((x) => x['country']);
  }

  public dataset = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];
}
