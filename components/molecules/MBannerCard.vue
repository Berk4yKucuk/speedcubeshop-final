<template>
  <NuxtLink 
    class="banner-card" 
    :to="link"
    :class="variant"
    :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}"
  >
    <div class="content" v-if="title || buttonText">
      <h3 v-if="subtitle" class="subtitle">{{ subtitle }}</h3>
      <h2 v-if="title" class="title" v-html="title"></h2> 
      <button v-if="buttonText" class="action-btn">{{ buttonText }}</button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  backgroundImage: string; // Görsel artık en önemli parça, zorunlu olsun
  link?: string;           // Tıklayınca gidilecek adres (Opsiyonel)
  
  // Yazı alanlarını opsiyonel (?) yaptık
  title?: string;
  subtitle?: string;
  buttonText?: string;
  
  variant?: 'dark' | 'light' | 'primary';
}>();
</script>

<style scoped lang="scss">
.banner-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  padding: 0; /* Yazı yoksa padding'e gerek yok, görsel tam kaplasın */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none; /* Link alt çizgisini kaldır */
  
  /* Görsel Ayarları */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  min-height: 400px; /* Görselin yüksekliği */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  /* Hover Efekti: Üzerine gelince hafif yukarı kalksın */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }

  .content {
    position: relative;
    z-index: 2;
    max-width: 600px;
    background: rgba(0, 0, 0, 0.4);
    padding: 30px;
    border-radius: 8px;
    backdrop-filter: blur(2px);
  }

  /* Temalar (Eğer yazı kullanılırsa diye duruyor) */
  &.dark { color: white; }
  &.primary { color: white; }
  
  /* ... Diğer yazı stilleri (title, btn vs.) aynı kalabilir ... */
  .title {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 30px;
    text-transform: uppercase;
    color: white;
  }
  
  .action-btn {
    padding: 15px 40px;
    font-weight: 800;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    background: white;
    color: black;
  }
}
</style>