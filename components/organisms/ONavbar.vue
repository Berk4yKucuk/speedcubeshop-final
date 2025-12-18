<template>
  <header class="site-header">
    
    <div class="main-header">
      <div class="header-container">
        
        <div class="logo-block">
          <NuxtLink to="/" class="logo-link">
            <img src="~/assets/navbar_logo.svg" alt="SpeedCubeShop" class="logo-img" />
          </NuxtLink>
        </div>

        <div class="right-block">
          
          <div class="top-row">
            <span class="free-shipping">CALCULATING <strong>FREE SHIPPING...</strong></span>
            <div class="icon-group">
              <a href="#" class="icon-link wishlist"><ABaseIcon name="heart" size="19" /></a>
              <NuxtLink to="/login" class="icon-link account-link">
                <ABaseIcon name="user" size="19" /><span>My Account</span>
              </NuxtLink>
            </div>
          </div>

          <div class="bottom-row">
            <div class="search-wrapper">
              <MSearchBar @search="handleSearch" />
            </div>
            <div class="buttons-wrapper">
              <button class="currency-btn">
                <img src="https://flagcdn.com/w20/us.png" alt="US Flag" class="flag-img" />
                US <ABaseIcon name="chevron-down" size="12" />
              </button>
              <NuxtLink to="/cart" class="cart-btn">
                <ABaseIcon name="cart" size="18" /><span>Cart</span>
                <ABaseBadge variant="primary" pill class="cart-count-badge">0</ABaseBadge>
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>

    <nav class="nav-bar">
      <div class="header-container nav-relative">
        <ul class="nav-list">
          <li><a href="#">New</a></li>
          <li><a href="#">Best Sellers</a></li>
          
          <li class="has-dropdown">
            <a href="#" class="menu-link">Holiday</a>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item">Themes</a>
            </div>
          </li>

          <li class="has-mega-menu">
            <a href="#" class="menu-link">Cubes</a>
            
            <div class="mega-menu">
              <div class="mega-content">
                
                <div class="mega-column">
                  <div class="mega-section">
                    <h4>BY SIZE</h4>
                    <ul>
                      <li><a href="#">3x3</a></li>
                      <li><a href="#">2x2</a></li>
                      <li><a href="#">4x4</a></li>
                      <li><a href="#">5x5</a></li>
                      <li><a href="#">6x6</a></li>
                      <li><a href="#">7x7</a></li>
                      <li><a href="#">Big Cubes (8x8+)</a></li>
                    </ul>
                  </div>
                  <div class="mega-section">
                    <h4>SHAPE SHIFTING</h4>
                    <ul>
                      <li><a href="#">Shop all Shape Shifting</a></li>
                      <li><a href="#">Mirror / Bump</a></li>
                      <li><a href="#">Fisher</a></li>
                      <li><a href="#">Windmill</a></li>
                      <li><a href="#">Axis</a></li>
                    </ul>
                  </div>
                </div>

                <div class="mega-column">
                  <div class="mega-section">
                    <h4>BY EVENT</h4>
                    <ul>
                      <li><a href="#">Pyraminx</a></li>
                      <li><a href="#">Megaminx</a></li>
                      <li><a href="#">Skewb</a></li>
                      <li><a href="#">Square-1</a></li>
                      <li><a href="#">Clock</a></li>
                    </ul>
                  </div>
                </div>

                <div class="mega-column">
                  <div class="mega-section">
                    <h4>SPECIALTY</h4>
                    <ul>
                      <li><a href="#">Shop all Specialty Cubes</a></li>
                      <li><a href="#">Smart / Bluetooth</a></li>
                      <li><a href="#">Oversized</a></li>
                      <li><a href="#">Mini</a></li>
                      <li><a href="#">Glow in the Dark</a></li>
                      <li><a href="#">Metallic</a></li>
                      <li><a href="#">Sticker Mods</a></li>
                      <li><a href="#">Special Edition</a></li>
                    </ul>
                  </div>
                </div>

                <div class="mega-column">
                  <div class="mega-section">
                    <h4>TWISTY PUZZLES</h4>
                    <ul>
                      <li><a href="#">Shop all Twisty Puzzles</a></li>
                      <li><a href="#">Cuboids</a></li>
                      <li><a href="#">Shape Mods</a></li>
                      <li><a href="#">Ghost</a></li>
                      <li><a href="#">Gear</a></li>
                      <li><a href="#">Picture</a></li>
                      <li><a href="#">Animal Shape Mods</a></li>
                      <li><a href="#">FTO</a></li>
                      <li><a href="#">Bandaged</a></li>
                      <li><a href="#">Snake</a></li>
                      <li><a href="#">Fused</a></li>
                    </ul>
                  </div>
                </div>

                <div class="mega-column">
                  <div class="mega-section">
                    <h4>VARIANTS & MORE</h4>
                    <ul>
                      <li><a href="#">Bundles</a></li>
                      <li><a href="#">Mosaic Kits</a></li>
                      <li><a href="#">Magic Panels</a></li>
                      <li><a href="#">Klotski</a></li>
                      <li><a href="#">Sudoku</a></li>
                      <li><a href="#">Megaminx +</a></li>
                      <li><a href="#">Pyraminx +</a></li>
                      <li><a href="#">Square-1 +</a></li>
                      <li><a href="#">Shop all</a></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
            </li>

          <li><a href="#">Cube Finder</a></li>
          <li><a href="#">Brands</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Lubricant</a></li>
          <li><a href="#">Toys & Games</a></li>
          <li><a href="#">Lifestyle</a></li>
          <li><a href="#" class="sale">Sale</a></li>
        </ul>
      </div>
    </nav>

  </header>
