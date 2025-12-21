<template>
  <div class="checkout-wrapper">
    
    <header class="checkout-header">
      <div class="header-content">
        <NuxtLink to="/">
          <img src="https://cdn.shopify.com/s/files/1/0978/8602/files/Legacy-Logo-Mobile-2024-02_200x60@2x.webp?v=1759476043.webp" alt="SpeedCubeShop" class="logo-img" />
        </NuxtLink>
      </div>
    </header>

    <div class="checkout-container">
      <div class="checkout-grid">

        <div class="left-column">
          
          <div class="express-checkout">
            <p class="express-title">Express checkout</p>
            <div class="express-buttons">
              <button class="express-btn shop-pay">shop</button>
              <button class="express-btn paypal">PayPal</button>
              <button class="express-btn gpay">G Pay</button>
            </div>
          </div>

          <div class="divider">
            <span class="or-text">OR</span>
          </div>

          <section class="form-section">
            <div class="section-header">
              <h2 class="section-title">Contact</h2>
              <NuxtLink to="/login" class="login-link">Log in</NuxtLink>
            </div>
            
            <ABaseInput 
              v-model="form.email" 
              placeholder="Email or mobile phone number" 
              class="mb-3"
            />
            
            <div class="checkbox-wrapper">
              <input type="checkbox" id="news" v-model="form.newsletter" />
              <label for="news">Email me with news and offers</label>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">Delivery</h2>
            
            <div class="delivery-selector">
              <div 
                class="delivery-option" 
                :class="{ active: form.deliveryMethod === 'ship' }"
                @click="form.deliveryMethod = 'ship'"
              >
                <div class="radio-circle">
                  <div class="inner-circle" v-if="form.deliveryMethod === 'ship'"></div>
                </div>
                <span>Ship</span>
                <ABaseIcon name="cart" size="18" class="option-icon" />
              </div>
              
              <div 
                class="delivery-option"
                :class="{ active: form.deliveryMethod === 'pickup' }"
                @click="form.deliveryMethod = 'pickup'"
              >
                <div class="radio-circle">
                  <div class="inner-circle" v-if="form.deliveryMethod === 'pickup'"></div>
                </div>
                <span>Pick up</span>
                <ABaseIcon name="user" size="18" class="option-icon" />
              </div>
            </div>

            <div class="address-form mt-4">
              <div class="form-group mb-3">
                <select v-model="form.country" class="base-select">
                  <option value="USA">United States</option>
                  <option value="TR">Turkey</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div class="form-row">
                <ABaseInput v-model="form.firstName" placeholder="First name" />
                <ABaseInput v-model="form.lastName" placeholder="Last name" />
              </div>

              <ABaseInput v-model="form.address" placeholder="Address" class="mb-3" />
              <ABaseInput v-model="form.apartment" placeholder="Apartment, suite, etc. (optional)" class="mb-3" />

              <div class="form-row">
                <ABaseInput v-model="form.city" placeholder="City" />
                <ABaseInput v-model="form.state" placeholder="State" />
                <ABaseInput v-model="form.zip" placeholder="ZIP code" />
              </div>
            </div>
          </section>

          <div class="action-area">
             <ABaseButton 
                variant="primary" 
                block 
                size="lg"
                class="pay-btn"
                :loading="loading"
                @click="handlePlaceOrder"
             >
               {{ loading ? 'PROCESSING...' : 'PAY NOW' }}
             </ABaseButton>
           </div>

        </div>

        <div class="right-column">
          
          <div class="order-items">
            <div v-for="item in cartStore.items" :key="item.title" class="summary-item">
              <div class="img-badge-wrapper">
                <img :src="item.image" :alt="item.title" />
                <span class="qty-badge">{{ item.quantity }}</span>
              </div>
              <div class="item-info">
                <p class="item-name">{{ item.title }}</p>
                <p class="item-variant">{{ item.category }}</p>
              </div>
              <div class="item-price">${{ item.price }}</div>
            </div>
          </div>

          <div class="discount-wrapper">
             <ABaseInput v-model="discountCode" placeholder="Discount code or gift card" />
             <ABaseButton 
              variant="outline" 
              class="apply-btn"
              :disabled="!discountCode"
             >
               Apply
             </ABaseButton>
          </div>

          <div class="totals-wrapper">
            <div class="total-row">
              <span>Subtotal</span>
              <span>${{ cartStore.subtotal }}</span>
            </div>
            <div class="total-row">
              <span>Shipping <ABaseIcon name="chevron-down" size="12" /></span>
              <span class="small-text">Enter shipping address</span>
            </div>
            
            <div class="total-row main-total">
              <span class="total-label">Total</span>
              <div class="total-amount">
                <span class="currency">USD</span>
                <span class="value">${{ cartStore.subtotal }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  
definePageMeta({
  layout: 'blank'
});

import { ref, reactive } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const cartStore = useCartStore();
const router = useRouter();
const { $db } = useNuxtApp();

const loading = ref(false);
const discountCode = ref('');

const form = reactive({
  email: '',
  newsletter: true,
  deliveryMethod: 'ship',
  country: 'USA',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zip: ''
});

const handlePlaceOrder = async () => {
  if (!form.email || !form.address) {
    alert("Please fill in the required fields (Email, Address).");
    return;
  }

  loading.value = true;

  try {
    const orderData = {
      customer: { ...form },
      items: cartStore.items,
      totalAmount: cartStore.subtotal,
      status: 'Paid', 
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection($db as any, 'orders'), orderData);
    
    console.log("Sipariş No:", docRef.id);
    cartStore.items = []; 
    alert(`Order #${docRef.id} confirmed! Redirecting to home...`);
    router.push('/');

  } catch (error) {
    console.error("Sipariş hatası:", error);
    alert("An error occurred. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
/* --- GENEL LAYOUT --- */
.checkout-wrapper {
  background-color: white;
  min-height: 100vh;
  padding: 0 250px;
  margin-right: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

.checkout-header {
  padding: 20px 0;
  border-bottom: 1px solid #e6e6e6;

  .header-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-img {
    height: 60px;
  }
}

/* Konteyner: Sayfayı ortalar ve maksimum genişlik verir */
.checkout-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1px;
}

/* Grid Yapısı: Sol %58, Sağ %42 */
.checkout-grid {
  display: grid;
  grid-template-columns: 58% 42%;
  min-height: calc(100vh - 100px);
}

/* --- SOL KOLON (FORM) --- */
.left-column {
  padding: 40px 40px 40px 0;
  border-right: 1px solid #e6e6e6;
  background-color: white;
}

/* Express Checkout */
.express-title {
  text-align: center;
  color: #737373;
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.express-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.express-btn {
  border: none;
  border-radius: 4px;
  height: 45px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
  &.shop-pay { background: #5a31f4; }
  &.paypal { background: #ffc439; color: #003087; font-style: italic; }
  &.gpay { background: #000; }
}

/* Divider (OR) */
.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;

  &::before, &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e6e6e6;
  }

  .or-text {
    padding: 0 10px;
    color: #737373;
    font-size: 0.85rem;
  }
}

/* Form Sections */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.login-link {
  color: #2c6ecb;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover { text-decoration: underline; }
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  label {
    font-size: 0.9rem;
    color: #555;
  }
}

/* Delivery Selector */
.delivery-selector {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 15px;
}

.delivery-option {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  background: white;
  border-bottom: 1px solid #d9d9d9;

  &:last-child { border-bottom: none; }

  &.active {
    background: #f4fbfd;
    border-color: #2c6ecb;
    .radio-circle { border-color: #2c6ecb; }
  }

  .radio-circle {
    width: 18px;
    height: 18px;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    margin-right: 15px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner-circle {
      width: 8px;
      height: 8px;
      background: #2c6ecb;
      border-radius: 50%;
    }
  }

  span {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .option-icon { color: #555; }
}

/* Input Rows */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-row:nth-child(3) {
  grid-template-columns: 1fr 1fr 1fr;
}

.base-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: white;
  font-size: 1rem;
  color: #333;
  outline: none;

  &:focus {
    border-color: #2c6ecb;
    box-shadow: 0 0 0 1px #2c6ecb;
  }
}

.action-area {
  margin-top: 30px;
}

.pay-btn {
  background-color: #111 !important;
  border-radius: 5px !important;
  height: 55px !important;
  font-weight: 700;
  
  &:hover {
    background-color: #333 !important;
  }
}

/* --- SAĞ KOLON (ÖZET) --- */
.right-column {
  background-color: #fafafa;
  padding: 40px 0 40px 40px;
  border-left: 1px solid #e6e6e6;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.img-badge-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  .qty-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #737373;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.item-info {
  flex: 1;

  .item-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
    margin: 0;
  }

  .item-variant {
    font-size: 0.8rem;
    color: #737373;
    margin: 5px 0 0 0;
  }
}

.item-price {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

/* Discount */
.discount-wrapper {
  display: flex;
  gap: 10px;
  margin: 25px 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e6e6e6;

  .apply-btn {
    height: 46px;
    background: #c8c8c8;
    color: white;
    border: none;
    font-weight: 600;

    &:not(:disabled) {
      background: #333;
    }
  }
}

/* Totals */
.totals-wrapper {
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-right: 25px;
    font-size: 0.9rem;
    color: #555;

    .small-text {
      font-size: 0.8rem;
      color: #737373;
    }

    &.main-total {
      margin-top: 20px;
      border-top: 1px solid #e6e6e6;
      padding-top: 20px;
      align-items: baseline;

      .total-label {
        font-size: 1.1rem;
        color: #333;
      }

      .total-amount {
        .currency {
          font-size: 0.8rem;
          color: #737373;
          margin-right: 5px;
        }

        .value {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
}

/* Helper Class */
.mb-3 { margin-bottom: 12px; }
.mt-4 { margin-top: 20px; }
</style>