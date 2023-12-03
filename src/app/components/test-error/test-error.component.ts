import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { Country } from '../../core/models/Olympic';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss',
})
export class TestErrorComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const http$ = this.http.get<Country[]>('../assets/mock/olympic.json');

    http$
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => new Error(err));
        })
      )
      .subscribe({
        next: (res) => console.log('HTTP response ok.ooooooooo', res),
        error: (err) => console.log('HTTP Error ----------', err),
        complete: () => console.log('HTTP request completed.'),
      });
  }
}
