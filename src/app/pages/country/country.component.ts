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
  public numberOfentries: number;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {
    this.numberOfentries = 0;
  }

  getOlympicService(): OlympicService {
    return this.olympicService;
  }
  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.olympicService
      .getOlympics()
      .pipe(take(1)) //unsubscribe automatiquement
      .subscribe((value) => {
        //console.log('aa' + value);
      });
    /*if (value != null) {
          //cas ou l'observable contient un null
          this.numberOfentries =
            this.getOlympicService().getNumberOfEntriesById(this.countryId);
          if (this.countryId > value.length || this.countryId < 0)
            this.router.navigate([`notfound`]);
        }
      }
      );*/
  }
}
