export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  artisan: {
    id: string;
    name: string;
    avatar: string;
    location: string;
  };
  materials: string[];
  dimensions?: string;
  weight?: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isArtisan: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isArtisan?: boolean;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  materials?: string[];
  inStock?: boolean;
  featured?: boolean;
  search?: string;
}