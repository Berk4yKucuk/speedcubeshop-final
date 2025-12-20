// composables/useBrands.ts
import type { IBrand } from '~/types';

export const useBrands = () => {
  
  const brands: IBrand[] = [
    { name: 'GAN', logo: 'https://cdn.shopify.com/s/files/1/0951/1902/files/GAN_Cube_Logo_160x.png' },
    { name: 'MoYu', logo: 'https://cdn.shopify.com/s/files/1/0951/1902/files/MoYu_Logo_160x.png' },
    { name: 'QiYi', logo: 'https://cdn.shopify.com/s/files/1/0951/1902/files/QiYi_MoFangGe_Logo_160x.png' },
    { name: 'YJ', logo: 'https://cdn.shopify.com/s/files/1/0951/1902/files/YJ_Logo_160x.png' },
    { name: 'Yuxin', logo: 'https://cdn.shopify.com/s/files/1/0951/1902/files/YuXin_Logo_160x.png' },
  ];

  return {
    brands
  };
};