<template>
  <div class="layout-default">
    <ONavbar />

    <main class="page-content">
      <slot />
    </main>
    
    <OFooter />
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 600vh; /* Sayfa yüksekliği en az ekran kadar olsun */
}

.page-content {
  flex: 1; /* Sihirli kod: Mevcut tüm boşluğu kapla */
  width: 100%;
}
</style>