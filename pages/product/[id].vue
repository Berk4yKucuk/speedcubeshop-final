<template>
  <div class="product-detail-page">
    
    <div class="container main-layout">
      
      <div class="gallery-column">
        <div class="main-image-wrapper">
          <div class="badge-overlay" v-if="product.badge">
            🔥 {{ product.badge }}
          </div>
          <img :src="activeImage" :alt="product.title" class="main-img" />
        </div>
        
        <div class="thumbnails-track">
          <ABaseButton 
            v-for="(img, idx) in product.images" 
            :key="idx"
            class="thumb-btn"
            :class="{ active: activeImage === img }"
            @click="activeImage = img"
          >
            <img :src="img" alt="thumbnail" />
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
              v-for="ver in product.versions" 
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
                  v-for="lube in product.lubeOptions" 
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
                  v-for="coat in product.coatingOptions" 
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
                  v-for="logo in product.logoOptions" 
                  :key="logo.name"
                  class="logo-item"
                  :class="{ active: selectedLogo === logo.name }"
                  @click="selectedLogo = logo.name"
                >
                  <img :src="logo.img" :alt="logo.name" />
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
               <img src="https://speedcubeshop.com/cdn/shop/files/Cosmic_Lube_Sampler_1080x.png?v=1653335272" alt="Lube" width="40" />
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

    <div class="container bottom-section">
      
      <div class="product-tabs">
        <div class="tab-headers">
          <span 
            class="tab-link" 
            :class="{ active: activeTab === 'desc' }" 
            @click="activeTab = 'desc'"
          >
            DESCRIPTION
          </span>
          <span 
            class="tab-link" 
            :class="{ active: activeTab === 'reviews' }" 
            @click="activeTab = 'reviews'"
          >
            REVIEWS ({{ product.reviewCount }})
          </span>
          <span 
            class="tab-link" 
            :class="{ active: activeTab === 'details' }" 
            @click="activeTab = 'details'"
          >
            DETAILS
          </span>
          <span 
            class="tab-link" 
            :class="{ active: activeTab === 'returns' }" 
            @click="activeTab = 'returns'"
          >
            90 DAY RETURNS
          </span>
        </div>
        
        <div class="tab-content">
          <div v-if="activeTab === 'desc'">
             <p>The <strong>{{ product.title }}</strong> is the latest flagship release. It features the new core magnetic system which provides a more consistent turning feel.</p>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida.</p>
          </div>
          <div v-else-if="activeTab === 'reviews'" class="reviews-tab">
             <div class="review-item">
               <ABaseRating :rating="5" />
               <p><strong>Great cube!</strong> - Turn speed is amazing.</p>
             </div>
             <div class="review-item">
               <ABaseRating :rating="5" />
               <p><strong>Highly recommended.</strong> - The magnets are perfect strength.</p>
             </div>
          </div>
          <div v-else-if="activeTab === 'details'">
             <ul>
               <li>Weight: 55g</li>
               <li>Size: 51mm</li>
               <li>Release Date: 2025</li>
             </ul>
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
           <img :src="product.images[0]" class="freq-img" />
           <span class="plus">+</span>
           <img src="https://speedcubeshop.com/cdn/shop/files/Cosmic_Lube_Sampler_1080x.png?v=1653335272" class="freq-img" />
           
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
import { ref, computed, reactive } from 'vue';
import { useCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();
const activeTab = ref('desc');
const isCustomizeOpen = ref(true);
const isAddonSelected = ref(false);

const product = reactive({
  title: 'GAN 251 M Pro 2x2',
  basePrice: 32.95,
  rating: 5,
  reviewCount: 120,
  badge: 'BEST',
  images: [
    'https://speedcubeshop.com/cdn/shop/products/GAN251MProUV2x2_Magnetic_CoreMagnets_1080x.png?v=1658348937',
    'https://speedcubeshop.com/cdn/shop/products/GAN251MPro2x2_Magnetic_CoreMagnets_1080x.png?v=1658348937',
    'https://speedcubeshop.com/cdn/shop/products/GAN251MLeap2x2_Magnetic_CoreMagnets_1080x.png?v=1658348937',
    'https://speedcubeshop.com/cdn/shop/products/GAN251MAir2x2_Magnetic_1080x.png?v=1658348937'
  ],
  versions: [
    { name: 'Special Edition, Leap, UV' }, { name: 'Leap, UV' }, { name: 'Leap' },
    { name: 'Pro' }, { name: 'Special Edition, Air' }, { name: 'Air' }
  ],
  lubeOptions: [
    { name: 'No lubrication', price: 0 }, 
    { name: 'Piece Lube (Quick)', price: 5.99 },
    { name: 'Supernova (Fast)', price: 9.99 }, 
    { name: 'Cosmic (Controllable)', price: 9.99 }
  ],
  coatingOptions: [
    { name: 'No Coating', price: 0 }, 
    { name: 'PVC Coating', price: 24.99 }, 
    { name: 'PVC + Exotheill', price: 29.99 }
  ],
  logoOptions: [
    { name: 'Factory', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/Gan_Logo_Sticker_small.png?v=1614378923' },
    { name: 'SCS Silver', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/SCS_Logo_Sticker_Silver_small.png?v=1614378923' },
    { name: 'SCS Gold', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/SCS_Logo_Sticker_Gold_small.png?v=1614378923' },
    { name: 'SCS Blue', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/SCS_Logo_Sticker_Blue_small.png?v=1614378923' },
    { name: 'None', img: 'https://cdn.shopify.com/s/files/1/0950/9330/files/No_Logo_small.png?v=1614378923' }
  ]
});

const activeImage = ref(product.images[0]);
const selectedVersion = ref('Leap, UV');
const selectedLube = ref(product.lubeOptions[0]);
const selectedCoating = ref(product.coatingOptions[0]);
const selectedLogo = ref('Factory');

const totalPrice = computed(() => {
  let total = product.basePrice + selectedLube.value.price + selectedCoating.value.price;
  if (isAddonSelected.value) total += 5.95; 
  return total;
});

const handleAddToCart = () => {
  cartStore.addToCart({
    title: `${product.title} (${selectedVersion.value})`,
    price: totalPrice.value,
    image: activeImage.value,
    rating: product.rating,
    reviewCount: product.reviewCount,
    category: `Lube: ${selectedLube.value.name}`
  } as any);
  alert('Added to cart!');
};
</script>

<style scoped lang="scss">
.product-detail-page {
  background-color: white;
  padding-bottom: 60px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;

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
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .thumbnails-track {
    display: flex;
    gap: 10px;
    overflow-x: auto;

    .thumb-btn {
      /* ABaseButton Override */
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

  /* ADD TO CART BUTONU */
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
      border-radius: 2px !important; /* Keskin köşe */

      &:hover {
        background-color: #2e7d32 !important;
      }
    }
  }

  /* SEÇENEK BAŞLIKLARI */
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

  /* COLLAPSIBLE (AÇILIR KAPANIR) */
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

  /* DÜZELTME: VERSİYON BUTONLARI (FLEX) */
  .version-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .version-btn {
      /* ABaseButton Override */
      padding: 8px 15px !important;
      border: 1px solid #ccc !important;
      background: white !important;
      border-radius: 8px !important; /* Yumuşak köşe */
      color: #333 !important;
      font-weight: 600;
      font-size: 0.85rem;
      height: auto !important;
      min-height: 40px;
      flex: 0 0 auto; /* İçerik kadar genişle */

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

  /* DÜZELTME: HİZMET BUTONLARI (DİKEY VE GENİŞ) */
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
      /* ABaseButton Override */
      width: 100% !important; /* Tam genişlik */
      padding: 12px 15px !important;
      border: 1px solid #ccc !important;
      background: white !important;
      border-radius: 8px !important; /* Yumuşak köşe */
      color: #333 !important;
      font-weight: 600;
      font-size: 0.85rem;
      height: auto !important;
      display: block !important; /* İçeriği yaymak için */
      text-align: left !important;

      &:hover {
        border-color: #666 !important;
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

  /* DÜZELTME: LOGO STICKER (KARE) */
  .logo-options {
    display: flex;
    gap: 10px;
    margin-top: 5px;
    flex-wrap: wrap;

    .logo-item {
      /* ABaseButton Override */
      width: 45px !important;
      height: 45px !important;
      border: 1px solid #ddd !important;
      border-radius: 6px !important; /* KARE (Hafif köşeli) */
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

  /* ADD ON KUTUSU */
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

/* ALT BÖLÜM (SEKMELER & ÖNERİLER) */
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