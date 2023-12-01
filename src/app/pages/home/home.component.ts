import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements DoCheck {
  //public httpErrors: boolean = true;

  constructor(private router: Router, private olympicService: OlympicService) {}
  ngDoCheck(): void {}
  getOlympicService() {
    return this.olympicService;
  }
}
