<template>
  <section class="home-products-section container">
    
    <div v-if="productStore.loading" class="loading-state">
      Veriler Yükleniyor...
    </div>

    <div v-else-if="productStore.error" class="error-state">
      Bir hata oluştu: {{ productStore.error }}
    </div>

    <div v-else class="content-wrapper">
      
      <div class="section-header">
        <span class="line"></span>
          <h2 class="section-title">POPULAR SPEED CUBES</h2>
        <span class="line"></span>
      </div>
      <div class="section-header">
       
        
        <div class="tabs-wrapper">
          <ABaseButton 
            v-for="tab in tabs" 
            :key="tab"
            class="tab-btn"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab.toUpperCase() }}
          </ABaseButton>
        </div>

        <div class="header-spacer"></div>
      </div>

      <div class="product-carousel-wrapper">
        
        <ABaseButton class="carousel-btn left-btn" @click="prevSlide">
          <ABaseIcon name="chevron-left" size="24" />
        </ABaseButton>

        <div class="carousel-window">
          <div 
            class="carousel-track" 
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div 
              v-for="product in filteredProducts" 
              :key="product.title" 
              class="card-wrapper"
            >
              <MProductCard 
                :title="product.title"
                :price="product.price"
                :old-price="product.oldPrice"
                :rating="product.rating"
                :review-count="product.reviewCount"
                :image="product.image"
                :badge="product.badge"
                :discount="product.discount"
              />
            </div>
          </div>
        </div>

        <ABaseButton class="carousel-btn right-btn" @click="nextSlide">
          <ABaseIcon name="chevron-right" size="24" />
        </ABaseButton>

      </div>

      <div class="carousel-dots" v-if="totalSlides > 1">
        <span 
          v-for="(n, index) in totalSlides" 
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useProductStore } from '~/stores/productStore';

// 1. STORE BAĞLANTISI
const productStore = useProductStore();

// Sayfa yüklendiğinde verileri çek
onMounted(() => {
  productStore.fetchProducts();
});

// --- STATE ---
const tabs = computed(() => {
    return productStore.getCategoryTabs.length > 0 ? productStore.getCategoryTabs : ['2x2'];
});

const activeTab = ref('2x2'); 
const currentIndex = ref(0);
const itemsPerSlide = 4;

// --- COMPUTED ---
const filteredProducts = computed(() => {
  return productStore.products.filter(product => product.category === activeTab.value);
});

const totalSlides = computed(() => Math.ceil(filteredProducts.value.length / itemsPerSlide));

// --- WATCH ---
watch(activeTab, () => {
  currentIndex.value = 0;
});

watch(tabs, (newTabs) => {
    if (newTabs.length > 0 && !newTabs.includes(activeTab.value)) {
        activeTab.value = newTabs[0];
    }
});

// --- METODLAR ---
const nextSlide = () => {
  if (currentIndex.value >= totalSlides.value - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value <= 0) {
    currentIndex.value = totalSlides.value - 1;
  } else {
    currentIndex.value--;
  }
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};
</script>

<style scoped lang="scss">
.loading-state, .error-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}
.error-state { color: red; }

.home-products-section {
  padding: 40px 200px; 
  margin-bottom: 40px;
  position: relative;
  min-width: 1000px; 
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  
  .line {
    flex: 1;
    height: 1.5px;
    background-color: #eee;
  }
    
  .section-title {
    color: #111;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 20px;
    white-space: nowrap;
    letter-spacing: 0.5px;
  }
}
.tabs-wrapper {
  grid-column: 2; 
  display: flex;
  gap: 10px;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 4px;
  justify-content: center;
}
.header-spacer { grid-column: 3; }

/* Tab Buton Stilleri Override */
.tab-btn {
  background: transparent !important; /* Atom'un yeşilini ezmek için */
  border: none !important;
  padding: 8px 25px;
  font-weight: 400;
  cursor: pointer;
  color: #666 !important;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover { color: black !important; }
  
  &.active { 
    background: black !important; 
    color: white !important; 
  }
}

.product-carousel-wrapper { position: relative; width: 100%; }
.carousel-window { overflow: hidden; width: 100%; padding: 10px 0; }
.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  width: 100%;
}
.card-wrapper {
  min-width: 25%;
  width: 25%; 
  box-sizing: border-box;
  padding: 0 10px;
}

/* Carousel Ok Stilleri Override */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  background-color: white !important; /* Atom override */
  border: 1px solid #e0e0e0 !important;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #333 !important;

  &:hover {
    background-color: #f9f9f9 !important;
    box-shadow: 0 6px 15px rgba(0,0,0,0.15);
    transform: translateY(-50%) scale(1.1);
  }
}
.left-btn { left: -25px; }
.right-btn { right: -25px; }

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
}
.dot {
  width: 10px;
  height: 10px;
  background-color: #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}
.dot.active {
  background-color: #333;
  transform: scale(1.2);
}
</style>