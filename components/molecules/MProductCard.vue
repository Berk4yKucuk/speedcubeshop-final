<template>
  <div class="product-card">
    
    <div class="badges">
      <div v-if="badge" class="badge-hot">🔥 {{ badge }}</div>
      <div v-if="discount" class="badge-sale">-{{ discount }}%</div>
    </div>

    <div class="image-wrapper">
      <img :src="image" :alt="title" class="product-img" />
      <div class="hover-actions">
        <button class="action-btn"><ABaseIcon name="heart" size="16" /></button>
        <button class="action-btn"><ABaseIcon name="search" size="16" /></button>
      </div>
    </div>

    <div class="product-info">
      <ABaseRating :rating="rating" :count="reviewCount" />
      
      <h3 class="product-title">
        <NuxtLink to="#">{{ title }}</NuxtLink>
      </h3>
      
      <div class="price-box">
        <span class="current-price">${{ price }}</span>
        <span v-if="oldPrice" class="old-price">${{ oldPrice }}</span>
      </div>
    </div>

    <button 
      class="add-to-cart-btn" 
      @click.stop="addToCart"
    >
      {{ isPreOrder ? 'PRE ORDER' : 'ADD TO CART' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore';

const props = defineProps<{
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string; 
  discount?: number;
  isPreOrder?: boolean;
}>();

// Store'u başlat
const cartStore = useCartStore();

// Sepete Ekleme Fonksiyonu
const addToCart = () => {
  cartStore.addToCart({
    title: props.title,
    price: props.price,
    image: props.image,
    // Diğer zorunlu alanlar store tipine göre eklenebilir
    rating: props.rating,
    reviewCount: props.reviewCount
  } as any);
};
</script>

<style scoped lang="scss">
/* MEVCUT STİLLER AYNEN KORUNUYOR */
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    
    .hover-actions { opacity: 1; }
  }
}

.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .badge-hot {
    background-color: white;
    color: #ff5722;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .badge-sale {
    background-color: #ff0000;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    width: fit-content;
  }
}

.image-wrapper {
  position: relative;
  padding: 20px;
  background: #f9f9f9;
  text-align: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  .product-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .hover-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s;

    .action-btn {
      width: 30px; height: 30px;
      border-radius: 50%;
      border: none; background: white;
      color: #333; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      &:hover { color: var(--scs-orange); }
    }
  }
}

.product-info {
  padding: 15px;
  flex: 1;

  .product-title {
    font-size: 0.95rem;
    margin: 10px 0;
    line-height: 1.4;
    a {
      color: #333; text-decoration: none; font-weight: 600;
      &:hover { color: var(--scs-orange); }
    }
  }

  .price-box {
    display: flex;
    align-items: center;
    gap: 8px;
    .current-price { font-weight: 800; color: #111; font-size: 1.1rem; }
    .old-price { text-decoration: line-through; color: #999; font-size: 0.9rem; }
  }
}

.add-to-cart-btn {
  width: calc(100% - 20px);
  margin: 0 10px 15px 10px;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #43a047;
  }
}
</style>