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
    //console.error('bbbbbbba');
    //console.error('An error occurred:');
    //console.log(error.error);
    // this.olympicService.errorMessage = error.error.message;
    //console.log(error);
    if (error instanceof Error) {
      this.olympicService.errorMessage = `oups there was an internal server error`;
    } else {
      this.olympicService.errorMessage = this.getServerErrorMessage(error);
    }
    console.log(error);
    this.router.navigate(['error']);

    //this.olympicService.errorMessage += 'titiiiiiiiii';
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
        return `Internal Server Error:`;
      }
      default: {
        return `Unknown Server Error:`;
      }
    }
  }
}
