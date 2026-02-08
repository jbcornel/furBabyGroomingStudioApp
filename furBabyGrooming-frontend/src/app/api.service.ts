import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';


export type PetType = 'Dog' | 'Cat';

export interface CreateAppointmentRequest {
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;
  petName: string;
  petType: PetType;
  service: string;          
  requestedDate: string;    
  notes?: string;
}

export interface AppointmentResponse {
  id: number;
  ownerName: string;
  petName: string;
  petType: PetType;
  service: string;
  requestedDate: string;
  status: 'Requested' | 'Confirmed' | 'Cancelled';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

 
  ping(): Observable<{ status: string }> {
    return this.http
      .get<{ status: string }>(`${this.baseUrl}/api/health`)
      .pipe(catchError(this.handleError));
  }

  
  createAppointment(payload: CreateAppointmentRequest): Observable<AppointmentResponse> {
    return this.http
      .post<AppointmentResponse>(`${this.baseUrl}/api/appointments`, payload, {
        headers: this.jsonHeaders(),
      })
      .pipe(catchError(this.handleError));
  }


  getAppointments(): Observable<AppointmentResponse[]> {
    return this.http
      .get<AppointmentResponse[]>(`${this.baseUrl}/api/appointments`)
      .pipe(catchError(this.handleError));
  }

  private jsonHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private handleError(err: HttpErrorResponse) {
    const message =
      err.error?.message ||
      err.error?.title ||
      (typeof err.error === 'string' ? err.error : null) ||
      `Request failed (${err.status})`;
    return throwError(() => new Error(message));
  }
}
