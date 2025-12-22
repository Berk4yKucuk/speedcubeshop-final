<template>
  <div class="product-detail-page">
    
    <div v-if="productStore.loading" class="state-msg">
      <div class="spinner"></div> Loading product details...
    </div>

    <div v-else-if="!product" class="state-msg error">
      Product not found or removed.
    </div>

    <div v-else class="container main-layout">
      
      <div class="gallery-column">
        <div class="main-image-wrapper">
          <div class="badge-overlay" v-if="product.badge">
            🔥 {{ product.badge }}
          </div>
          <img :src="activeImage" :alt="product.title" class="main-img" />
        </div>
        
        <div class="thumbnails-track">
          <ABaseButton 
            v-for="i in 4" 
            :key="i"
            class="thumb-btn"
            :class="{ active: activeImage === product.image }"
            @click="activeImage = product.image"
          >
            <img :src="product.image" alt="thumbnail" />
          </ABaseButton>
        </div>
      </div>

      <div class="info-column">
        
        <h1 class="product-title">{{ product.title }}</h1>
        
        <div class="meta-row">
          <ABaseRating :rating="product.rating" :count="product.reviewCount" />
          <span class="stock-status">
            <span class="dot"></span> Ready to ship!
          </span>
        </div>

        <div class="price-box">
          <span class="currency">$</span>
          <span class="amount">{{ totalPrice.toFixed(2) }}</span>
        </div>

        <div class="actions-wrapper-top">
          <ABaseButton 
            class="add-cart-sharp" 
            block 
            @click="handleAddToCart"
          >
            ADD TO CART
          </ABaseButton>
        </div>

        <div class="option-group">
          <h3 class="option-title">
            <span class="step-num">1</span> Version
          </h3>
          <div class="version-list">
            <ABaseButton 
              v-for="ver in versions" 
              :key="ver.name"
              class="tile-btn version-btn"
              :class="{ active: selectedVersion === ver.name }"
              @click="selectedVersion = ver.name"
            >
              {{ ver.name }}
            </ABaseButton>
          </div>
        </div>

        <div class="option-group collapsible-group">
          <h3 class="option-title clickable" @click="isCustomizeOpen = !isCustomizeOpen">
            <span class="title-left">
              <span class="step-num">2</span> Customize This Item
            </span>
            <ABaseIcon 
              name="chevron-down" 
              size="14" 
              class="chevron-icon"
              :style="{ transform: isCustomizeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }" 
            />
          </h3>
          
          <div v-show="isCustomizeOpen" class="collapsible-content">
            
            <div class="sub-option">
              <label class="sub-label">Lubrication Service</label>
              <div class="vertical-list">
                <ABaseButton 
                  v-for="lube in lubeOptions" 
                  :key="lube.name"
                  class="tile-btn service-tile"
                  :class="{ active: selectedLube === lube }"
                  @click="selectedLube = lube"
                >
                  <div class="tile-content-row">
                    <span class="tile-name">{{ lube.name }}</span>
                    <span v-if="lube.price > 0" class="tile-price">+ ${{ lube.price }}</span>
                  </div>
                </ABaseButton>
              </div>
            </div>

            <div class="sub-option">
              <label class="sub-label">Exterior Coating</label>
              <div class="vertical-list">
                <ABaseButton 
                  v-for="coat in coatingOptions" 
                  :key="coat.name"
                  class="tile-btn service-tile"
                  :class="{ active: selectedCoating === coat }"
                  @click="selectedCoating = coat"
                >
                  <div class="tile-content-row">
                    <span class="tile-name">{{ coat.name }}</span>
                    <span v-if="coat.price > 0" class="tile-price">+ ${{ coat.price }}</span>
                  </div>
                </ABaseButton>
              </div>
            </div>

            <div class="sub-option">
              <label class="sub-label">
                Logo Sticker: <strong>{{ selectedLogo }}</strong>
              </label>
              <div class="logo-options">
                <ABaseButton 
                  v-for="logo in logoOptions" 
                  :key="logo.name"
                  class="logo-item"
                  :class="{ active: selectedLogo === logo.name }"
                  @click="selectedLogo = logo.name"
                >
                  <img src="https://speedcubeshop.com/cdn/shop/t/273/assets/default-sticker.svg?v=45256956421314340881763171105" :alt="logo.name" />
                </ABaseButton>
              </div>
            </div>

          </div>
        </div>

        <div class="option-group">
          <h3 class="option-title">
            <span class="step-num">3</span> Add Ons
          </h3>
          
          <label class="addon-box" :class="{ active: isAddonSelected }">
             <div class="addon-left">
               <input type="checkbox" v-model="isAddonSelected" class="addon-checkbox" />
               <img src="https://speedcubeshop.com/cdn/shop/files/martian-lubricant-5ml_x100.jpg?v=1765325882" alt="Lube" width="40" />
             </div>
             
             <div class="addon-right">
               <span class="addon-name">Add Martian Lubricant</span>
               <div class="addon-controls">
                 <select class="addon-select" :disabled="!isAddonSelected">
                   <option>5ml (+ $5.95)</option>
                   <option>10ml (+ $9.95)</option>
                 </select>
               </div>
             </div>
          </label>
        </div>

      </div>

    </div>

    <div v-if="product" class="container bottom-section">
      
      <div class="product-tabs">
        <div class="tab-headers">
          <span class="tab-link" :class="{ active: activeTab === 'desc' }" @click="activeTab = 'desc'">DESCRIPTION</span>
          <span class="tab-link" :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">REVIEWS ({{ product.reviewCount }})</span>
          <span class="tab-link" :class="{ active: activeTab === 'details' }" @click="activeTab = 'details'">DETAILS</span>
          <span class="tab-link" :class="{ active: activeTab === 'returns' }" @click="activeTab = 'returns'">90 DAY RETURNS</span>
        </div>
        
        <div class="tab-content">
          <div v-if="activeTab === 'desc'">
             <p>The <strong>{{ product.title }}</strong> is the latest flagship release. It features the new core magnetic system which provides a more consistent turning feel.</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida.</p>
          </div>
          <div v-else-if="activeTab === 'reviews'" class="reviews-tab">
             <div class="review-item"><ABaseRating :rating="5" /><p><strong>Great cube!</strong> - Turn speed is amazing.</p></div>
             <div class="review-item"><ABaseRating :rating="5" /><p><strong>Highly recommended.</strong> - The magnets are perfect strength.</p></div>
          </div>
          <div v-else-if="activeTab === 'details'">
             <ul><li>Weight: 55g</li><li>Size: 51mm</li><li>Release Date: 2025</li></ul>
          </div>
          <div v-else-if="activeTab === 'returns'">
             <p>We offer a <strong>90-day return policy</strong> for any unused items. Customer satisfaction is our #1 priority!</p>
          </div>
        </div>
      </div>

      <div class="frequently-bought">
        <div class="divider-header">
          <span class="line"></span>
          <h3 class="section-title">FREQUENTLY BOUGHT TOGETHER</h3>
          <span class="line"></span>
        </div>

        <div class="freq-wrapper">
           <img :src="product.image" class="freq-img" />
           <span class="plus">+</span>
           <img src="https://speedcubeshop.com/cdn/shop/files/gan-251-2x2-pro-magnetic-core-magnets-stickerless_540x.jpg?v=1765326140" class="freq-img" />
           
           <div class="freq-total">
             <span>Total: <strong>${{ (totalPrice + 15).toFixed(2) }}</strong></span>
             <ABaseButton class="freq-btn">ADD ALL TO CART</ABaseButton>
           </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '~/stores/cartStore';
