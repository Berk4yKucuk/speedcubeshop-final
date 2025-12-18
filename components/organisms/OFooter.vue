<template>
  <footer class="site-footer">
    <div class="footer-container">
      
      <div class="footer-grid">
        
        <MFooterColumn title="ABOUT" :links="aboutLinks" />

        <MFooterColumn title="SUPPORT" :links="supportLinks" />

        <MFooterColumn title="LEARN" :links="learnLinks" />

        <MFooterColumn title="INFORMATION" :links="infoLinks" />

        <div class="newsletter-column">
          <MNewsletter />
        </div>

      </div>

      <div class="footer-bottom">
        <p class="copyright">© 2009-2025 SpeedCubeShop, Inc.</p>
        
        
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const aboutLinks = [
  { text: 'Our Story', url: '#' },
  { text: 'Reviews', url: '#' },
  { text: 'Showroom', url: '#' },
  { text: 'Gift Cards', url: '#' },
  { text: 'Wallpapers & Logos', url: '#' },
];

const supportLinks = [
  { text: 'Help Center', url: '#' },
  { text: 'Contact Us', url: '#' },
  { text: 'Order Editing', url: '#' },
  { text: 'Wishlist', url: '#' },
  { text: 'Rewards', url: '#' },
];

const learnLinks = [
  { text: 'Getting Started', url: '#' },
  { text: "Rubik's Cube Tutorial", url: '#' },
  { text: 'Parents', url: '#' },
  { text: 'Get Faster', url: '#' },
  { text: 'Lubrication', url: '#' },
  { text: 'Community', url: '#' },
  { text: 'Blog Posts', url: '#' },
];

const infoLinks = [
  { text: 'Return & Refund Policy', url: '#' },
  { text: 'Shipping Policy', url: '#' },
  { text: 'Privacy Policy', url: '#' },
  { text: 'Privacy Choices', url: '#' },
  { text: 'Terms of Service', url: '#' },
  { text: 'Messaging Terms & Conditions', url: '#' },
  { text: 'Messaging Service Privacy Policy', url: '#' },
];
</script>

<style scoped lang="scss">
.site-footer {
  background-color: #181818;
  /* DÜZELTME 1: Padding azaltıldı, içerik yukarı çekildi */
  padding: 10px 0 40px 0; 
  color: white;
  margin-top: auto;
  border-top: 1px solid #222;
  width: 100%;
}

/* DÜZELTME 2: Ortalama ve Kenar Boşlukları (Navbar ile aynı mantık) */
.footer-container {
  max-width: 1050px; /* İçerik çok yayılmasın */
  width: 100%;
  margin: 0 auto; /* Tam ortala */
  padding: 0 60px; /* Yanlardan nefes payı bırak */
  box-sizing: border-box;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px; /* Kolonlar arası mesafe */
  padding-bottom: 20px; /* Alt kısımla mesafe */
}

/* Newsletter alanı için özel ayar (Sağa yaslı dursun) */
.newsletter-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* İçerikler sola yaslı */
}

/* ALT KISIM */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 25px;
  /* İsteğe bağlı üst çizgi */
  /* border-top: 1px solid #333; */ 
  
  .copyright {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
  }

  .payment-icons {
    display: flex;
    align-items: center;
    
    .payment-img {
      height: 25px;
      opacity: 0.8;
      display: block;
    }
  }
}

/* --- RESPONSIVE AYARLAR --- */

/* Tablet */
@media (max-width: 1024px) {
  .footer-container {
    padding: 0 40px; /* Tablette kenar boşluğunu biraz azalt */
  }
  
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 50px;
  }
  
  .newsletter-column {
    grid-column: span 3; 
    max-width: 500px;
  }
}

/* Mobil */
@media (max-width: 600px) {
  .footer-container {
    padding: 0 20px; /* Mobilde daha az boşluk */
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 40px;
  }

  .newsletter-column {
    grid-column: span 1;
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>