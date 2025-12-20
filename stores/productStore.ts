import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore'; 
import type { IProduct } from '~/types';

export const useProductStore = defineStore('product', {
  // 1. STATE: Verilerin tutulduğu yer
  state: () => ({
    products: [] as IProduct[], // Ürünleri burada saklayacağız
    loading: false,             // Yükleniyor mu? (Spinner için)
    error: null as string | null, // Hata var mı?
  }),

  // 2. GETTERS: Veriyi işleyip sunan fonksiyonlar (Computed gibi)
  getters: {
    // Kategori listesini ürünlerden otomatik çıkarır (Tekrar edenleri siler)
    getCategoryTabs: (state) => {
      const categories = state.products.map(p => p.category).filter(Boolean);
      return [...new Set(categories)] as string[]; // Unique yapar ['2x2', '3x3'...]
    }
  },

  // 3. ACTIONS: İş zekası ve API çağrıları
  actions: {
    async fetchProducts() {
      // Eğer veriler zaten çekildiyse tekrar yorma (Performans)
      if (this.products.length > 0) return;

      this.loading = true;
      this.error = null;

      try {
        const { $db } = useNuxtApp(); // Plugin'den veritabanını al
        
        // 'products' koleksiyonundaki tüm belgeleri çek
        const querySnapshot = await getDocs(collection($db as any, 'products'));
        
        // Gelen veriyi formatla ve state'e kaydet
        this.products = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() } as unknown as IProduct;
        });
        
        console.log("🔥 Ürünler Firebase'den çekildi:", this.products.length, "adet");

      } catch (err: any) {
        this.error = err.message;
        console.error("Firebase Hatası:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});