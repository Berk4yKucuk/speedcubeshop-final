// seed.js
// Modern ES Module import yapısı (package.json type: module olduğu için)
import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";

// --- DİKKAT: BURAYA KENDİ FIREBASE CONFIG BİLGİLERİNİ YAPIŞTIR ---
// plugins/firebase.client.ts dosyasındaki bilgilerin aynısı olmalı.
const firebaseConfig = {
    apiKey: "AIzaSyD....", // <-- KENDİ API KEY'İNİ BURAYA YAZ
    authDomain: "speedcubeshop-final.firebaseapp.com",
    projectId: "speedcubeshop-final",
    storageBucket: "speedcubeshop-final.firebasestorage.app",
    messagingSenderId: "...",
    appId: "..."
};

// Firebase Başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- YÜKLENECEK VERİLER ---

// 1. KATEGORİLER
const categories = [
  { id: '2x2', name: '2x2 Speed Cubes', description: 'Beginner to Pro 2x2 puzzles' },
  { id: '3x3', name: '3x3 Speed Cubes', description: 'Standard 3x3 Rubiks Cubes' },
  { id: '4x4', name: '4x4 Speed Cubes', description: 'Master logic with 4x4' },
  { id: 'accessories', name: 'Accessories', description: 'Lubricants, Stands, Timers' }
];

// 2. ÜRÜNLER (Tam Liste - 16 Adet)
const products = [
    // --- 2x2 KATEGORİSİ (8 ADET) ---
    { 
        id: 'gan-251-m-pro', 
        title: 'GAN 251 M Pro 2x2', 
        price: 32.95, 
        rating: 5, 
        reviewCount: 120, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/GAN_251_M_Pro_2x2_1_360x.png', 
        badge: 'BEST' 
    },
    { 
        id: 'moyu-rs2-m-2020', 
        title: 'MoYu RS2 M 2020', 
        price: 8.95, 
        rating: 4.8, 
        reviewCount: 340, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/MoYu_RS2_M_2020_1_360x.png', 
        badge: 'HOT' 
    },
    { 
        id: 'yj-mgc-2x2', 
        title: 'YJ MGC 2x2 Magnetic', 
        price: 11.95, 
        rating: 4.9, 
        reviewCount: 85, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YJ_MGC_2x2_Magnetic_1_360x.png' 
    },
    { 
        id: 'qiyi-ms-2x2', 
        title: 'QiYi MS 2x2 Magnetic', 
        price: 7.95, 
        rating: 4.5, 
        reviewCount: 50, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/QiYi_MS_2x2_Magnetic_1_360x.png' 
    },
    { 
        id: 'valk-2-m', 
        title: 'Valk 2 M 2x2', 
        price: 18.95, 
        rating: 4.7, 
        reviewCount: 200, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/Valk_2_M_1_360x.png' 
    },
    { 
        id: 'yuxin-little-magic-2x2', 
        title: 'Yuxin Little Magic 2x2', 
        price: 5.95, 
        rating: 4.2, 
        reviewCount: 110, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YuXin_Little_Magic_2x2_M_1_360x.png' 
    },
    { 
        id: 'dayan-tengyun-v2', 
        title: 'DaYan TengYun 2x2 V2', 
        price: 28.95, 
        rating: 4.8, 
        reviewCount: 45, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/DaYan_TengYun_V2_M_2x2_1_360x.png' 
    },
    { 
        id: 'xman-flare-2x2', 
        title: 'X-Man Flare 2x2 M', 
        price: 15.95, 
        rating: 4.6, 
        reviewCount: 75, 
        category: '2x2', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/X-Man_Flare_2x2_M_1_360x.png' 
    },

    // --- 3x3 KATEGORİSİ (6 ADET) ---
    { 
        id: 'moyu-rs3-m-2020', 
        title: 'MoYu RS3 M 2020', 
        price: 8.95, 
        rating: 5, 
        reviewCount: 1547, 
        category: '3x3', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/MoYu_RS3_M_2020_3x3_Magnetic_1_360x.png', 
        badge: 'HOT SELLER' 
    },
    { 
        id: 'gan-12-maglev', 
        title: 'GAN 12 MagLev 3x3', 
        price: 77.95, 
        rating: 5, 
        reviewCount: 432, 
        category: '3x3', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/GAN_12_MagLev_3x3_UV_Coated_Primary_1_360x.png', 
        badge: 'NEW' 
    },
    { 
        id: 'moretry-tianma-x3', 
        title: 'MoreTry Tianma X3', 
        price: 24.95, 
        oldPrice: 32.95, 
        rating: 4, 
        reviewCount: 25, 
        category: '3x3', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/MoreTry_Tianma_X3_3x3_Magnetic_Snap_1_360x.png', 
        badge: 'SALE', 
        discount: 25 
    },
    { 
        id: 'qiyi-warrior-s', 
        title: 'QiYi Warrior S 3x3', 
        price: 3.95, 
        rating: 4.3, 
        reviewCount: 890, 
        category: '3x3', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/QiYi_Warrior_S_3x3_1_360x.png' 
    },
    { 
        id: 'tornado-v3-flagship', 
        title: 'Tornado V3 M Flagship', 
        price: 34.95, 
        rating: 4.9, 
        reviewCount: 120, 
        category: '3x3', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/X-Man_Tornado_V3_M_Flagship_3x3_1_360x.png' 
    },
    { 
        id: 'yj-mgc-evo-3x3', 
        title: 'YJ MGC Evo 3x3', 
        price: 22.95, 
        rating: 4.7, 
        reviewCount: 65, 
        category: '3x3', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YJ_MGC_Evo_3x3_1_360x.png' 
    },

    // --- 4x4 KATEGORİSİ (2 ADET) ---
    { 
        id: 'qiyi-ms-4x4', 
        title: 'QiYi MS Magnetic 4x4', 
        price: 14.95, 
        rating: 4.5, 
        reviewCount: 89, 
        category: '4x4', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/QiYi_MS_4x4_Magnetic_1_360x.png' 
    },
    { 
        id: 'yj-mgc-4x4', 
        title: 'YJ MGC 4x4 Magnetic', 
        price: 19.95, 
        rating: 4.8, 
        reviewCount: 210, 
        category: '4x4', 
        image: 'https://cdn.shopify.com/s/files/1/0951/1902/products/YJ_MGC_4x4_Magnetic_1_360x.png', 
        badge: 'Top Pick' 
    },
];

async function seedDatabase() {
  const batch = writeBatch(db);

  console.log("🚀 Veri yükleme başlıyor...");

  // Kategorileri Ekle
  categories.forEach((cat) => {
    const ref = doc(db, "categories", cat.id);
    batch.set(ref, cat);
  });
  console.log(`📦 ${categories.length} kategori hazırlandı.`);

  // Ürünleri Ekle
  products.forEach((prod) => {
    // ID olarak verdiğimiz 'gan-251-m-pro' gibi değerleri kullanıyoruz ki URL yapısı güzel olsun
    const ref = doc(db, "products", prod.id);
    batch.set(ref, prod);
  });
  console.log(`📦 ${products.length} ürün hazırlandı.`);

  // İşlemi Bitir
  await batch.commit();
  console.log("✅ TÜM VERİLER FIREBASE'E BAŞARIYLA YÜKLENDİ!");
  process.exit(0);
}

seedDatabase().catch((error) => {
    console.error("Hata:", error);
    process.exit(1);
});