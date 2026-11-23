import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Launch, CreateLaunchDto, UpdateLaunchDto } from '../models/launch.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/launches'; 

  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.apiUrl)
  }

  getLaunchById(id: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.apiUrl}/${id}`);
  }

  addLaunch(launch: CreateLaunchDto): Observable<Launch> {
    return this.http.post<Launch>(this.apiUrl, launch).pipe()
  }

  updateLaunch(id: string, changes: UpdateLaunchDto): Observable<Launch> {
    return this.http.put<Launch>(`${this.apiUrl}/${id}`, changes);
  }

  deleteLaunch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    switch (error.status) {
      case 0:
        message = 'Cannot reach the server. Check that the API is running.';
        break;
      case 400:
        message = 'Some of the data was not valid.';
        break;
      case 401:
        message = 'Please log in to continue.';
        break;
      case 403:
        message = 'You are not allowed to do that.';
        break;
      case 404:
        message = 'That launch could not be found.';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }

    // Full details for the developer, a short message for the user
    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  }

}
