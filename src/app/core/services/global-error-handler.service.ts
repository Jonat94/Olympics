import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from './olympic.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private olympicService: OlympicService) {}

  handleError(error: Error) {
    if (error instanceof Error) {
      this.olympicService.errorMessage = `${error.message}`;
    } else {
      this.olympicService.errorMessage = this.getServerErrorMessage(error);
    }
    console.error(error);
    this.router.navigate(['error']);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `oupss the server is unreachable`;
      }
      case 403: {
        return `Access Denied to the server`;
      }
      case 500: {
        return `Internal Server Error`;
      }
      default: {
        return `Server Error : ${error.error.error}`;
      }
    }
  }
}
