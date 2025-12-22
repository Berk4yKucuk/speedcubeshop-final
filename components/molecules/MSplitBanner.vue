<template>
  <div class="split-banner" :class="variant">
    
    <div class="content-side">
      <h3 v-if="subtitle" class="subtitle">{{ subtitle }}</h3>
      <h2 class="title">{{ title }}</h2>
      <p class="description">{{ description }}</p>
      
      <ABaseButton class="action-btn">{{ buttonText }}</ABaseButton>
    </div>

    <div class="image-side">
      <img :src="image" :alt="title" />
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  image: string;
  variant?: 'light' | 'dark'; // Arka plan rengi seçeneği
}>();
</script>

<style scoped lang="scss">
.split-banner {
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  min-height: 450px;
  
  /* Varsayılan (Light) */
  background-color: #f4f4f4;
  color: #111;

  &.dark {
    background-color: #111;
    color: white;
    .description { color: #ccc; }
  }


  .content-side {
    flex: 1;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; 
    

    .subtitle {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
      font-weight: 700;
      opacity: 0.8;
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
      color: #555;
    }

    .action-btn {
      /* ABaseButton override */
      padding: 15px 40px;
      background: rgb(255, 123, 0);
      color: #111;
      border: none;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 0.9rem;
      border-radius: 0px;
      cursor: pointer;
      
      &:hover {
        background: #333; /* Hafif açılma */
      }
    }
  }

  /* Dark modda buton rengini tersine çevirelim */
  &.dark .action-btn {
    background: white;
    color: black;
    &:hover { background: #eee; }
  }

  .image-side {
    flex: 1;
    height: 100%;
    min-height: 450px;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>