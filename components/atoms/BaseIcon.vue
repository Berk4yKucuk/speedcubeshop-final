<template>
  <component 
    :is="iconComponent" 
    class="base-icon"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

// 1. İkon İsimlerini Tanımla
type IconName = 
                | 'cart' 
                | 'user' 
                | 'heart' 
                | 'chevron-down' 
                | 'chevron-left' 
                | 'chevron-right'
                | 'search' 
                | 'facebook' 
                | 'twitter' 
                | 'instagram' 
                | 'youtube' 
                | 'tiktok' 
                | 'discord' 
                | 'reddit';

interface Props {
  name: IconName;
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 20
});

// 2. Tüm ikon dosyalarını otomatik tanı (Vite Glob Import)
// Bu yöntem SSR hatalarını önler.
const icons = import.meta.glob('~/components/icons/*.vue');

const iconComponent = computed(() => {
  // 'cart' -> 'IconCart' formatına çevir
  const pascalName = 'Icon' + props.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  
  // Dosya yolunu bul
  // Not: Nuxt alias'ı (~) bazen /components/... olarak çözümlenir, bu yüzden dinamik eşleştiriyoruz.
  const filePath = Object.keys(icons).find(path => path.includes(`/${pascalName}.vue`));

  if (filePath && icons[filePath]) {
    // Bulunan dosyayı asenkron yükle
    return defineAsyncComponent(icons[filePath] as any);
  }
  
  // İkon bulunamazsa hata vermemesi için boş bir div döndürebiliriz
  return 'div'; 
});
</script>

<style scoped>
.base-icon {
  display: inline-block;
  vertical-align: middle;
  color: inherit;
  transition: color 0.2s ease;
  /* SVG'lerin içindeki path'lerin rengi de inherit olsun */
  fill: currentColor; 
}
</style>