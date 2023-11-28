import { Component, OnInit, Input } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() public data: Number = 0;
  @Input() public title: String = '';
  constructor(private olympicService: OlympicService) {}

  getOlympicService() {
    return this.olympicService;
  }
}
