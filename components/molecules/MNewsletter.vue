<template>
  <div class="newsletter-molecule">
    
    <h3 class="section-title">STAY CONNECTED</h3>
    
    <div class="social-icons">
      <a href="#" class="social-circle"><ABaseIcon name="facebook" size="18" /></a>
      <a href="#" class="social-circle"><ABaseIcon name="twitter" size="18" /></a>
      <a href="#" class="social-circle"><ABaseIcon name="instagram" size="18" /></a>
      <a href="#" class="social-circle"><ABaseIcon name="youtube" size="18" /></a>
      <a href="#" class="social-circle"><ABaseIcon name="tiktok" size="18" /></a>
      <a href="#" class="social-circle"><ABaseIcon name="discord" size="18" /></a>
      <a href="#" class="social-circle"><ABaseIcon name="reddit" size="18" /></a>
    </div>

    <h4 class="promo-text">GET SALES, NEW RELEASES, TIPS, AND NEWS</h4>
    
    <div class="input-group">
      <input type="email" placeholder="Email Address" />
      
      <ABaseButton class="subscribe-btn">Subscribe</ABaseButton>
    </div>

  </div>
</template>

<style scoped lang="scss">
.newsletter-molecule {
  
  .section-title {
    color: white;
    font-size: 0.95rem;
    font-weight: 800;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .social-icons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 30px;

    .social-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: white; 
      border-radius: 50%;
      color: black; 
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-3px);
        background-color: var(--scs-orange);
      }
    }
  }

  .promo-text {
    color: white;
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
  }

  .input-group {
    display: flex;
    gap: 0;
    /* Birleşik duruyorlar */

    input {
      flex: 1;
      background: white;
      border: none;
      padding: 12px 15px;
      border-radius: 2px 0 0 2px;
      outline: none;
      color: #333;
      font-size: 0.95rem;
      
      &::placeholder { color: #999; }
    }

    .subscribe-btn {
      /* ABaseButton stillerini eziyoruz */
      background: #e67e22;
      /* Görseldeki turuncu tonu */
      color: black;
      font-weight: 700;
      border: none;
      padding: 0 20px;
      border-radius: 0 2px 2px 0;
      cursor: pointer;
      font-size: 0.95rem;

      &:hover { background: #d35400; }
    }
  }
}
</style>