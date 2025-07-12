import React, { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

// Sample product data
const PRODUCT_DATA: Product[] = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    href: "/product/1",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    price: 89.99,
    sizes: ['M', 'L'],
    userName: "fashionista_22"
  },
  {
    id: 2,
    name: "Designer Silk Scarf",
    href: "/product/2",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    price: 45.00,
    sizes: ['One Size'],
    userName: "luxury_finds"
  },
  {
    id: 3,
    name: "Classic Denim Jeans",
    href: "/product/3",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    price: 65.50,
    sizes: ['28', '30', '32'],
    userName: "denim_lover"
  },
  {
    id: 4,
    name: "Elegant Evening Dress",
    href: "/product/4",
    image: "https://images.unsplash.com/photo-1566479179817-c08cbf4d7c98?w=400&h=400&fit=crop",
    price: 120.00,
    sizes: ['S', 'M'],
    userName: "evening_glam"
  },
  // {
  //   id: 5,
  //   name: "Cozy Knit Sweater",
  //   href: "/product/5",
  //   image: "https://images.unsplash.com/photo-1586178393533-2b73d8be6c8a?w=400&h=400&fit=crop",
  //   price: 55.75,
  //   sizes: ['S', 'M', 'L'],
  //   userName: "cozy_closet"
  // },
  // {
  //   id: 6,
  //   name: "Statement Boots",
  //   href: "/product/6",
  //   image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop",
  //   price: 95.00,
  //   sizes: ['7', '8', '9'],
  //   userName: "shoe_collector"
  // },
];

const Hero: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());

  const handleFavoriteToggle = (productId: string | number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            A place to display your <span className="block">masterpiece.</span>
          </h1>
        </div>

        {/* Product display grid */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
            {PRODUCT_DATA.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                />
            ))}
        </div>

      
      </div>
    </section>
  );
};

export default Hero;