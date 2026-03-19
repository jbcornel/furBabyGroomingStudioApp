import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MailService } from '../../services/mail.service';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  form: FormGroup;
  status: FormStatus = 'idle';
  errorMessage = '';

  services = [
    'Bath & Brush',
    'Full Groom',
    'Nail Trim Only',
    'Ear Cleaning Only',
    'Bath & Nail Trim',
    'De-Shedding Treatment',
    "Puppy's First Groom",
    'Other (describe in notes)'
  ];

  timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',
    '3:00 PM',  '3:30 PM',  '4:00 PM'
  ];

  /** Minimum selectable date = today */
  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  constructor(private fb: FormBuilder, private mailService: MailService) {
    this.form = this.fb.group({
      ownerName:     ['', [Validators.required, Validators.minLength(2)]],
      ownerPhone:    ['', [Validators.required, Validators.pattern(/^\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/)]],
      ownerEmail:    ['', [Validators.required, Validators.email]],
      petName:       ['', [Validators.required]],
      petBreed:      [''],
      serviceType:   ['', [Validators.required]],
      preferredDate: ['', [Validators.required]],
      preferredTime: ['', [Validators.required]],
      notes:         ['']
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status = 'submitting';
    this.errorMessage = '';

    this.mailService.sendAppointmentRequest(this.form.value).subscribe({
      next: () => {
        this.status = 'success';
        this.form.reset();
      },
      error: (err) => {
        this.status = 'error';
        this.errorMessage = err?.error?.message ?? 'Something went wrong. Please call or text us directly at (734) 731-4582.';
      }
    });
  }

  resetForm(): void {
    this.status = 'idle';
    this.errorMessage = '';
    this.form.reset();
  }
}
