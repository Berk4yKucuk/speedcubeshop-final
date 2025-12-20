<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartStore.isOpen" class="cart-overlay" @click="cartStore.closeCart"></div>
    </Transition>

    <Transition name="slide">
      <div v-if="cartStore.isOpen" class="cart-drawer">
        
        <div class="drawer-header">
          <h3>Shopping Cart</h3>
          <button class="close-btn" @click="cartStore.closeCart">✕</button>
        </div>

        <div v-if="cartStore.isEmpty" class="empty-state">
          <p>Your cart is currently empty.</p>
          <button class="continue-btn" @click="cartStore.closeCart">CONTINUE SHOPPING</button>
        </div>

        <div v-else class="cart-items-wrapper">
          <div v-for="item in cartStore.items" :key="item.title" class="cart-item">
            
            <div class="item-img">
              <img :src="item.image" :alt="item.title" />
            </div>

            <div class="item-details">
              <h4 class="item-title">{{ item.title }}</h4>
              <p class="item-variant" v-if="item.category">Category: {{ item.category }}</p>
              <div class="item-price">${{ item.price }}</div>

              <div class="qty-control">
                <button @click="cartStore.updateQuantity(item.title, -1)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.title, 1)">+</button>
              </div>
            </div>

            <button class="remove-btn" @click="cartStore.removeItem(item.title)">✕</button>

          </div>
        </div>

        <div v-if="!cartStore.isEmpty" class="drawer-footer">
          <div class="subtotal">
            <span>Subtotal</span>
            <span class="amount">${{ cartStore.subtotal }}</span>
          </div>
          <p class="shipping-note">Shipping & taxes calculated at checkout</p>
          
          <button class="checkout-btn">
            PROCEED TO CHECKOUT | ${{ cartStore.subtotal }}
          </button>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore';
const cartStore = useCartStore();
</script>

<style scoped lang="scss">
/* --- ANIMASYONLAR --- */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease-in-out; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

/* --- STİLLER --- */
.cart-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); z-index: 998;
}

.cart-drawer {
  position: fixed; top: 0; right: 0;
  width: 400px; max-width: 90%; height: 100%;
  background: white; z-index: 999;
  display: flex; flex-direction: column;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  color: #111;
}

/* HEADER */
.drawer-header {
  padding: 20px;
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #eee;
  h3 { margin: 0; font-size: 1.2rem; font-weight: 700; }
  .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #333; }
}

/* EMPTY STATE */
.empty-state {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  padding-top: 50px; text-align: center;
  p { margin-bottom: 20px; color: #666; }
  .continue-btn {
    background: #388e3c; color: white; /* İSTENEN: Yeşil Buton */
    border: none; padding: 12px 25px;
    font-weight: 700; text-transform: uppercase;
    cursor: pointer; border-radius: 4px;
    &:hover { background: #2e7d32; }
  }
}

/* CART ITEMS */
.cart-items-wrapper {
  flex: 1; overflow-y: auto; padding: 20px;
}

.cart-item {
  display: flex; gap: 15px; position: relative;
  margin-bottom: 20px; padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;

  .item-img {
    width: 80px; height: 80px; flex-shrink: 0;
    img { width: 100%; height: 100%; object-fit: contain; border: 1px solid #eee; border-radius: 4px; }
  }

  .item-details {
    flex: 1;
    .item-title { margin: 0 0 5px 0; font-size: 0.95rem; font-weight: 600; padding-right: 20px; }
    .item-variant { margin: 0 0 5px 0; font-size: 0.8rem; color: #888; }
    .item-price { font-weight: 700; color: #333; margin-bottom: 10px; }
    
    .qty-control {
      display: inline-flex; border: 1px solid #ddd; border-radius: 4px;
      button { background: none; border: none; width: 30px; height: 30px; cursor: pointer; font-size: 1.1rem; &:hover{ background: #f9f9f9;} }
      span { display: flex; align-items: center; justify-content: center; width: 30px; font-size: 0.9rem; font-weight: 600; }
    }
  }

  .remove-btn {
    position: absolute; top: 0; right: 0;
    background: none; border: none; color: #999;
    cursor: pointer; font-size: 1.2rem;
    &:hover { color: #f44336; }
  }
}

/* FOOTER */
.drawer-footer {
  padding: 20px; border-top: 1px solid #eee; background: #f9f9f9;
  
  .subtotal {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 1.1rem; font-weight: 800; margin-bottom: 5px;
  }
  .shipping-note {
    font-size: 0.8rem; color: #888; margin: 0 0 15px 0; font-style: italic;
  }
  
  .checkout-btn {
    width: 100%; padding: 15px;
    background: #388e3c; color: white; /* İSTENEN: Yeşil Buton */
    border: none; font-weight: 800; text-transform: uppercase;
    font-size: 1rem; border-radius: 4px; cursor: pointer;
    transition: 0.2s;
    &:hover { background: #2e7d32; }
  }
}
</style>