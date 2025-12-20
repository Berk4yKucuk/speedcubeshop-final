import { defineNuxtPlugin } from '#app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // BURADAKİ BİLGİLERİ KENDİ PROJENLE DEĞİŞTİR
  const firebaseConfig = {
    apiKey: "AIzaSyDBzilgJXsktEO3_U34gF6YljnwG4VMjEI",
    authDomain: "speedcubeshop-final.firebaseapp.com",
    projectId: "speedcubeshop-final",
    storageBucket: "speedcubeshop-final.firebasestorage.app",
    messagingSenderId: "687684778546",
    appId: "1:687684778546:web:0ba175e97a6869a0685a2b"
  };

  // 1. Firebase Uygulamasını Başlat
  const app = initializeApp(firebaseConfig);
  
  // 2. Veritabanı (Firestore) Servisini Başlat
  const db = getFirestore(app);
  
  // 3. Kimlik Doğrulama (Auth) Servisini Başlat (İleride lazım olacak)
  const auth = getAuth(app);

  console.log("🔥 Firebase Başarıyla Yüklendi!");

  // Nuxt uygulamasına bu servisleri sunuyoruz ($db ve $auth olarak erişeceğiz)
  return {
    provide: {
      db,
      auth
    }
  };
});