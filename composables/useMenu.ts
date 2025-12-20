// composables/useMenu.ts
import type { IMenuSection, ICurrency } from '~/types';

export const useMenu = () => {
  
  // 1. MEGA MENU VERİSİ
  const cubesMenuData: IMenuSection[][] = [
    // 1. Sütun
    [
      {
        title: 'BY SIZE',
        links: [
          { text: '3x3', url: '#' },
          { text: '2x2', url: '#' },
          { text: '4x4', url: '#' },
          { text: '5x5', url: '#' },
          { text: '6x6', url: '#' },
          { text: '7x7', url: '#' },
          { text: 'Big Cubes (8x8+)', url: '#' },
        ]
      },
      {
        title: 'SHAPE SHIFTING',
        links: [
          { text: 'Shop all Shape Shifting', url: '#' },
          { text: 'Mirror / Bump', url: '#' },
          { text: 'Fisher', url: '#' },
          { text: 'Windmill', url: '#' },
          { text: 'Axis', url: '#' },
        ]
      }
    ],
    // 2. Sütun
    [
      {
        title: 'BY EVENT',
        links: [
          { text: 'Pyraminx', url: '#' },
          { text: 'Megaminx', url: '#' },
          { text: 'Skewb', url: '#' },
          { text: 'Square-1', url: '#' },
          { text: 'Clock', url: '#' },
        ]
      }
    ],
    // 3. Sütun
    [
      {
        title: 'SPECIALTY',
        links: [
          { text: 'Shop all Specialty Cubes', url: '#' },
          { text: 'Smart / Bluetooth', url: '#' },
          { text: 'Oversized', url: '#' },
          { text: 'Mini', url: '#' },
          { text: 'Glow in the Dark', url: '#' },
          { text: 'Metallic', url: '#' },
          { text: 'Sticker Mods', url: '#' },
          { text: 'Special Edition', url: '#' },
        ]
      }
    ],
    // 4. Sütun
    [
      {
        title: 'TWISTY PUZZLES',
        links: [
          { text: 'Shop all Twisty Puzzles', url: '#' },
          { text: 'Cuboids', url: '#' },
          { text: 'Shape Mods', url: '#' },
          { text: 'Ghost', url: '#' },
          { text: 'Gear', url: '#' },
          { text: 'Picture', url: '#' },
          { text: 'Animal Shape Mods', url: '#' },
          { text: 'FTO', url: '#' },
          { text: 'Bandaged', url: '#' },
          { text: 'Snake', url: '#' },
          { text: 'Fused', url: '#' },
        ]
      }
    ],
    // 5. Sütun
    [
      {
        title: 'VARIANTS & MORE',
        links: [
          { text: 'Bundles', url: '#' },
          { text: 'Mosaic Kits', url: '#' },
          { text: 'Magic Panels', url: '#' },
          { text: 'Klotski', url: '#' },
          { text: 'Sudoku', url: '#' },
          { text: 'Megaminx +', url: '#' },
          { text: 'Pyraminx +', url: '#' },
          { text: 'Square-1 +', url: '#' },
          { text: 'Shop all', url: '#' },
        ]
      }
    ]
  ];

  // 2. PARA BİRİMİ VERİSİ
  const currencies: ICurrency[] = [
    { code: 'USD', flag: 'us' },
    { code: 'CAD', flag: 'ca' },
    { code: 'AUD', flag: 'au' },
    { code: 'EUR', flag: 'eu' },
    { code: 'GBP', flag: 'gb' },
  ];

  return {
    cubesMenuData,
    currencies
  };
};