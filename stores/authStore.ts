import { defineStore } from 'pinia';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import type { IUser } from '~/types';

// PROJE İÇİN SABİT DOĞRULAMA KODU (ŞİFRE GÖREVİ GÖRÜR)
const FIXED_CODE = '123456';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as IUser | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
    // generatedCode'u kaldırdık, çünkü artık sabit.
  }),

  actions: {
    // 1. ADIM: KOD GÖNDERME SİMÜLASYONU (Sadece Bekletir)
    async sendVerificationCode(email: string) {
      this.loading = true;
      this.error = null;
      
      // Sadece kullanıcıya işlem yapılıyormuş hissi vermek için 1 saniye bekle
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.loading = false;
      // Konsola log atmaya gerek yok, kod zaten belli (123456)
    },

    // 2. ADIM: SABİT KOD İLE DOĞRULAMA VE GİRİŞ
    async verifyAndLogin(email: string, inputCode: string) {
      this.loading = true;
      this.error = null;

      // KOD KONTROLÜ (SABİT KOD İLE)
      if (inputCode !== FIXED_CODE) {
        this.error = "Hatalı doğrulama kodu! (Test kodu: 123456)";
        this.loading = false;
        return; 
      }

      // Kod doğruysa Firebase işlemlerine başla
      try {
        const { $db } = useNuxtApp();
        const usersRef = collection($db as any, 'users');
        
        // Kullanıcı var mı kontrol et
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // VARSA: Güncelle
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as IUser;
          
          await updateDoc(doc($db as any, 'users', userDoc.id), {
            lastLogin: serverTimestamp()
          });

          this.currentUser = { ...userData, id: userDoc.id };
        } else {
          // YOKSA: Kayıt et
          const newUser: IUser = {
            email: email,
            role: 'customer',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          };
          
          const docRef = await addDoc(usersRef, newUser);
          this.currentUser = { ...newUser, id: docRef.id };
        }

        this.isAuthenticated = true;
        
        if (process.client) {
          localStorage.setItem('user_email', email);
        }

      } catch (err: any) {
        console.error("Auth hatası:", err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;
      if (process.client) {
        localStorage.removeItem('user_email');
      }
    },

    checkAuth() {
      if (process.client) {
        const savedEmail = localStorage.getItem('user_email');
        if (savedEmail) {
           this.isAuthenticated = true;
           // İstenirse burada loginWithEmail benzeri bir fonksiyonla user verisi çekilebilir
        }
      }
    }
  }
});