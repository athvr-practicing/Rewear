import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import ProductSection from './ProductSection';
import type { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
  favorites: Array<string | number>;
  onFavoriteToggle: (productId: string | number) => void;
  onAddToCart: (details: {
    productId: string | number;
    size: string;
    color: string;
    quantity: number;
  }) => void;
}

const ProductDetail: FC<ProductDetailProps> = ({
  products,
  favorites,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const userProducts = products.filter(p => p.userName === product.userName && p.id !== product.id);

  const handleFavoriteToggle = () => {
    onFavoriteToggle(product.id);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images?.[selectedImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-6 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border ${
                    selectedImageIndex === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {product.userName && (
            <div className="flex items-center justify-between">
              <a 
                href={`/profile/${product.userName}`}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {product.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium">@{product.userName}</span>
              </a>
              <button
                onClick={handleFavoriteToggle}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isFavorite ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            {product.brand && (
              <p className="text-gray-600 mt-1">{product.brand.name}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">${product.price?.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.sizes && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-0 text-sm rounded-md border ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Purchase with Rewards
            </button>
            <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">
              Swap with your closet
            </button>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-4 text-xs text-gray-600 pt-4">
            <span className="hover:underline cursor-pointer">Shipping Policy</span>
            <span className="hover:underline cursor-pointer">Refund Policy</span>
          </div>
        </div>
      </div>

      {userProducts.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-8">
          <ProductSection 
            title={`More from @${product.userName}'s closet`}
            products={userProducts}
            favorites={favorites}
            onFavoriteToggle={onFavoriteToggle}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;