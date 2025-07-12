import type { FC } from 'react';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import Hero from './components/Hero';
// Remove the CSS import since we're using Tailwind now
// import './App.css';

// Sample product data
const womenProducts = [
  {
    id: '1',
    name: 'Pink Dress',
    brand: { name: 'Fashion Nova', logo: '/images/brands/fashion-nova.png' },
    image: '/images/products/fashion-nova-dress.jpg',
    rating: 4.3,
    href: '/products/fashion-nova-dress'
  },
  {
    id: '2',
    name: 'Purple Top',
    brand: { name: 'POPFLEX®', logo: '/images/brands/popflex.png' },
    image: '/images/products/popflex-top.jpg',
    rating: 4.7,
    href: '/products/popflex-top'
  },
  {
    id: '3',
    name: 'Graphic Tee',
    brand: { name: 'Roller Rabbit', logo: '/images/brands/roller-rabbit.png' },
    image: '/images/products/roller-rabbit-tee.jpg',
    rating: 4.8,
    href: '/products/roller-rabbit-tee'
  },
  {
    id: '4',
    name: 'Yellow Dress',
    brand: { name: 'Princess Polly USA', logo: '/images/brands/princess-polly.png' },
    image: '/images/products/princess-polly-dress.jpg',
    rating: 4.5,
    href: '/products/princess-polly-dress'
  },
  {
    id: '5',
    name: 'Cropped Sweater',
    brand: { name: 'Aviator Nation', logo: '/images/brands/aviator-nation.png' },
    image: '/images/products/aviator-nation-sweater.jpg',
    rating: 4.5,
    href: '/products/aviator-nation-sweater'
  }
];

// Sample store data
const sampleStore = {
  id: 'store-1',
  name: 'Fashion District',
  logo: 'https://cdn.shopify.com/shop-assets/shopify_brokers/aviator-nation.myshopify.com/1706122673/logo.png',
  wordmark: '/images/stores/fashion-district-wordmark.png',
  heroMedia: '/images/stores/fashion-district-hero.jpg',
  rating: 4.6,
  href: '/stores/fashion-district'
};

const App: FC = () => {
  return (
    <div className="text-gray-800 font-sans">
      <Header />
      <Hero/>
      <main className="max-w-7xl mx-auto py-4">
        <CategoryGrid />
        <ProductSection title="Women" products={womenProducts} store={sampleStore} />
      </main>
    </div>
  );
};

export default App;