</template>

<script setup lang="ts">
const handleSearch = (q: string) => console.log("Aranan:", q);
</script>

<style scoped lang="scss">
/* --- MEVCUT STİLLER (AYNEN KORUNDU) --- */
.site-header {
  background-color: #121212 !important;
  color: white;
  padding-top: 15px;
  border-bottom: 1px solid #222;
  width: 100%;
}
.header-container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 100px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 30px;
}
.logo-block { flex-shrink: 0; padding-top: 5px; .logo-img { height: 90px; width: auto; display: block; } }
.right-block { flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 10px; }
.top-row { display: flex; justify-content: flex-end; align-items: center; gap: 25px; margin-bottom: 12px; font-size: 0.75rem; color: #ccc; .free-shipping strong { color: white; font-weight: 800; } .icon-group { display: flex; gap: 18px; } .icon-link { color: white; display: flex; gap: 8px; font-weight: 700; &:hover { color: var(--scs-orange); } } }
.bottom-row { display: flex; align-items: center; gap: 15px; }
.search-wrapper { flex-grow: 1; }
.buttons-wrapper { display: flex; gap: 10px; flex-shrink: 0; .currency-btn, .cart-btn { background: #222; border: 1px solid #333; color: white; padding: 0 14px; height: 38px; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; transition: all 0.2s; } .currency-btn:hover { border-color: #555; } .flag-img { width: 20px; border-radius: 2px; } .cart-btn { background: #2a2a2a; &:hover { border-color: var(--scs-orange); color: var(--scs-orange); } .cart-count-badge { margin-left: 4px; font-size: 0.8rem; } } }

/* --- MENÜ STILLERI (DÜZELTİLDİ) --- */
.nav-bar {
  background-color: #121212;
  padding: 10px 0 16px 0;
  
  /* MEGA MENU İÇİN GEREKLİ: Container'ı referans noktası yapıyoruz */
  .nav-relative {
    position: relative;
  }

  .nav-list {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 0; margin: 10px 0 0 0; list-style: none; margin-top: 8px;
    flex-wrap: wrap;
    
    /* TÜM LİSTE ELEMANLARI (Burayı düzelttik) */
    li {
      position: relative; /* Standart Dropdown için */
      
      /* ÖNEMLİ: Artık .menu-link sınıfı olsun olmasın TÜM linkleri hedefliyoruz */
      > a { 
        color: white; 
        font-weight: 700; 
        font-size: 0.81rem; 
        text-transform: capitalize; 
        text-decoration: none;
        display: block; 
        padding-bottom: 5px; 
        border-bottom: 2px solid transparent;
        cursor: pointer;
        
        &:hover, &.active { 
          color: var(--scs-orange); 
          border-bottom-color: var(--scs-orange); 
        }
      }
    }

    /* --- 1. HOLIDAY DROPDOWN --- */
    li.has-dropdown:hover .dropdown-menu { display: block; }
    
    .dropdown-menu {
      display: none; position: absolute; top: 100%; left: 0; 
      background-color: white; min-width: 160px; padding: 10px 0; 
      box-shadow: 0 4px 10px rgba(0,0,0,0.2); border-radius: 2px; z-index: 100;
      
      .dropdown-item {
        color: #333 !important; 
        font-size: 0.85rem !important; /* Dropdown içi font boyutu */
        padding: 8px 20px; font-weight: 500; border-bottom: none; display: block;
        text-transform: none; /* Dropdown içindekiler büyük harf zorunlu değil */
        
        &:hover { color: var(--scs-orange) !important; background-color: #f5f5f5; 
         }
      }
    }

    /* --- 2. CUBES MEGA MENU --- */
    li.has-mega-menu {
      position: static;
      &:hover .mega-menu { display: block; opacity: 1; visibility: visible; }
    }

    .mega-menu {
      display: none; opacity: 0; visibility: hidden;
      position: absolute; top: 100%; left: 0; width: 100%; 
      background-color: white; color: #333; padding: 30px 0; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 999;
      transition: all 0.2s ease;
    }

    .mega-content {
      display: flex; justify-content: space-between; gap: 20px; padding: 0 20px; 
    }

    .mega-column {
      flex: 1; display: flex; flex-direction: column; gap: 30px; 
    }

    .mega-section {
      h4 {
        font-size: 0.75rem; font-weight: 800; letter-spacing: 0.5px; 
        text-transform: uppercase; margin: 0 0 10px 0; color: #111;
      }

      ul {
        list-style: none; padding: 0; margin: 0;
        li {
          margin-bottom: 6px;
          a {
            /* Mega Menu içindeki linkler ana menüden farklı olmalı */
            color: #555 !important; 
            font-size: 0.85rem !important; 
            font-weight: 400; 
            border: none; padding: 0; text-transform: none;
            
            &:hover {
              color: var(--scs-orange) !important; 
              padding-left: 2px; transition: padding 0.2s; 
              border-bottom: none; /* Alt çizgi çıkmasın */
            }
          }
        }
      }
    }

  }
}
</style>