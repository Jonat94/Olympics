import { Component, OnInit, Input } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() public medals: Number = 0;
  @Input() public title: String = '';
  public loaded: boolean = false;
  constructor(private olympicService: OlympicService) {}

  getOlympicService() {
    return this.olympicService;
  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((value) => {
      if (value.length != 0) this.loaded = true;
    });
  }
}
