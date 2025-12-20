// composables/useProducts.ts
import type { IProduct } from '~/types';

export const useProducts = () => {
  
  // 1. İSTENEN MENÜLER
  const tabs = ['2x2', '3x3', '4x4'];

  // 2. ÜRÜN LİSTESİ (Toplam 16 Ürün: 8 adet 2x2, 6 adet 3x3, 2 adet 4x4)
  const products: IProduct[] = [
    
    // --- 2x2 KATEGORİSİ (8 ADET) ---
    { title: 'GAN 251 M Pro 2x2', price: 32.95, rating: 5, reviewCount: 120, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/GAN_251_M_Pro_2x2_1_360x.png', badge: 'BEST' },
    { title: 'MoYu RS2 M 2020', price: 8.95, rating: 4.8, reviewCount: 340, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/MoYu_RS2_M_2020_1_360x.png', badge: 'HOT' },
    { title: 'YJ MGC 2x2 Magnetic', price: 11.95, rating: 4.9, reviewCount: 85, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YJ_MGC_2x2_Magnetic_1_360x.png' },
    { title: 'QiYi MS 2x2 Magnetic', price: 7.95, rating: 4.5, reviewCount: 50, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/QiYi_MS_2x2_Magnetic_1_360x.png' },
    { title: 'Valk 2 M 2x2', price: 18.95, rating: 4.7, reviewCount: 200, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/Valk_2_M_1_360x.png' },
    { title: 'Yuxin Little Magic 2x2', price: 5.95, rating: 4.2, reviewCount: 110, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YuXin_Little_Magic_2x2_M_1_360x.png' },
    { title: 'DaYan TengYun 2x2 V2', price: 28.95, rating: 4.8, reviewCount: 45, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/DaYan_TengYun_V2_M_2x2_1_360x.png' },
    { title: 'X-Man Flare 2x2 M', price: 15.95, rating: 4.6, reviewCount: 75, category: '2x2', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/X-Man_Flare_2x2_M_1_360x.png' },

    // --- 3x3 KATEGORİSİ (6 ADET) ---
    { title: 'MoYu RS3 M 2020', price: 8.95, rating: 5, reviewCount: 1547, category: '3x3', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/MoYu_RS3_M_2020_3x3_Magnetic_1_360x.png', badge: 'HOT SELLER' },
    { title: 'GAN 12 MagLev 3x3', price: 77.95, rating: 5, reviewCount: 432, category: '3x3', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/GAN_12_MagLev_3x3_UV_Coated_Primary_1_360x.png', badge: 'NEW' },
    { title: 'MoreTry Tianma X3', price: 24.95, oldPrice: 32.95, rating: 4, reviewCount: 25, category: '3x3', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/MoreTry_Tianma_X3_3x3_Magnetic_Snap_1_360x.png', badge: 'SALE', discount: 25 },
    { title: 'QiYi Warrior S 3x3', price: 3.95, rating: 4.3, reviewCount: 890, category: '3x3', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/QiYi_Warrior_S_3x3_1_360x.png' },
    { title: 'Tornado V3 M Flagship', price: 34.95, rating: 4.9, reviewCount: 120, category: '3x3', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/X-Man_Tornado_V3_M_Flagship_3x3_1_360x.png' },
    { title: 'YJ MGC Evo 3x3', price: 22.95, rating: 4.7, reviewCount: 65, category: '3x3', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YJ_MGC_Evo_3x3_1_360x.png' },

    // --- 4x4 KATEGORİSİ (2 ADET) ---
    { title: 'QiYi MS Magnetic 4x4', price: 14.95, rating: 4.5, reviewCount: 89, category: '4x4', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/QiYi_MS_4x4_Magnetic_1_360x.png' },
    { title: 'YJ MGC 4x4 Magnetic', price: 19.95, rating: 4.8, reviewCount: 210, category: '4x4', image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YJ_MGC_4x4_Magnetic_1_360x.png', badge: 'Top Pick' },

  ];

  return {
    products,
    tabs
  };
};