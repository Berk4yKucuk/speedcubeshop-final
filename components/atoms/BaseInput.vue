<template>
  <div class="input-wrapper" :class="{ 'has-error': error }">
    <label v-if="label" class="input-label">{{ label }}</label>

    <div class="input-container">
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        class="base-input"
        :disabled="disabled"
      />
    </div>

    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
// TypeScript Props Tanımları
interface Props {
  modelValue: string | number; // v-model'den gelen değer
  label?: string;              // Üstteki yazı (örn: "E-posta")
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  error?: string;              // Hata mesajı (örn: "Şifre çok kısa")
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  disabled: false
});

// v-model'in çalışması için 'emit' kullanıyoruz
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;

  .input-label {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 6px;
    color: #333;
  }

  .base-input {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box; // Padding taşmasın diye

    &:focus {
      border-color: #FF9800; // SpeedCubeShop Turuncusu
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: #ef5350;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  // Hata durumunda input çerçevesi kırmızı olsun
  &.has-error .base-input {
    border-color: #ef5350;
  }
}
</style>