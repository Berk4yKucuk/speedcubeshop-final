<template>
  <section class="brand-slider-section">
    <div class="container">
      
      <div class="divider-header">
        <span class="line"></span>
        <h4 class="brand-title">OFFICIAL RETAILER FOR TOP BRANDS</h4>
        <span class="line"></span>
      </div>

      <div class="slider-wrapper">
        
        <ABaseButton 
            variant="outline" 
            class="nav-btn prev" 
            @click="scroll('left')"
        >
          <ABaseIcon name="chevron-down" style="transform: rotate(90deg);" />
        </ABaseButton>

        <div class="brands-track" ref="scrollContainer">
          
          <div v-if="isLoading" class="loading-state">
            Loading...
          </div>

          <div 
            v-else
            v-for="(brand, index) in brands" 
            :key="index" 
            class="brand-item"
          >
            <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" class="brand-logo" />
            <span v-else class="brand-name">{{ brand.name }}</span>
          </div>

        </div>

        <ABaseButton 
            variant="outline" 
            class="nav-btn next" 
            @click="scroll('right')"
        >
          <ABaseIcon name="chevron-down" style="transform: rotate(-90deg);" />
        </ABaseButton>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useBrandStore } from '~/stores/brandStore';

// Store'u çağır
const brandStore = useBrandStore();

const scrollContainer = ref<HTMLElement | null>(null);

// State'i Store'dan computed olarak al (Reaktif olması için)
const brands = computed(() => brandStore.brands);
const isLoading = computed(() => brandStore.loading);

// Sayfa yüklendiğinde Store action'ını tetikle
onMounted(() => {
  brandStore.fetchBrands();
});

// Kaydırma Fonksiyonu 
const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const itemWidth = 170; 
    scrollContainer.value.scrollBy({
      left: direction === 'right' ? itemWidth : -itemWidth,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped lang="scss">
.brand-slider-section {
  padding: 40px 0;
  background: white;
  margin-top: none;
  border-top: none;
}

.divider-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  
  .line {
    flex: 1;
    height: 1px;
    background-color: #eee;
  }

  .brand-title {
    margin: 0 20px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #111;
    white-space: nowrap;
    letter-spacing: 0.5px;
  }
}

.slider-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

.brands-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 10px 5px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.loading-state {
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 0.9rem;
}

.brand-item {
  min-width: 150px; 
  height: 80px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #555;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.2s;
  user-select: none; 
  overflow: hidden; 
  padding: 0; 
  
  &:hover {
    border-color: var(--scs-orange);
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }

  .brand-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .brand-name {
    padding: 0 10px;
  }
}

.nav-btn {
  /* ABaseButton override */
  background-color: white !important; 
  border: 1px solid #ddd !important;
  color: #333 !important;

  border-radius: 100%;
  width: 30px;  
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    background-color: black !important;
    border-color: black !important;
    color: white !important;
  }
}
</style>