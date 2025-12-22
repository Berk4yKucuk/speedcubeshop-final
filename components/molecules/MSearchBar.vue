<template>
  <div class="search-bar-molecule">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Search" 
      class="search-input"
      @keyup.enter="handleSearch"
    />
    
    <ABaseButton class="search-btn" @click="handleSearch">
      <ABaseIcon name="search" size="18" />
    </ABaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = () => {
  console.log("Searching for:", searchQuery.value);
  //Eklenecekler: Arama işlevselliği burada uygulanacak
};
</script>

<style scoped lang="scss">
.search-bar-molecule {
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 35px;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 0px solid transparent; 
  transition: border-color 0.2s;

  &:focus-within {
    border-color: var(--scs-orange);
  }

  .search-input {
    flex: 1;
    border: none;
    padding: 12px 15px;
    outline: none;
    font-size: 0.95rem;
    color: #333;

    &::placeholder {
      color: #999;
    }
  }

  .search-btn {
    /* ABaseButton override */
    background: var(--scs-orange); 
    border: none;
    width: 50px;
    height: 100%; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border-radius: 8px; 
    
    &:hover {
      background: #e67e22;
    }
  }
}
</style>