export interface MenuItem {
  name: string;
  description: string;
  price: string;
  signature?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

export const menu: MenuSection[] = [
  {
    id: 'hearth',
    title: 'From the Hearth',
    note: 'Coal-fired, finished in brown butter. Served by weight.',
    items: [
      {
        name: 'Dry-Aged Bone-In Ribeye',
        description: '45-day aged, 22 oz, Cascade Highland beef',
        price: '94',
        signature: true,
      },
      {
        name: 'Center-Cut Filet Mignon',
        description: '8 oz, hearth-charred, bordelaise',
        price: '62',
      },
      {
        name: 'A5 Wagyu Strip',
        description: 'Miyazaki, 6 oz, sea salt & smoked tallow',
        price: '155',
        signature: true,
      },
      {
        name: 'Porterhouse for Two',
        description: '38 oz, dry-aged, carved tableside',
        price: '168',
      },
    ],
  },
  {
    id: 'sea',
    title: 'From the Pacific',
    items: [
      {
        name: 'Cedar-Smoked King Salmon',
        description: 'Neah Bay, charred lemon, dill oil',
        price: '46',
      },
      {
        name: 'Butter-Poached Dungeness',
        description: 'Whole crab, brown-butter hollandaise',
        price: '72',
        signature: true,
      },
      {
        name: 'Hama Hama Oysters',
        description: 'Half dozen, brass-pepper mignonette',
        price: '28',
      },
    ],
  },
  {
    id: 'sides',
    title: 'Sides & Hearth Greens',
    items: [
      { name: 'Bone Marrow & Sourdough', description: 'Hearth-roasted, parsley salsa', price: '19' },
      { name: 'Truffled Pommes Purée', description: 'Yukon gold, aged butter', price: '16' },
      { name: 'Charred Hispi Cabbage', description: 'Black garlic, brown-butter crumb', price: '15' },
      { name: 'Hand-Cut Hearth Fries', description: 'Smoked rosemary salt', price: '12' },
    ],
  },
  {
    id: 'dessert',
    title: 'To Finish',
    items: [
      { name: 'Burnt Basque Cheesecake', description: 'Madagascar vanilla, ember caramel', price: '15' },
      { name: 'Dark Chocolate Marquise', description: 'Smoked sea salt, cocoa nib', price: '16' },
      { name: 'Aged Whiskey Flight', description: 'Three pours, Pacific Northwest distillers', price: '34' },
    ],
  },
];
