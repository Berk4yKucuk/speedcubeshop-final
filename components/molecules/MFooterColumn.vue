<template>
  <div class="footer-column">
    <h4 class="column-title">{{ title }}</h4>
    <ul class="link-list">
      <li v-for="(link, index) in links" :key="index">
        <NuxtLink :to="link.url" class="footer-link">{{ link.text }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface LinkItem {
  text: string;
  url: string;
}

defineProps<{
  title: string;
  links: LinkItem[];
}>();
</script>

<style scoped lang="scss">
.footer-column {
  .column-title {
    color: white;
    font-size: 0.75rem;
    font-weight: 800;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 6px;
      width: fit-content; /* Çizgi sadece yazı kadar olsun diye */
      
      .footer-link {
        color: #e0e0e0;
        font-size: 0.7rem;
        text-decoration: none;
        font-weight: 400;
        position: relative; /* Animasyon için referans noktası */
        display: inline-block;
        padding-bottom: 2px; /* Çizgi ile yazı arası boşluk */
        transition: color 0.3s ease;

        /* ANİMASYONLU ÇİZGİ (Sihir Burada) */
        &::after {
          content: '';
          position: absolute;
          width: 0; /* Başlangıçta genişlik 0 */
          height: 1px; /* Çizgi kalınlığı */
          bottom: 0;
          left: 0;
          background-color: var(--scs-orange); /* Turuncu Renk */
          transition: width 0.3s ease-in-out; /* Kayma animasyonu */
        }

        &:hover {
          color: var(--scs-orange); /* Yazı rengi değişsin */
          
          /* Hover olunca çizgi %100 genişliğe ulaşsın */
          &::after {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>