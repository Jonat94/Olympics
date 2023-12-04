import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router, private olympicService: OlympicService) {}
  ngOnInit(): void {
    console.log(this.olympicService.errorMessage);
    if (this.olympicService.errorMessage == '') this.router.navigate(['']);
  }

  getOlympicsService() {
    return this.olympicService;
  }
}
