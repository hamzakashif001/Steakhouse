// Gallery image set for the 3D infinite gallery (and the fallback grid).
const G = (id: string, w = 900, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&fm=webp&w=${w}&q=${q}`;

export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: G('photo-1600891964599-f61ba0e24092'), alt: 'Hearth-charred ribeye, sliced' },
  { src: G('photo-1546833999-b9f581a1996d'), alt: 'Grilled steak with herbs' },
  { src: G('photo-1558030006-450675393462'), alt: 'Steak searing over open flame' },
  { src: G('photo-1544025162-d76694265947'), alt: 'Plated steak with garnish' },
  { src: G('photo-1432139509613-5c4255815697'), alt: 'Dark, moody dining room' },
  { src: G('photo-1559339352-11d035aa65de'), alt: 'Candlelit table setting' },
  { src: G('photo-1504674900247-0877df9cc836'), alt: 'Chef plating a dish' },
  { src: G('photo-1514516345957-556ca7d90a29'), alt: 'Whiskey pour at the bar' },
];
