// 1. Ürün Veri Tipi (Product Card ve Slider için)
export interface IProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number; 
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;    // 'HOT SELLER', 'NEW' vb.
  discount?: number; // İndirim oranı
  category?: string; // Filtreleme için
}

// 2. Menü Link Tipi (Mega Menüdeki tek bir satır)
export interface IMenuLink {
  text: string;
  url: string;
}

// 3. Menü Bölüm Tipi (Başlık ve altındaki linkler grubu)
export interface IMenuSection {
  title: string;
  links: IMenuLink[];
}

// 4. Marka Tipi (Brand Slider için)
export interface IBrand {
  name: string;
  logo: string; // Resim yolu
}

// 5. Para Birimi Tipi (Navbar için)
export interface ICurrency {
  code: string; // 'USD', 'EUR'
  flag: string; // Bayrak kodu
}

// 6. Banner Tipi (Hero ve Marketing alanları için)
export interface IBanner {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText: string;
  image: string;
  variant?: 'light' | 'dark' | 'primary'; // Tema seçenekleri
}

// 7. Kullanıcı Tipi (Login ve Users tablosu için)
export interface IUser {
  id?: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: any; // Firebase Timestamp
  lastLogin: any;
}