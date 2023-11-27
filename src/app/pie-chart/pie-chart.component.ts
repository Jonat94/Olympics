import { Component, OnInit } from '@angular/core';
import { Country } from '../core/models/Olympic';
import { Input } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { Router, Routes, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  ngOnInit(): void {
    //this.medalsCount.push({ name: 'test', value: 9 });
    this.olympicService.getOlympics().subscribe((value) => {
      this.countries = value;

      //if (value.length != 0) this.setupDataset(); //test si le conteuen de l'observable est un tableau vide
    });
  }
  constructor(private router: Router, private olympicService: OlympicService) {}

  public getOlympicService() {
    return this.olympicService;
  }
  /*public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };*/

  @Input() countries!: Country[];

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));

    let obj = JSON.parse(JSON.stringify(data));
    //console.log(obj);
    console.log(this.countries);
    //console.log(this.dataset);

    this.router.navigate([
      `country/${this.olympicService.getIdByCountry(obj.name)}`,
    ]);
    //this.setupDataset();
  }

  // public medalsCount: { name: String; value: number }[] = [];

  // public setupDataset() {
  //   this.medalsCount = [];
  //   for (let c of this.countries) {
  //     let obj: { name: String; value: number };
  //     obj = { name: '', value: 0 };
  //     obj.value = c.participations.reduce(
  //       (acc, cur) => acc + cur.medalsCount,
  //       0
  //     );
  //     obj.name = c.country;
  //     this.medalsCount.push(obj);
  //   }
  // }

  // public dataset = [];
}
