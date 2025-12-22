import { defineStore } from 'pinia';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { IProduct } from '~/types';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as IProduct[],         
    filteredProducts: [] as IProduct[], 
    selectedProduct: null as IProduct | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // Kategorileri benzersiz olarak alır
    getCategoryTabs: (state) => {
      const categories = state.products.map(p => p.category).filter(Boolean);
      return ['All', ...new Set(categories)] as string[];
    }
  },

  actions: {
    // 1. TÜM ÜRÜNLERİ ÇEK (Shop ve Home sayfası için)
    async fetchProducts() {
      // Zaten veri varsa tekrar çekme 
      if (this.products.length > 0) return; 
      
      this.loading = true;
      try {
        const { $db } = useNuxtApp();
        const querySnapshot = await getDocs(collection($db as any, 'products'));
        const productsData: IProduct[] = [];
        
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as IProduct);
        });
        
        this.products = productsData;
        this.filteredProducts = productsData; // Başlangıçta hepsi görünsün
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 2. TEK ÜRÜN ÇEK (Detay sayfası için)
    async fetchProductById(id: string) {
      this.loading = true;
      this.error = null;
      this.selectedProduct = null; 

      try {
        const { $db } = useNuxtApp();
        const docRef = doc($db as any, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.selectedProduct = { id: docSnap.id, ...docSnap.data() } as IProduct;
        } else {
          this.error = "Product not found";
        }
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 3. İSİM İLE FİLTRELEME (Shop sayfası için)
    filterBySearch(text: string) {
      if (!text) {
        // Arama boşsa hepsini göster
        this.filteredProducts = this.products;
      } else {
        const lower = text.toLowerCase();
        this.filteredProducts = this.products.filter(p => 
          p.title.toLowerCase().includes(lower)
        );
      }
    },

    // 4. KATEGORİ İLE FİLTRELEME 
    filterByCategory(category: string) {
      if (!category || category === 'All') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(p => p.category === category);
      }
    }
  }
});