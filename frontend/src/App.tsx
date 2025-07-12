import { useState, type FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import Hero from './components/Hero';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';
import type { Product, Category } from './types';

// In a real application, this data would be fetched from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Crystal Clear Strappy Sandal',
    brand: { name: 'ReWear', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop',
    rating: 4.3,
    href: '/products/1',
    price: 29.99,
    originalPrice: 49.99,
    description: 'Elegant transparent strappy sandals with a comfortable cushioned insole and durable outsole.',
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Clear', 'Black', 'Rose Gold'],
    images: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&h=600&fit=crop'
    ],
    features: [
        'Transparent PVC upper with adjustable ankle strap',
        'Memory foam padded insole for all-day comfort',
        'Non-slip rubber outsole',
        '2.5-inch block heel height',
        'Vegan-friendly materials'
    ],
    userName: 'Sarah_M'
  },
  {
    id: '2',
    name: 'Elegant Black Heels',
    brand: { name: 'POPFLEX®', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
    rating: 4.7,
    href: '/products/2',
    price: 39.99,
    userName: 'Emma_K'
  },
  {
    id: '3',
    name: 'Graphic Tee',
    brand: { name: 'Roller Rabbit', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
    rating: 4.8,
    href: '/products/3',
    price: 19.99,
    userName: 'Sarah_M'
  },
  {
    id: '4',
    name: 'Yellow Dress',
    brand: { name: 'Princess Polly USA', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&h=600&fit=crop',
    rating: 4.5,
    href: '/products/4',
    price: 59.99,
    userName: 'Jessica_L'
  },
  {
    id: '5',
    name: 'Cropped Sweater',
    brand: { name: 'Aviator Nation', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1616769533352-869a24a3a69a?w=600&h=600&fit=crop',
    rating: 4.5,
    href: '/products/5',
    price: 79.99,
    userName: 'Sarah_M'
  },
  {
    id: '6',
    name: 'Vintage Denim Jacket',
    brand: { name: 'Levi\'s', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop',
    rating: 4.6,
    href: '/products/6',
    price: 45.99,
    userName: 'Emma_K'
  },
  {
    id: '7',
    name: 'Floral Summer Dress',
    brand: { name: 'Zara', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=50&fit=crop' },
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
    rating: 4.4,
    href: '/products/7',
    price: 34.99,
    userName: 'Jessica_L'
  }
];

const mockCategories: Category[] = [
    { 
        id: '1', 
        name: 'Women', 
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
        href: '/categories/1/women'
    },
    { 
        id: '2', 
        name: 'Men', 
        image: 'https://images.unsplash.com/photo-1490367532274-3385314a291c?w=400&h=400&fit=crop',
        href: '/categories/2/men'
    },
    { 
        id: '3', 
        name: 'Shoes', 
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        href: '/categories/3/shoes'
    },
    { 
        id: '4', 
        name: 'Accessories', 
        image: 'https://images.unsplash.com/photo-1508685001358-7f6118a148a2?w=400&h=400&fit=crop',
        href: '/categories/4/accessories'
    },
    { 
        id: '5', 
        name: 'Bags', 
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        href: '/categories/5/bags'
    },
    { 
        id: '6', 
        name: 'Jewelry', 
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        href: '/categories/6/jewelry'
    },
    { 
        id: '7', 
        name: 'Vintage', 
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
        href: '/categories/7/vintage'
    },
    { 
        id: '8', 
        name: 'Formal', 
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
        href: '/categories/8/formal'
    },
    { 
        id: '9', 
        name: 'Casual', 
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        href: '/categories/9/casual'
    },
    { 
        id: '10', 
        name: 'Sportswear', 
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        href: '/categories/10/sportswear'
    },
    { 
        id: '11', 
        name: 'Outerwear', 
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
        href: '/categories/11/outerwear'
    },
    { 
        id: '12', 
        name: 'Designer', 
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
        href: '/categories/12/designer'
    },
];


interface HomePageProps {
  favorites: Array<string | number>;
  onFavoriteToggle: (productId: string | number) => void;
}

const HomePage: FC<HomePageProps> = ({ favorites, onFavoriteToggle }) => {
  return (
    <>
      <Hero/>
      <main className="max-w-7xl mx-auto py-4">
        <CategoryGrid categories={mockCategories} />
        <ProductSection 
          title="Women" 
          products={mockProducts} 
          favorites={favorites}
          onFavoriteToggle={onFavoriteToggle}
        />
      </main>
    </>
  );
};

const App: FC = () => {
  const [favorites, setFavorites] = useState<Array<string | number>>([]);
  const [currentUser] = useState<string>('Sarah_M'); // Mock logged-in user

  const handleFavoriteToggle = (productId: string | number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const handleAddToCart = (details: { productId: string | number; size: string; color: string; quantity: number }) => {
    console.log('Added to cart:', details);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="text-gray-800 font-sans">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/products/:productId" 
              element={
                <ProductDetail 
                  products={mockProducts}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddToCart={handleAddToCart}
                />
              } 
            />
            <Route 
              path="/profile/:username" 
              element={
                <UserProfile 
                  products={mockProducts}
                  favorites={favorites}
                  onFavoriteToggle={handleFavoriteToggle}
                  currentUser={currentUser}
                />
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;