<template>
  <div class="shop-page">
    
    <div class="collection-header">
      <div class="header-inner">
        
        <div class="header-content">
          <h1 class="collection-title">All Products</h1>
          
          <div class="header-controls">
            <span class="product-count">{{ productStore.filteredProducts.length }} products</span>
            
            <div class="sort-wrapper">
              <span class="sort-label">Sort by</span>
              <select class="sort-select" @change="handleSort($event)">
                <option value="featured">Featured</option>
                <option value="best-selling">Best selling</option>
                <option value="name-asc">Alphabetically, A-Z</option>
                <option value="name-desc">Alphabetically, Z-A</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="main-layout">
      
      <aside class="sidebar">
        
        <div class="filter-group">
          <div class="filter-header">
            <h3>Category</h3>
            <span class="toggle-icon">-</span>
          </div>
          <ul class="filter-list">
            <li v-for="cat in productStore.getCategoryTabs" :key="cat" class="filter-item">
              <label class="custom-checkbox">
                <input 
                  type="radio" 
                  name="category" 
                  :value="cat" 
                  @change="productStore.filterByCategory(cat)"
                  :checked="cat === 'All'"
                />
                <span class="checkmark"></span>
                <span class="label-text">{{ cat }}</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="filter-group">
          <div class="filter-header">
            <h3>Availability</h3>
            <span class="toggle-icon">-</span>
          </div>
          <ul class="filter-list">
            <li class="filter-item">
              <label class="custom-checkbox">
                <input type="checkbox" checked />
                <span class="checkmark"></span>
                <span class="label-text">In stock</span>
              </label>
            </li>
            <li class="filter-item">
              <label class="custom-checkbox">
                <input type="checkbox" />
                <span class="checkmark"></span>
                <span class="label-text">Out of stock</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="filter-group">
          <div class="filter-header">
            <h3>Price</h3>
            <span class="toggle-icon">-</span>
          </div>
          <div class="price-inputs">
            <div class="input-wrapper">
              <span class="currency-symbol">$</span>
              <input type="number" placeholder="From" />
            </div>
            <div class="input-wrapper">
              <span class="currency-symbol">$</span>
              <input type="number" placeholder="To" />
            </div>
          </div>
        </div>

      </aside>

      <main class="product-grid-section">
        
        <div v-if="productStore.loading" class="loading-state">
          <div class="spinner"></div>
        </div>

        <div v-else-if="productStore.filteredProducts.length === 0" class="empty-state">
          <p>No products found matching your selection.</p>
          <button @click="productStore.filterByCategory('All')" class="clear-btn">Clear Filters</button>
        </div>

        <div v-else class="products-grid">
          <MProductCard 
            v-for="product in productStore.filteredProducts"
            :key="product.id"
            :id="product.id || ''"
            :title="product.title"
            :price="product.price"
            :old-price="product.oldPrice"
            :image="product.image"
            :rating="product.rating"
            :review-count="product.reviewCount"
            :badge="product.badge"
            :discount="product.discount"
          />
        </div>

      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

const handleSort = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  const products = [...productStore.filteredProducts];

  if (value === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (value === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (value === 'name-asc') products.sort((a, b) => a.title.localeCompare(b.title));
  else if (value === 'name-desc') products.sort((a, b) => b.title.localeCompare(a.title));
  else products.sort((a, b) => b.rating - a.rating);

  productStore.filteredProducts = products;
};
</script>

<style scoped lang="scss">
.shop-page {
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 100px;
  font-family: 'Inter', sans-serif;
}

.collection-header {
  background-color: #f9f9f9; /* Azıcık koyu beyaz */
  padding: 30px 250px; 
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .collection-title {
    font-size: 1.5rem; 
    font-weight: 700;
    color: #111;
    margin: 0;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 20px;

    .product-count {
      color: #666;
      font-size: 0.8rem; 
      font-weight: 500;
    }

    .sort-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;

      .sort-label {
        font-size: 0.8rem; 
        color: #333;
      }

      .sort-select {
        border: 1px solid #ddd;
        background: white;
        font-size: 0.8rem; 
        color: #111;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        outline: none;
        
        &:hover { border-color: #999; }
      }
    }
  }

  @media (max-width: 768px) {
    .header-content { flex-direction: column; align-items: flex-start; gap: 15px; }
    .header-controls { width: 100%; justify-content: space-between; }
  }
}

.main-layout {
  display: grid;
  grid-template-columns: 220px 1fr; 
  gap: 40px;
  padding: 0 250px; 
}

/* --- SIDEBAR --- */
.sidebar {

  .filter-group {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
    margin-bottom: 20px;

    &:last-child { border-bottom: none; }

    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      h3 {
        font-size: 0.75rem; 
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #111;
        margin: 0;
      }
      
      .toggle-icon { font-size: 1rem; color: #111; }
    }

    .filter-list {
      list-style: none; padding: 0; margin: 0;
    }

    .filter-item {
      margin-bottom: 8px;
    }

    /* Checkbox Style */
    .custom-checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      font-size: 0.85rem; 
      color: #555;
      
      input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }

      .checkmark {
        height: 16px; width: 16px; 
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-right: 8px;
        position: relative;
        transition: all 0.2s;
      }

      &:hover input ~ .checkmark { border-color: #666; }

      input:checked ~ .checkmark {
        background-color: #111; 
        border-color: #111;
      }

      input:checked ~ .checkmark:after {
        content: "";
        position: absolute;
        display: block;
        left: 5px; top: 1px;
        width: 3px; height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    .price-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      .input-wrapper {
        position: relative;
        display: flex; align-items: center;

        .currency-symbol {
          position: absolute; left: 8px; color: #888; font-size: 0.8rem;
        }

        input {
          width: 100%;
          padding: 8px 8px 8px 20px;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          font-size: 0.8rem; 
          outline: none;
          
          &:focus { border-color: #111; }
        }
      }
    }
  }
}

/* --- PRODUCT GRID (4 SÜTUN) --- */
.product-grid-section {
  .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px;
  }

  .loading-state, .empty-state {
    text-align: center;
    padding: 80px 0;
    color: #666;
  }

  .spinner {
    width: 30px; height: 30px;
    border: 3px solid #eee;
    border-top-color: #111;
    border-radius: 50%;
    animation: spin 0.8s infinite linear;
    margin: 0 auto;
  }

  .clear-btn {
    margin-top: 15px;
    padding: 8px 16px;
    background: #111;
    color: white;
    border: none;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { opacity: 0.9; }
  }
}

@keyframes spin { 100% { transform: rotate(360deg); } }
</style>