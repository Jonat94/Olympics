import { Component } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  constructor(private olympicService: OlympicService) {}

  getOlympicsService() {
    return this.olympicService;
  }
}
