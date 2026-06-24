export const site = {
  name: 'Ember & Oak',
  shortName: 'E&O',
  tagline: 'An American chophouse, forged in fire.',
  intro:
    'In a converted 1907 ironworks in Pioneer Square, we cook over a coal-fired hearth, dry-age our own beef behind glass, and let Cascade ranches and the cold Pacific write the rest of the menu.',
  established: 1907,
  city: 'Seattle, Washington',
  address: {
    line1: '212 Occidental Ave S',
    line2: 'Pioneer Square, Seattle, WA 98104',
  },
  phone: '(206) 555-0142',
  phoneHref: 'tel:+12065550142',
  email: 'reserve@emberandoak.com',
  mapsUrl: 'https://maps.google.com/?q=Pioneer+Square+Seattle',
  hours: [
    { day: 'Monday – Thursday', time: '5:00 PM – 10:00 PM' },
    { day: 'Friday – Saturday', time: '4:30 PM – 12:00 AM' },
    { day: 'Sunday', time: '4:30 PM – 9:00 PM' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'X / Twitter', href: 'https://x.com', icon: 'twitter' },
  ],
  nav: [
    { label: 'Menu', href: '#menu' },
    { label: 'Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Private Dining', href: '#private-dining' },
  ],
} as const;

export const stats = [
  { value: 45, suffix: ' days', label: 'In-house dry-aging' },
  { value: 1100, suffix: '°F', label: 'Coal-fired hearth' },
  { value: 1907, prefix: 'Est. ', label: 'The ironworks' },
] as const;
