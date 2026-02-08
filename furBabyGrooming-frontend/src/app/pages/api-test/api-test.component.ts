import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, CreateAppointmentRequest, PetType } from '../../api.service';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-test.component.html',
})
export class ApiTestComponent {
  pingResult: string = '';
  submitResult: string = '';
  error: string = '';

  form: CreateAppointmentRequest = {
    ownerName: 'Test User',
    ownerEmail: 'test@example.com',
    ownerPhone: '734-000-0000',
    petName: 'Buddy',
    petType: 'Dog',
    service: 'Full Groom',
    requestedDate: new Date().toISOString(),
    notes: 'Tracer bullet booking request',
  };

  constructor(private api: ApiService) {}

  ping() {
    this.error = '';
    this.api.ping().subscribe({
      next: (res) => (this.pingResult = JSON.stringify(res)),
      error: (e) => (this.error = e.message),
    });
  }

  submit() {
    this.error = '';
    this.api.createAppointment(this.form).subscribe({
      next: (res) => (this.submitResult = JSON.stringify(res, null, 2)),
      error: (e) => (this.error = e.message),
    });
  }

  setPetType(v: PetType) {
    this.form.petType = v;
  }
}
