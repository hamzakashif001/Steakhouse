// Centralized imagery. Hotlinked from the Unsplash CDN with on-the-fly
// WebP + sizing params for now; can be localized to /public/images later.
const U = (id: string, w = 1600, q = 68) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&fm=webp&w=${w}&q=${q}`;

export const images = {
  // Hero — sliced, seared steak on a dark board (verified)
  heroPoster: U('photo-1558030006-450675393462', 2000, 72),
  // The Craft — dramatic close-up of steak being carved (verified)
  craft: U('photo-1529692236671-f1f6cf9683ba', 1400),
  // Story — dim, warm restaurant interior (verify when building section)
  story: U('photo-1517248135467-4c7edcad34c4', 1400),
  // Private dining — set table, candlelight (verify when building section)
  privateDining: U('photo-1559339352-11d035aa65de', 1400),
};
