import { defineStore } from 'pinia';
import type { IProduct } from '~/types';

// Sepetteki ürün tipi (Ürün + Adet)
export interface ICartItem extends IProduct {
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as ICartItem[],
    isOpen: false, // Sepet açık mı kapalı mı?
  }),

  getters: {
    // Sepetteki toplam ürün sayısı (Rozet için)
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    // Sepet tutarı
    subtotal: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2),
    
    // Sepet boş mu?
    isEmpty: (state) => state.items.length === 0
  },

  actions: {
    // Sepeti Aç/Kapa
    toggleCart() {
      this.isOpen = !this.isOpen;
    },
    
    openCart() {
      this.isOpen = true;
    },

    closeCart() {
      this.isOpen = false;
    },

    // Ürün Ekle
    addToCart(product: IProduct) {
      const existingItem = this.items.find(item => item.title === product.title); // ID olmadığı için Title kullanıyoruz şimdilik
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      
      this.openCart(); // Ekleme yapınca sepeti otomatik aç (Güzel UX)
    },

    // Ürün Çıkar
    removeItem(title: string) {
      this.items = this.items.filter(item => item.title !== title);
    },

    // Adet Güncelle (+/-)
    updateQuantity(title: string, delta: number) {
      const item = this.items.find(i => i.title === title);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          this.removeItem(title);
        }
      }
    }
  }
});