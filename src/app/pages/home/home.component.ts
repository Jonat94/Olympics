import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private olympicService: OlympicService) {}
  getOlympicService() {
    return this.olympicService;
  }
}
