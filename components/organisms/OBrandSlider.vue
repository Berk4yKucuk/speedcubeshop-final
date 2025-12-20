<template>
  <section class="brand-slider-section">
    <div class="container">
      
      <div class="divider-header">
        <span class="line"></span>
        <h4 class="brand-title">OFFICIAL RETAILER FOR TOP BRANDS</h4>
        <span class="line"></span>
      </div>

      <div class="slider-wrapper">
        
        <button class="nav-btn prev" @click="scroll('left')">
          <ABaseIcon name="chevron-down" style="transform: rotate(90deg);" />
        </button>

        <div class="brands-track" ref="scrollContainer">
          <div 
            v-for="(brand, index) in brands" 
            :key="index" 
            class="brand-item"
          >
            <span class="brand-name">{{ brand.name }}</span>
          </div>
        </div>

        <button class="nav-btn next" @click="scroll('right')">
          <ABaseIcon name="chevron-down" style="transform: rotate(-90deg);" />
        </button>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 8 Adet Marka (İleride 'logo' alanlarını dolduracağız)
const brands = [
  { name: "Rubik's", logo: '//speedcubeshop.com/cdn/shop/files/Rubik_s-Tile_250x.png?v=1725307086' },
  { name: 'GAN', logo: '//speedcubeshop.com/cdn/shop/files/GAN-Tile_250x.png?v=1636494250' },
  { name: 'MoYu', logo: '' },
  { name: 'DianSheng', logo: '' },
  { name: 'QiYi', logo: '' },
  { name: 'YJ', logo: '' },
  { name: 'X-Man Design', logo: '' },
  { name: 'YuXin', logo: '' },
];

const scrollContainer = ref<HTMLElement | null>(null);

// TEK TEK KAYDIRMA FONKSİYONU
const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    // Bir kartın genişliği (150px) + boşluk (20px) = 170px
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
    color: #888;
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
  gap: 20px; /* Markalar arası boşluk */
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  padding: 10px 5px;
  
  /* Scrollbar gizleme */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.brand-item {
  /* Sabit genişlik veriyoruz ki "tek tek" kaydırma düzgün çalışsın */
  min-width: 150px; 
  height: 80px;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #555;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.2s;
  user-select: none; /* Yazı seçilmesin */
  
  &:hover {
    border-color: var(--scs-orange);
    color: var(--scs-orange);
    background-color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }

  .brand-name {
    padding: 0 10px;
  }
}

.nav-btn {
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0; /* Butonlar ezilmesin */
  color: #666;
  transition: all 0.2s;
  
  &:hover {
    background: var(--scs-orange);
    border-color: var(--scs-orange);
    color: white;
  }
}


</style>