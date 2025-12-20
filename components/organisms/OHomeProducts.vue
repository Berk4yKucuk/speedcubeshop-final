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
        <h2 class="section-title">POPULAR SPEED CUBES</h2>
        
        <div class="tabs-wrapper">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            class="tab-btn"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab.toUpperCase() }}
          </button>
        </div>

        <div class="header-spacer"></div>
      </div>

      <div class="product-carousel-wrapper">
        
        <button class="carousel-btn left-btn" @click="prevSlide">
          <ABaseIcon name="chevron-left" size="24" />
        </button>

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

        <button class="carousel-btn right-btn" @click="nextSlide">
          <ABaseIcon name="chevron-right" size="24" />
        </button>

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
// Tabs artık Store'dan dinamik geliyor (Statik değil!)
const tabs = computed(() => {
    // Eğer veri henüz gelmediyse varsayılan bir tab koy ki patlamasın
    return productStore.getCategoryTabs.length > 0 ? productStore.getCategoryTabs : ['2x2'];
});

const activeTab = ref('2x2'); // Başlangıç değeri
const currentIndex = ref(0);
const itemsPerSlide = 4; 

// --- COMPUTED ---
// Ürünleri Store'dan alıp filtreliyoruz
const filteredProducts = computed(() => {
  return productStore.products.filter(product => product.category === activeTab.value);
});

const totalSlides = computed(() => Math.ceil(filteredProducts.value.length / itemsPerSlide));

// --- WATCH ---
// 1. Sekme değişirse başa dön
watch(activeTab, () => {
  currentIndex.value = 0;
});

// 2. Veriler geç yüklenirse (Firebase gecikmesi), tablar güncellenince ilk tabı seçili yap
watch(tabs, (newTabs) => {
    if (newTabs.length > 0 && !newTabs.includes(activeTab.value)) {
        activeTab.value = newTabs[0];
    }
});

// --- METODLAR (Aynı kaldı) ---
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
/* Mevcut CSS Kodların Aynen Kalacak */
/* Sadece yükleniyor yazısı için ufak bir stil ekleyelim */
.loading-state, .error-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}
.error-state { color: red; }

/* ... (Geri kalan CSS kodlarını önceki cevaptan aynen koru) ... */
/* Buraya önceki CSS kodlarının tamamını yapıştırmayı unutma! */
.home-products-section {
  padding: 40px 30px; 
  margin-bottom: 40px;
  position: relative;
  min-width: 1000px; 
}
.section-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr; 
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
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
.tab-btn {
  background: transparent;
  border: none;
  padding: 8px 25px;
  font-weight: 700;
  cursor: pointer;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab-btn:hover { color: black; }
.tab-btn.active { background: black; color: white; }
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
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #333;
}
.carousel-btn:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  transform: translateY(-50%) scale(1.1);
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