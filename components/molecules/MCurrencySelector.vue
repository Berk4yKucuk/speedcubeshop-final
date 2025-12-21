<template>
  <div class="currency-selector" v-click-outside="closeDropdown">
    <ABaseButton class="trigger-btn" @click="toggleDropdown">
      <span class="flag-icon">{{ selected.flag }}</span>
      <span class="currency-code">{{ selected.code }}</span>
      <ABaseIcon 
        name="chevron-down" 
        size="10" 
        class="arrow-icon" 
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }" 
      />
    </ABaseButton>

    <transition name="slide-fade">
      <ul v-if="isOpen" class="dropdown-list">
        <li 
          v-for="currency in currencies" 
          :key="currency.code"
          class="dropdown-item"
          @click="selectCurrency(currency)"
        >
          <span class="item-flag">{{ currency.flag }}</span>
          <span class="item-code">{{ currency.code }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const currencies = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'CAD', flag: '🇨🇦' },
  { code: 'AUD', flag: '🇦🇺' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'GBP', flag: '🇬🇧' },
];
const selected = ref(currencies[0]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const closeDropdown = () => {
  isOpen.value = false;
};
const selectCurrency = (currency: any) => {
  selected.value = currency;
  isOpen.value = false;
};

// Basit bir "Click Outside" direktifi
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};
</script>

<style scoped lang="scss">
.currency-selector {
  position: relative;
  display: inline-block;
  font-family: sans-serif;
}

.trigger-btn {
  /* ABaseButton stillerini eziyoruz */
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff; 
  font-size: 0.85rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .flag-icon { font-size: 1.2rem; }
  .arrow-icon { transition: transform 0.2s; }
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0; 
  margin-top: 5px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  list-style: none;
  padding: 5px 0;
  min-width: 120px;
  z-index: 100;
  border: 1px solid #eee;

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s;
    color: #333;
    font-size: 0.9rem;
    font-weight: 500;
    &:hover {
      background: #f5f5f5;
      color: var(--scs-orange);
    }

    .item-flag { font-size: 1.2rem; }
  }
}

/* Animasyon */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>