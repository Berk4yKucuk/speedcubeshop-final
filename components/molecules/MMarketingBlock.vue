<template>
  <div class="marketing-block container" :class="{ 'reversed': isReversed }">
    
    <div class="content-area">
      <h3 class="block-title">{{ title }}</h3>
      <div class="separator"></div> <p class="block-desc">{{ description }}</p>
      
      <ABaseButton class="block-btn">{{ buttonText }}</ABaseButton>
    </div>

    <div class="image-area">
      <img :src="image" :alt="title" />
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
  buttonText: string;
  isReversed?: boolean; // True ise Görsel Sola, Yazı Sağa geçer
}>();
</script>

<style scoped lang="scss">
.marketing-block {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Yarı yarıya böl */
  gap: 1px;
  /* Görsel ile yazı arası boşluk */
  align-items: center;
  margin-bottom: 80px;
  /* Bloklar arası boşluk */

  /* REVERSED MODU (Görsel Solda, Yazı Sağda) */
  &.reversed {
    .content-area { order: 2; } /* Yazıyı sona at */
    .image-area { order: 1; }   /* Resmi başa al */
  }

  .content-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    text-align: center;

    .block-title {
      color: #ff9f00;
      /* İSTENEN: Turuncu Başlık */
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    /* Başlık altındaki ufak turuncu çizgi */
    .separator {
      width: 50px;
      height: 3px;
      background-color: #ff9f00;
      margin-bottom: 20px;
    }

    .block-desc {
      color: #666;
      line-height: 1.6;
      margin-bottom: 25px;
      font-size: 0.95rem;
      max-width: 90%;
    }

    .block-btn {
      /* ABaseButton stillerini eziyoruz */
      background: #111;
      /* İSTENEN: Siyah Buton */
      color: white;
      padding: 14px 30px;
      border: none;
      border-radius: 0px;
      font-weight: 800;
      text-transform: uppercase;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      /* Yumuşak geçiş */

      &:hover {
        background: #4CAF50;
        /* İSTENEN: Yeşil Hover */
        transform: translateY(-2px);
        /* Ufak bir zıplama efekti */
      }
    }
  }

  .image-area {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 400px;
      /* Çok uzamasını engelle */
      object-fit: contain;
    }
  }
}
</style>