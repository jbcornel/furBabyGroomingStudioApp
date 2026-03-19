import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentYear = new Date().getFullYear();

  services = [
    {
      icon: 'bi-droplet-half',
      title: 'Bath & Brush',
      desc: 'Full shampoo, conditioner, blow-dry, and brush-out tailored to your pet\'s coat.'
    },
    {
      icon: 'bi-scissors',
      title: 'Full Groom',
      desc: 'Complete styling including breed-specific haircut, bath, ear cleaning, and nail trim.'
    },
    {
      icon: 'bi-hand-index-thumb',
      title: 'Nail Trim',
      desc: 'Quick, stress-free nail trimming to keep your pup comfortable and your floors safe.'
    },
    {
      icon: 'bi-ear',
      title: 'Ear Cleaning',
      desc: 'Gentle ear cleaning to prevent buildup and keep infections at bay.'
    },
    {
      icon: 'bi-stars',
      title: 'De-Shed Treatment',
      desc: 'Deep de-shedding treatment that dramatically reduces loose fur and dander.'
    },
    {
      icon: 'bi-heart-pulse',
      title: 'Puppy\'s First Groom',
      desc: 'A gentle, positive first experience designed to build trust and ease anxiety.'
    }
  ];

  steps = [
    {
      number: '01',
      icon: 'bi-calendar2-check',
      title: 'Request an Appointment',
      desc: 'Fill out our simple online form and we\'ll confirm your preferred time.'
    },
    {
      number: '02',
      icon: 'bi-geo-alt',
      title: 'Drop Off Your Pup',
      desc: 'Bring your furry friend to our studio at 15150 Grand Blvd, Monroe, MI.'
    },
    {
      number: '03',
      icon: 'bi-stars',
      title: 'Pick Up Pampered',
      desc: 'Your pet leaves looking — and feeling — absolutely fabulous.'
    }
  ];

  faqs = [
    {
      id: 'faq1',
      q: 'How long does a grooming appointment take?',
      a: 'Most appointments take 2–3 hours depending on breed, coat condition, and service selected. We\'ll give you an estimated pick-up time when you drop off.'
    },
    {
      id: 'faq2',
      q: 'Do I need to bring anything?',
      a: 'Just your pet! We provide all shampoos, conditioners, and tools. If your pet has a favorite treat or toy that helps them relax, feel free to bring it.'
    },
    {
      id: 'faq3',
      q: 'Are you experienced with anxious dogs?',
      a: 'Absolutely. We take a calm, patient approach and have experience working with nervous, reactive, and senior pets.'
    },
    {
      id: 'faq4',
      q: 'How do I schedule an appointment?',
      a: 'Use our online Request Appointment form, or call/text us directly at (734) 731-4582 and we\'ll get you on the calendar.'
    }
  ];
}
