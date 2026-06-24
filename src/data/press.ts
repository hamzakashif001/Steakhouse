export interface Quote {
  quote: string;
  source: string;
  rating?: number;
}

// Illustrative quotes for this showcase build.
export const press: Quote[] = [
  {
    quote:
      'The best fire-cooked steak in the city, served in a room that feels like a secret. Ember & Oak has rewritten what a Seattle chophouse can be.',
    source: 'Seattle Met',
    rating: 5,
  },
  {
    quote:
      'That 45-day ribeye is worth the pilgrimage to Pioneer Square — char-deep, butter-soft, unforgettable.',
    source: 'Eater Seattle',
    rating: 5,
  },
  {
    quote:
      'Dark, romantic, and quietly perfect. The hospitality matches the kitchen, and the kitchen is exceptional.',
    source: 'The Infatuation',
    rating: 5,
  },
];
