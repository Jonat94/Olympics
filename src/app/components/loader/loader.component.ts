import { Component } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(private olympicService: OlympicService) {}

  public getOlympicService() {
    return this.olympicService;
  }
}
