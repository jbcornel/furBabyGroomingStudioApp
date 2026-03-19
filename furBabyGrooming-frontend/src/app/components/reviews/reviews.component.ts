import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Review {
  name: string;
  pet: string;
  rating: number;
  date: string;
  text: string;
  initials: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews: Review[] = [
    {
      name: 'Amanda T.',
      pet: 'Golden Retriever',
      rating: 5,
      date: 'March 2025',
      text: 'Absolutely amazing experience! My golden retriever Charlie came out looking like a show dog. The groomer was incredibly patient with him — he can be anxious around new people, but he was calm and happy the whole time. Will not go anywhere else.',
      initials: 'AT'
    },
    {
      name: 'Kevin M.',
      pet: 'Shih Tzu',
      rating: 5,
      date: 'February 2025',
      text: 'Brought my Shih Tzu Bella for her first groom and I was nervous about how she\'d do. They were so gentle and patient with her. She looks adorable and I could tell she felt comfortable. Booking again as soon as I can!',
      initials: 'KM'
    },
    {
      name: 'Sarah L.',
      pet: 'Labradoodle',
      rating: 5,
      date: 'February 2025',
      text: 'Best groomer in Monroe by far. My labradoodle always leaves smelling wonderful and the cut is always exactly what I ask for. Communication is great — I got a text when he was ready and the pickup was seamless.',
      initials: 'SL'
    },
    {
      name: 'Mike R.',
      pet: 'Rescue Mix',
      rating: 5,
      date: 'January 2025',
      text: 'We adopted a rescue mix who had clearly been through a lot and was terrified of grooming. They took their time, never rushed, and by the end she was wagging her tail. That means everything to us. Truly special service.',
      initials: 'MR'
    },
    {
      name: 'Diane P.',
      pet: 'Pomeranian',
      rating: 5,
      date: 'January 2025',
      text: 'My Pomeranian has the most temperamental coat and I\'ve had bad experiences elsewhere. Here they knew exactly what to do — she came out looking fluffy, clean, and beautiful. Pricing is very fair for the quality.',
      initials: 'DP'
    },
    {
      name: 'Chris H.',
      pet: 'Boxer',
      rating: 5,
      date: 'December 2024',
      text: 'Took my boxer in for a bath and nail trim. Quick, professional, and my dog actually seemed happy to be there. The staff genuinely loves animals — you can tell immediately. Highly recommend to anyone in Monroe.',
      initials: 'CH'
    }
  ];

  get averageRating(): number {
    return this.reviews.reduce((acc, r) => acc + r.rating, 0) / this.reviews.length;
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
