<template>
  <div class="search-bar-molecule">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Search" 
      class="search-input"
      @keyup.enter="handleSearch"
    />
    <button class="search-btn" @click="handleSearch">
      <ABaseIcon name="search" size="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};
</script>

<style scoped lang="scss">
.search-bar-molecule {
  display: flex;
  width: 100%;
  height: 38px; /* Yükseklik küçültüldü (Daha zarif) */
  border-radius: 4px;
  overflow: hidden;

  .search-input {
    flex-grow: 1;
    border: none;
    padding: 0 15px;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: 'Rubik', sans-serif;
    outline: none;
    color: #333;
    background: white;
    
    &::placeholder { color: #999; font-weight: 500; }
  }

  .search-btn {
    width: 40px; /* Buton da küçüldü */
    border: none;
    background-color: var(--scs-orange);
    color: #111;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover { background-color: #f57c00; }
  }
}
</style>