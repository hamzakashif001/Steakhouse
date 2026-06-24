// Local, optimized WebP served same-origin from /public/images/gallery.
export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/g1.webp', alt: 'Hearth-charred steak, sliced on a board' },
  { src: '/images/gallery/g2.webp', alt: 'Dry-aged steak carved tableside' },
  { src: '/images/gallery/g3.webp', alt: 'Steak frites on dark walnut' },
  { src: '/images/gallery/g4.webp', alt: 'Bone-in ribeye with red-wine reduction' },
  { src: '/images/gallery/g5.webp', alt: 'Slow-smoked ribs on a carving board' },
  { src: '/images/gallery/g6.webp', alt: 'The dining room at dusk' },
  { src: '/images/gallery/g7.webp', alt: 'A candlelit table set for service' },
  { src: '/images/gallery/g8.webp', alt: 'A smoked old fashioned at the bar' },
  { src: '/images/gallery/g9.webp', alt: 'Whiskey poured over hand-cut ice' },
  { src: '/images/gallery/g10.webp', alt: 'In the kitchen, prep underway' },
];
