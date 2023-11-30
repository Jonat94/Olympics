import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  public countryId!: number;
  //numberOfentries

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  getOlympicService(): OlympicService {
    return this.olympicService;
  }
  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.olympicService
      .getOlympics()
      .pipe() //unsubscribe automatiquement
      .subscribe((value) => {
        console.log('aa' + value);
        if (value != null) {
          //cas ou l'observable contient un null
          if (this.countryId > value.length || this.countryId < 0)
            this.router.navigate([`notfound`]);
        }
      });
  }
}
