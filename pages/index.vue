<template>
  <div class="home-page">
    
    <OHeroSection />

    <OHomeProducts />

    <OMarketingSection />

    <OBrandSlider />

    <section class="trust-section">
      <div class="trust-content">
        <ABaseRating :rating="5" style="justify-content: center; margin-bottom: 10px;" />
        <h3 class="trust-text">Trusted by <strong>1.1 Million</strong> Cubers worldwide 🏆</h3>
        
        <ABaseButton class="bestseller-btn">SHOP BEST SELLERS</ABaseButton>
        
      </div>
    </section>

  </div>
</template>

<style scoped>
.trust-section {
  text-align: center; 
  padding: 50px 0; 
  background: #fff;
  border-top: 1px solid #eee;
}
.trust-text {
  margin: 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.bestseller-btn {
  background: #111 !important; /* Atom rengini ezmek için important */
  color: white !important; 
  padding: 12px 25px; 
  border: none !important; 
  font-weight: 800; 
  margin-top: 15px;
  cursor: pointer;
  text-transform: uppercase;
  transition: 0.3s;
  border-radius: 4px; 
}
.bestseller-btn:hover {
  background: #4CAF50 !important; /* Yeşil hover efekti */
}
</style>