import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore';
// Eğer types/index.ts içinde IBrand tanımlı değilse 'any' kullanabilirsin veya types dosyana ekleyebilirsin.
// Şimdilik types dosyanda IBrand olduğunu varsayıyorum (hatırladığım kadarıyla vardı).
import type { IBrand } from '~/types'; 

export const useBrandStore = defineStore('brand', {
  state: () => ({
    brands: [] as IBrand[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchBrands() {
      // Eğer veriler zaten çekildiyse tekrar çekme (Performans)
      if (this.brands.length > 0) return;

      this.loading = true;
      try {
        const { $db } = useNuxtApp();
        const querySnapshot = await getDocs(collection($db as any, 'brands'));
        
        const brandsData: IBrand[] = [];
        querySnapshot.forEach((doc) => {
          // doc.data() verisini IBrand tipine zorluyoruz
          brandsData.push(doc.data() as IBrand);
        });

        this.brands = brandsData;
      } catch (err: any) {
        console.error("Markalar çekilirken hata:", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});