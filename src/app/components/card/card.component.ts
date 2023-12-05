import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() public data: number | null = 0;
  @Input() public title: string = '';
  dataLoaded: boolean = false;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    //operator take to unsubscribe automaticaly
    this.olympicService.dataLoaded$.pipe(take(1)).subscribe((value) => {
      this.dataLoaded = value;
    });
  }
}
