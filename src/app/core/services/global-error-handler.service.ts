import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from './olympic.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private olympicService: OlympicService) {}

  handleError(error: { message: any }) {
    console.error('An error occurred:', error.message);
    console.error(error);
    this.olympicService.errorMessage = error.message;
    this.router.navigate(['error']);

    //alert(error);
  }
}
