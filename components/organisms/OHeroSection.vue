<template>
  <section class="hero-section container">
    <div class="hero-wrapper">
      
      <MBannerCard
        class="top-banner"
        link="/product/banner" 
        background-image="https://speedcubeshop.com/cdn/shop/files/2025-christmas-sale-banner-desktop-3_1024x.progressive.png.jpg?v=1765315204"
      />

      <MSplitBanner
        variant="light"
        subtitle="LIMITED EDITION SPEED CUBE"
        title="GAN 16 AMYTH"
        description="Discover GAN's newest flagship 3x3 in a limited amethyst finish. Complete with MagLev, core magnets, UV coating, exclusive accessories."
        button-text="SHOP GAN 16 AMYTH"
        image="//speedcubeshop.com/cdn/shop/files/gan-16-amyth-banner_1024x1024_crop_center.jpg?v=1765512076"
      />

    </div>
  </section>
</template>

<script setup lang="ts">
  
</script>

<style scoped lang="scss">
.hero-section {
  margin-top: 0px;
  margin-bottom: 80px; 
}

.hero-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px; 

  .top-banner {
    height: 500px; 
    width: 100%;
    border-radius: 0px; 
  }
}
</style>