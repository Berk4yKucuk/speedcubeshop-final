<template>
  <button
    class="base-btn"
    :class="[
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-block': block, 'is-loading': loading }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="spinner"></span>
    
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
// TypeScript ile Kuralları Belirliyoruz (Hocanın İsteği)
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'; // Sadece bu renkler olabilir
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;    // Tam genişlik olsun mu?
  disabled?: boolean; // Tıklanabilir mi?
  loading?: boolean;  // Yükleniyor mu?
}

// Varsayılan değerleri atıyoruz
withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  disabled: false,
  loading: false
});
</script>

<style scoped lang="scss">
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  font-family: inherit;

  // Boyutlar
  &.btn-sm { padding: 8px 16px; font-size: 0.85rem; }
  &.btn-md { padding: 12px 24px; font-size: 1rem; }
  &.btn-lg { padding: 16px 32px; font-size: 1.2rem; }

  // Tam Genişlik
  &.btn-block { width: 100%; display: flex; }

  // Durumlar
  &:disabled { opacity: 0.6; cursor: not-allowed; }
  
  // Varyasyonlar (Renkler)
  &.btn-primary {
    background-color: #4CAF50; // Yeşil (Satın alma rengi)
    color: white;
    &:hover:not(:disabled) { background-color: #43a047; }
  }

  &.btn-secondary {
    background-color: #FF9800; // Turuncu (SpeedCubeShop teması)
    color: white;
    &:hover:not(:disabled) { background-color: #f57c00; }
  }

  &.btn-outline {
    background-color: transparent;
    border: 2px solid #ddd;
    color: #333;
    &:hover:not(:disabled) { border-color: #333; }
  }

  &.btn-danger {
    background-color: #ef5350;
    color: white;
    &:hover:not(:disabled) { background-color: #e53935; }
  }
}

/* Basit bir dönen çember (loading için) */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>