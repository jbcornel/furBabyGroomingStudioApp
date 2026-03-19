import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  values = [
    {
      icon: 'bi-heart-fill',
      title: 'Genuine Love for Animals',
      desc: 'Every dog that walks through our door is treated like family. We go slow, stay calm, and make sure your pet feels safe.'
    },
    {
      icon: 'bi-award-fill',
      title: 'Professional Craftsmanship',
      desc: 'Years of hands-on grooming experience across all breeds, coat types, and temperaments.'
    },
    {
      icon: 'bi-shield-check-fill',
      title: 'Safety First',
      desc: 'We never rush, never force, and never use techniques that cause discomfort. Your pet\'s wellbeing is always the priority.'
    },
    {
      icon: 'bi-chat-heart-fill',
      title: 'Open Communication',
      desc: 'We keep you informed at every step and welcome your preferences so the final result is exactly what you envisioned.'
    }
  ];
}
