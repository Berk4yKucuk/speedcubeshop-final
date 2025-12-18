<template>
  <span class="base-badge" :class="[`badge-${variant}`, { 'is-pill': pill }]">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'danger' | 'dark'; // Turuncu, Kırmızı, Siyah
  pill?: boolean; // Yuvarlak mı olsun?
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  pill: false
});
</script>

<style scoped lang="scss">
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 4px;
  line-height: 1;
  color: white;

  &.is-pill {
    border-radius: 50%; /* Tam yuvarlak (Sepet sayısı için) */
    min-width: 18px;
    height: 18px;
    padding: 0;
  }

  /* Renkler */
  &.badge-primary { background-color: var(--scs-orange); color: black; }
  &.badge-danger { background-color: #ef5350; }
  &.badge-dark { background-color: #333; }
}
</style>