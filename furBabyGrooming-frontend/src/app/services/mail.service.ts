import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AppointmentRequest {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  petName: string;
  petBreed: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class MailService {
  private readonly apiUrl = `${environment.mailerUrl}/api/send-appointment`;

  constructor(private http: HttpClient) {}

  sendAppointmentRequest(data: AppointmentRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(this.apiUrl, data);
  }
}
