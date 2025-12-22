<template>
  <div class="layout-default">
    <ONavbar />

    <main class="page-content">
      <slot />
    </main>
    
    <OFooter />

    <OCartDrawer />
  </div>
</template>

<style scoped>
.layout-default { display: flex; flex-direction: column; min-height: 200vh; }
.page-content { flex: 1; width: 100%; }
</style>