import { useProductStore } from '~/stores/productStore';

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();

// --- STATİK SEÇENEK VERİLERİ (Veritabanında olmadığı için manuel eklendi) ---
const versions = [
  { name: 'Special Edition, Leap, UV' }, { name: 'Leap, UV' }, { name: 'Leap' },
  { name: 'Pro' }, { name: 'Special Edition, Air' }, { name: 'Air' }
];
const lubeOptions = [
  { name: 'No lubrication', price: 0 }, 
  { name: 'Piece Lube (Quick)', price: 5.99 },
  { name: 'Supernova (Fast)', price: 9.99 }, 
  { name: 'Cosmic (Controllable)', price: 9.99 }
];
const coatingOptions = [
  { name: 'No Coating', price: 0 }, 
  { name: 'PVC Coating', price: 24.99 }, 
  { name: 'PVC + Exotheill', price: 29.99 }
];
const logoOptions = [
  { name: 'Factory', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/Gan_Logo_Sticker_small.png?v=1614378923' },
  { name: 'SCS Silver', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/SCS_Logo_Sticker_Silver_small.png?v=1614378923' },
  { name: 'SCS Gold', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/SCS_Logo_Sticker_Gold_small.png?v=1614378923' },
  { name: 'SCS Blue', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/SCS_Logo_Sticker_Blue_small.png?v=1614378923' },
  { name: 'None', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/No_Logo_small.png?v=1614378923' }
];

// --- SAYFA YÜKLENDİĞİNDE VERİYİ ÇEK ---
onMounted(() => {
  const productId = route.params.id as string;
  if (productId) {
    productStore.fetchProductById(productId);
  }
});

// Veriyi Store'dan Al
const product = computed(() => productStore.selectedProduct);

// --- STATE ---
const activeTab = ref('desc');
const isCustomizeOpen = ref(true);
const isAddonSelected = ref(false);
const activeImage = ref('');

// Varsayılan Seçenekler
const selectedVersion = ref('Leap, UV');
const selectedLube = ref(lubeOptions[0]);
const selectedCoating = ref(coatingOptions[0]);
const selectedLogo = ref('Factory');

// Ürün verisi gelince ana resmi ayarla
watch(product, (newVal) => {
  if (newVal && newVal.image) {
    activeImage.value = newVal.image;
  }
}, { immediate: true });

// --- HESAPLAMALAR ---
const totalPrice = computed(() => {
  if (!product.value) return 0;
  let total = product.value.price + selectedLube.value.price + selectedCoating.value.price;
  if (isAddonSelected.value) total += 5.95; 
  return total;
});

const handleAddToCart = () => {
  if (!product.value) return;
  cartStore.addToCart({
    title: `${product.value.title} (${selectedVersion.value})`,
    price: totalPrice.value,
    image: product.value.image,
    rating: product.value.rating,
    reviewCount: product.value.reviewCount,
    category: `Lube: ${selectedLube.value.name}`
  } as any);
  alert('Added to cart!');
};
</script>

<style scoped lang="scss">
/* Yükleme ve Hata Mesajı Stilleri */
.state-msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  
  &.error { color: #dc2626; }
}

.spinner {
  width: 40px; height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--scs-orange);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* --- AŞAĞIDAKİ STİLLER ORİJİNAL DOSYADAN KORUNDU --- */
.product-detail-page {
  background-color: white;
  padding-bottom: 60px;
  min-height: 80vh;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding-top: 40px;
  padding: 0 200px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

/* GALERİ KOLONU */
.gallery-column {
  .main-image-wrapper {
    position: relative;
    background: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;

    .badge-overlay {
      position: absolute;
      top: 15px;
      left: 15px;
      background: white;
      color: #ff5722;
      font-weight: 800;
      padding: 5px 10px;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .main-img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    }
  }

  .thumbnails-track {
    display: flex;
    gap: 10px;
    overflow-x: auto;

    .thumb-btn {
      width: 80px;
      height: 80px;
      padding: 5px;
      border: 1px solid #eee !important;
      border-radius: 4px !important;
      background: white !important;
      cursor: pointer;

      &.active {
        border-color: var(--scs-orange) !important;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

/* BİLGİ KOLONU */
.info-column {
  padding-right: 20px;

  .product-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 10px;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;

    .stock-status {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.85rem;
      color: #4caf50;
      font-weight: 600;

      .dot {
        width: 8px;
        height: 8px;
        background: #4caf50;
        border-radius: 50%;
      }
    }
  }

  .price-box {
    font-size: 2rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 20px;

    .currency {
      font-size: 1.2rem;
      vertical-align: top;
    }
  }

  .actions-wrapper-top {
    margin-bottom: 30px;

    .add-cart-sharp {
      background-color: #43a047 !important;
      color: white !important;
      height: 45px;
      width: 40%;
      font-size: 1rem;
      font-weight: 800;
      text-transform: uppercase;
      border-radius: 2px !important; 

      &:hover {
        background-color: #2e7d32 !important;
      }
    }
  }

  .option-group {
    margin-bottom: 25px;

    .option-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;

      .step-num {
        background: black;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
      }
    }
  }

  .collapsible-group {
    .option-title.clickable {
      cursor: pointer;
      justify-content: space-between;
      user-select: none;

      .title-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .chevron-icon {
        transition: transform 0.3s ease;
      }
    }

    .collapsible-content {
      margin-top: 15px;
      animation: fadeIn 0.3s ease;
    }
  }

  .version-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .version-btn {
      padding: 8px 15px !important;
      border: 1px solid #ccc !important;
      background: white !important;
      border-radius: 8px !important;
      color: #333 !important;
      font-weight: 600;
      font-size: 0.85rem;
      height: auto !important;
      min-height: 40px;
      flex: 0 0 auto;

      &:hover {
        border-color: #666 !important;
      }

      &.active {
        border-color: var(--scs-orange) !important;
        color: var(--scs-orange) !important;
        background-color: #fff8e1 !important;
        box-shadow: 0 0 0 1px var(--scs-orange);
      }
    }
  }

  .sub-option {
    margin-top: 20px;

    .sub-label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #2c6ecb;
      margin-bottom: 8px;
    }

    .vertical-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .service-tile {
      width: 100% !important;
      padding: 12px 15px !important;
      border: 1px solid #ccc !important;
      background: white !important;
      border-radius: 8px !important; 
      color: #333 !important;
      font-weight: 600;
      font-size: 0.85rem;
      height: auto !important;
      display: block !important; 
      text-align: left !important;

      &:hover {
        border-color: #666666 !important;
      }

      &.active {
        border-color: var(--scs-orange) !important;
        color: var(--scs-orange) !important;
        background-color: #fff8e1 !important;
        box-shadow: 0 0 0 1px var(--scs-orange);
      }

      .tile-content-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .tile-price {
        font-size: 0.8rem;
        color: inherit;
        font-weight: 700;
      }
    }
  }

  .logo-options {
    display: flex;
    gap: 10px;
    margin-top: 5px;
    flex-wrap: wrap;

    .logo-item {
      width: 45px !important;
      height: 45px !important;
      border: 1px solid #ddd !important;
      border-radius: 6px !important;
      padding: 2px !important;
      background: white !important;
      min-width: 0 !important;

      &.active {
        border-color: var(--scs-orange) !important;
        border-width: 2px !important;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 4px;
      }
    }
  }

  .addon-box {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #f9f9f9;
    }

    &.active {
      border-color: var(--scs-orange);
      background: #fffdf5;
    }

    .addon-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .addon-checkbox {
      width: 18px;
      height: 18px;
      accent-color: var(--scs-orange);
    }

    .addon-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .addon-name {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 4px;
    }

    .addon-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .addon-select {
      padding: 4px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.85rem;
      color: #555;
    }
  }
}

.bottom-section {
  margin-top: 60px;
  padding-top: 40px;
  padding: 0 200px;
  .product-tabs {
    margin-bottom: 50px;

    .tab-headers {
      display: flex;
      gap: 30px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;

      .tab-link {
        padding-bottom: 10px;
        font-weight: 700;
        color: #666;
        cursor: pointer;
        border-bottom: 3px solid transparent;

        &.active {
          color: #111;
          border-bottom-color: var(--scs-orange);
        }
      }
    }

    .tab-content {
      color: #555;
      line-height: 1.6;
      animation: fadeIn 0.3s ease;
    }

    .reviews-tab {
      .review-item {
        margin-bottom: 15px;

        p {
          margin-top: 5px;
        }
      }
    }
  }

  .frequently-bought {
    padding: 30px;
    border-radius: 8px;

    .divider-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .line {
        flex: 1;
        height: 1px;
        background-color: #ddd;
      }

      .section-title {
        margin: 0 20px;
        font-size: 1.1rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #111;
        white-space: nowrap;
      }
    }

    .freq-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;

      .freq-img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        border: 1px solid #eee;
        background: white;
        padding: 5px;
        border-radius: 4px;
      }

      .plus {
        font-size: 1.5rem;
        color: #999;
      }

      .freq-total {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-end;
        font-size: 1.1rem;
      }

      .freq-btn {
        background: #43a047 !important;
        color: white !important;
        font-weight: 700;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>