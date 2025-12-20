<template>
  <div class="split-banner" :class="variant">
    
    <div class="content-side">
      <h4 v-if="subtitle" class="subtitle">{{ subtitle }}</h4>
      <h2 class="title" v-html="title"></h2>
      <p v-if="description" class="description">{{ description }}</p>
      <button class="action-btn">{{ buttonText }}</button>
    </div>

    <div class="image-side">
      <img :src="image" :alt="title" class="product-image" />
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  description?: string;
  buttonText: string;
  image: string;
  variant?: 'light' | 'dark'; // Açık veya Koyu tema seçeneği
}>();
</script>

<style scoped lang="scss">
.split-banner {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Alanı ikiye böl */
  align-items: center; /* İçeriği dikeyde ortala */
  border-radius: 0px;
  min-height: 450px; /* Heybetli bir yükseklik */

  /* Temalar */
  &.light { background-color: #f4f4f4; color: #111; }
  &.dark { background-color: #111; color: white; }

  .content-side {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; /* Yazıları sola yasla */

    .subtitle {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
      font-weight: 700;
      opacity: 0.8;
      color: var(--scs-orange); /* Turuncu vurgu */
    }

    .title {
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .description {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 30px;
      max-width: 90%;
      opacity: 0.9;
    }

    .action-btn {
      padding: 15px 35px;
      font-weight: 800;
      text-transform: uppercase;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.9rem;

      /* Tema bazlı buton renkleri */
      .light & { background: #111; color: white; &:hover { background: var(--scs-orange); } }
      .dark & { background: white; color: #111; &:hover { background: var(--scs-orange); color: white; } }
    }
  }

  .image-side {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 30px;

    .product-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain; /* Resmi bozmadan sığdır */
      /* Ürünü öne çıkaran hafif bir gölge */
      filter: drop-shadow(0 15px 30px rgba(0,0,0,0.2));
      transition: transform 0.3s;
    }
  }

  /* Hover Efekti: Ürün hafifçe büyüsün */
  &:hover .product-image {
    transform: scale(1.05);
  }
}

</style>