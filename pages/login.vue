<template>
  <div class="login-wrapper">
    
    <div class="login-container">
      
      <div class="login-card">
        
        <div class="logo-area">
          <NuxtLink to="/">
            <img src="https://cdn.shopify.com/s/files/1/0978/8602/files/Legacy-Logo-Mobile-2024-02_200x60@2x.webp?v=1759476043.webp" alt="SpeedCubeShop" class="logo-img" />
          </NuxtLink>
        </div>

        <div v-if="errorMessage || authStore.error" class="error-banner">
          {{ errorMessage || authStore.error }}
        </div>

        <div v-if="step === 1">
          <h1 class="page-title">Log in</h1>
          <p class="page-subtitle">Log in or create an account</p>

          <button class="shop-login-btn">
            <span class="shop-text">shop</span> ile giriş yapın
          </button>

          <div class="divider">
            <span>or</span>
          </div>

          <div class="form-area">
            <ABaseInput 
              v-model="email" 
              placeholder="Email" 
              class="email-input"
              @keyup.enter="handleSendCode"
              @input="clearError"
            />

            <ABaseButton 
              class="continue-btn" 
              block 
              size="lg"
              :loading="authStore.loading"
              @click="handleSendCode"
            >
              Continue
            </ABaseButton>
          </div>
        </div>

        <div v-else>
          <h1 class="page-title">Check your email</h1>
          <p class="page-subtitle">
            We sent a code to <strong>{{ email }}</strong>.<br>
            <span class="edit-email" @click="step = 1">Change email</span>
          </p>

          <div class="form-area">
            <ABaseInput 
              v-model="verificationCode" 
              placeholder="Enter 6-digit code" 
              class="code-input"
              maxlength="6"
              @keyup.enter="handleLogin"
              @input="clearError"
            />

            <ABaseButton 
              class="continue-btn" 
              block 
              size="lg"
              :loading="authStore.loading"
              @click="handleLogin"
            >
              Log in
            </ABaseButton>
            
            <div class="resend-wrapper">
              <span class="resend-text">Didn't receive it? <a href="#" @click.prevent="handleSendCode">Resend code</a></span>
            </div>
          </div>
        </div>

      </div>

      <div class="login-footer">
        <a href="#">Privacy policy</a>
        <a href="#">Terms of service</a>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' });

import { ref } from 'vue';
import { useAuthStore } from '~/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

// STATE
const step = ref(1); // 1: Email, 2: Kod
const email = ref('');
const verificationCode = ref('');
const errorMessage = ref('');

// Hata mesajını temizle
const clearError = () => {
  errorMessage.value = '';
  authStore.error = null;
};

// İŞLEM 1: KOD GÖNDER (Store Bağlantılı)
const handleSendCode = async () => {
  if (!email.value) {
    errorMessage.value = 'Please enter your email address.';
    return;
  }
  if (!email.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address.';
    return;
  }

  // Store action çağır
  await authStore.sendVerificationCode(email.value);
  
  // Hata yoksa 2. adıma geç
  if (!authStore.error) {
    step.value = 2;
    errorMessage.value = ''; // Temizle
  }
};

// İŞLEM 2: GİRİŞ YAP (Store Bağlantılı)
const handleLogin = async () => {
  if (verificationCode.value.length < 6) {
    errorMessage.value = 'Please enter the 6-digit code.';
    return;
  }

  // Store action çağır
  await authStore.verifyAndLogin(email.value, verificationCode.value);

  // Başarılıysa yönlendir
  if (authStore.isAuthenticated) {
    router.push('/');
  } else {
    // Store'dan dönen hatayı göster (Örn: Hatalı kod)
    errorMessage.value = authStore.error || 'Login failed.';
  }
};
</script>

<style scoped lang="scss">
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-card {
  width: 400px;
  background: white;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
}

.logo-area {
  margin-bottom: 25px;
  .logo-img { height: 70px; }
}

/* Hata Mesajı Stili */
.error-banner {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
}

.page-title {
  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 10px 0;
}

.page-subtitle {
  text-align: left;
  font-size: 1rem;
  color: #666;
  margin: 0 0 30px 0;
  line-height: 1.5;
  
  strong { color: #111; }
  
  .edit-email {
    color: #2c6ecb;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover { text-decoration: underline; }
  }
}

.shop-login-btn {
  width: 100%;
  height: 48px;
  background-color: #5a31f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background-color 0.2s;
  &:hover { background-color: #4824d6; }
  .shop-text { font-weight: 800; letter-spacing: -0.5px; }
}

.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
  color: #888;
  font-size: 0.9rem;
  &::before, &::after { content: ""; flex: 1; height: 1px; background-color: #e1e1e1; }
  span { padding: 0 15px; }
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.email-input, .code-input {
  :deep(input) { height: 48px; font-size: 1rem; }
}

.code-input :deep(input) {
  text-align: center; 
  letter-spacing: 5px; 
  font-weight: 700;
}

.continue-btn {
  background-color: #f0f0f0 !important;
  color: #333 !important;
  border: none !important;
  height: 48px;
  font-weight: 600;
  border-radius: 5px !important;
  &:hover { background-color: #ff9500 !important; }
}

.resend-wrapper {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
  a { color: #2c6ecb; text-decoration: none; &:hover { text-decoration: underline; } }
}

.login-footer {
  margin-top: 30px;
  display: flex;
  gap: 20px;
  a { color: #2c6ecb; font-size: 0.85rem; text-decoration: none; &:hover { text-decoration: underline; } }
}
</style>