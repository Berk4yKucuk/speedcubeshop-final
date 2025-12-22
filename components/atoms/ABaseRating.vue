<template>
  <div class="rating-stars">
    <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(rating) }">
      ★
    </span>
    <span v-if="count" class="rating-count">({{ count }} reviews)</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number; // 1 ile 5 arası
  count?: number; // Yorum sayısı (opsiyonel)
}>();
</script>

<style scoped lang="scss">
.rating-stars {
  display: flex;
  align-items: center;
  gap: 2px;
  
  .star {
    color: #444; /* Boş yıldız rengi */
    font-size: 1.1rem;
    line-height: 1;
    
    &.filled {
      color: #ffcc00; /* Dolu yıldız rengi*/
    }
  }

  .rating-count {
    font-size: 0.75rem;
    color: #888;
    margin-left: 5px;
  }
}
</style>