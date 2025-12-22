<template>
  <div class="product-card">
    
    <div class="badges">
      <div v-if="badge" class="badge-hot">🔥 {{ badge }}</div>
      <div v-if="discount" class="badge-sale">-{{ discount }}%</div>
    </div>

    <NuxtLink :to="productUrl" class="image-wrapper">
      <img :src="image" :alt="title" class="product-img" />
      
      <div class="hover-actions">
        <ABaseButton class="action-btn" @click.prevent><ABaseIcon name="heart" size="14" /></ABaseButton>
        <ABaseButton class="action-btn" @click.prevent><ABaseIcon name="search" size="14" /></ABaseButton>
      </div>
    </NuxtLink>

    <div class="product-info">
      <ABaseRating :rating="rating" :count="reviewCount" size="12" />
      
      <h3 class="product-title">
        <NuxtLink :to="productUrl">{{ title }}</NuxtLink>
      </h3>
      
      <div class="price-box">
        <span class="current-price">${{ price }}</span>
        <span v-if="oldPrice" class="old-price">${{ oldPrice }}</span>
      </div>
    </div>

    <ABaseButton 
      class="add-to-cart-btn" 
      @click.stop="addToCart"
    >
      {{ isPreOrder ? 'PRE ORDER' : 'ADD TO CART' }}
    </ABaseButton>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/stores/cartStore';

const props = defineProps<{
  id?: string;
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

const cartStore = useCartStore();

const productUrl = computed(() => {
  return props.id ? `/product/${props.id}` : '#';
});

const addToCart = () => {
  cartStore.addToCart({
    title: props.title,
    price: props.price,
    image: props.image,
    rating: props.rating,
    reviewCount: props.reviewCount
  } as any);
};
</script>

<style scoped lang="scss">
.product-card {
  background: white;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid transparent; 

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    border-color: #eee;
    
    .hover-actions { opacity: 1; }
  }
}

.badges {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .badge-hot {
    background-color: white;
    color: #ff5722;
    font-size: 0.65rem;
    font-weight: 800;
    padding: 3px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .badge-sale {
    background-color: #d32f2f;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 5px;
    border-radius: 3px;
    width: fit-content;
  }
}

.image-wrapper {
  position: relative; 
  padding: 0;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  text-align: center;
  
  width: 100%;
  height: auto; 
  aspect-ratio: 1 / 1; /* Tam Kare */
  
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
  text-decoration: none;
  color: inherit;

  .product-img {
    display: block;
    width: 85%;
    height: 85%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover .product-img {
    transform: scale(1.05);
  }

  .hover-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.2s;

    .action-btn {
      width: 28px; height: 28px;
      padding: 0;
      border-radius: 50%;
      border: 1px solid #eee; background: white;
      color: #333; 
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      &:hover { color: var(--scs-orange); border-color: var(--scs-orange); }
    }
  }
}

.product-info {
  padding: 10px; 
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .product-title {
    font-size: 0.85rem;
    margin: 5px 0;
    line-height: 1.3;
    min-height: 2.6em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    a {
      color: #333; text-decoration: none; font-weight: 600;
      &:hover { color: var(--scs-orange); }
    }
  }

  .price-box {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: auto; 
    .current-price { font-weight: 800; color: #111; font-size: 1rem; }
    .old-price { text-decoration: line-through; color: #999; font-size: 0.8rem; }
  }
}

.add-to-cart-btn {
  width: calc(100% - 16px);
  margin: 0 8px 10px 8px;
  
  height: 32px !important; /* Sabit ince yükseklik */
  padding: 0 !important;   /* Padding sıfırla, flex ile ortala */
  
  display: flex !important;
  align-items: center;
  justify-content: center;
  
  background-color: #4CAF50;
  color: white;
  border: none;
  font-weight: 800; 
  text-transform: uppercase;
  font-size: 0.7rem; 
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* ASLA ALT SATIRA GEÇMEZ */
  letter-spacing: 0.5px;
  transition: background 0.2s;

  &:hover {
    background-color: #43a047;
  }
}
</style>