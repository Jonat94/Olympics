import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from './olympic.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private olympicService: OlympicService) {}

  handleError(error: { error: any }) {
    console.error('bbbbbbba');
    //console.error('An error occurred:');
    //console.error(error);
    this.olympicService.errorMessage = error.error.message;

    if (error.error instanceof ErrorEvent) {
      console.log('bbbbbbba');
      this.olympicService.errorMessage = `oups there was an internal server error`;
    } else {
      this.olympicService.errorMessage = this.getServerErrorMessage(
        error.error
      );
    }
    console.log('ddddddddd');
    this.router.navigate(['error']);

    //alert(error);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    console.log('aaazzzzaaaaaa');
    switch (error.status) {
      case 404: {
        return `oupss the server is unreachable`;
      }
      case 403: {
        return `Access Denied to the server`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
