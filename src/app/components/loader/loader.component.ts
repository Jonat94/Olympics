import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  public dataLoaded: boolean = false;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.dataLoaded$.subscribe((value) => {
      this.dataLoaded = value;
    });
  }
}
