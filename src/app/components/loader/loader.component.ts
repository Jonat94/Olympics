import { Component } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  public dataLoaded: boolean = false;
  constructor(private olympicService: OlympicService) {}

  public getOlympicService() {
    return this.olympicService;
  }

  ngOnInit(): void {
    this.olympicService.dataLoaded$.subscribe((value) => {
      this.dataLoaded = value;
    });
  }
}
