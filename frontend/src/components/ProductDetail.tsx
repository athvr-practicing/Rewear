import { type FC, useState, useEffect } from 'react';
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

interface RealItem {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  type: string;
  size: string;
  condition: string;
  imageUrl?: string;
  pointsRequired: number;
  swapPreference: string;
  status: string;
  createdAt: string;
  uploader: {
    _id: string;
    name: string;
    email: string;
    pastListings: RealItem[];
  };
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
  const [realItem, setRealItem] = useState<RealItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Try to find in mock products first (for backward compatibility)
  const mockProduct = products.find((p) => p.id === productId);

  // Fetch real item data from backend
  useEffect(() => {
    if (productId && !mockProduct) {
      fetchRealItem(productId);
    } else {
      setLoading(false);
    }
  }, [productId, mockProduct]);

  const fetchRealItem = async (itemId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching real item with ID:', itemId);
      
      const response = await fetch(`http://localhost:4000/api/items/${itemId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Fetched real item:', data);
        if (data.success) {
          // Backend returns { success: true, data: { item: {...}, uploader: {...} } }
          const itemData = {
            ...data.data.item,
            uploader: data.data.uploader
          };
          setRealItem(itemData);
        } else {
          setError('Item not found');
        }
      } else {
        console.error('❌ Failed to fetch real item:', response.status);
        setError('Failed to fetch item');
      }
    } catch (error) {
      console.error('❌ Error fetching real item:', error);
      setError('Error loading item');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading item</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!mockProduct && !realItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Use real item data if available, otherwise use mock product
  const displayItem = realItem || mockProduct;
  const isRealItem = !!realItem;

  const isFavorite = favorites.includes(isRealItem ? realItem._id : mockProduct!.id);
  const userProducts = isRealItem 
    ? realItem.uploader.pastListings || []
    : products.filter(p => p.userName === mockProduct!.userName && p.id !== mockProduct!.id);

  const handleFavoriteToggle = () => {
    onFavoriteToggle(isRealItem ? realItem._id : mockProduct!.id);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: isRealItem ? realItem._id : mockProduct!.id,
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
              src={isRealItem ? realItem.imageUrl : (mockProduct!.images?.[selectedImageIndex] || mockProduct!.image)}
              alt={isRealItem ? realItem.title : mockProduct!.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {!isRealItem && mockProduct!.images && mockProduct!.images.length > 1 && (
            <div className="grid grid-cols-6 gap-2">
              {mockProduct!.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border ${
                    selectedImageIndex === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct!.name} ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <a 
              href={`/profile/${isRealItem ? realItem.uploader.name : mockProduct!.userName}`}
              className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {isRealItem ? realItem.uploader.name.charAt(0).toUpperCase() : mockProduct!.userName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium">
                @{isRealItem ? realItem.uploader.name : mockProduct!.userName}
              </span>
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

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isRealItem ? realItem.title : mockProduct!.name}
            </h1>
            {isRealItem && (
              <p className="text-gray-600 mt-1">{realItem.category.name}</p>
            )}
            {!isRealItem && mockProduct!.brand && (
              <p className="text-gray-600 mt-1">{mockProduct!.brand.name}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isRealItem ? (
              <span className="text-xl font-bold text-black">{realItem.pointsRequired} points</span>
            ) : (
              <>
                <span className="text-xl font-bold text-black">${mockProduct!.price?.toFixed(2)}</span>
                {mockProduct!.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${mockProduct!.originalPrice.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>

          {isRealItem && (
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  <span className="font-medium">Size:</span> {realItem.size}
                </span>
                <span className="text-sm text-gray-600">
                  <span className="font-medium">Condition:</span> {realItem.condition}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {realItem.type}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Swap Preference:</span> {realItem.swapPreference}
              </div>
            </div>
          )}

          {!isRealItem && mockProduct!.sizes && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {mockProduct!.sizes.map((size) => (
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
              {isRealItem ? `Get for ${realItem.pointsRequired} points` : 'Purchase with Rewards'}
            </button>
            <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">
              Swap with your closet
            </button>
          </div>

          {isRealItem && realItem.description && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-700">{realItem.description}</p>
            </div>
          )}

          {!isRealItem && mockProduct!.features && mockProduct!.features.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {mockProduct!.features.map((feature, index) => (
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
            title={`More from @${isRealItem ? realItem.uploader.name : mockProduct!.userName}'s closet`}
            products={isRealItem ? 
              // Convert real items to Product format for display
              realItem.uploader.pastListings.map(item => ({
                id: item._id,
                name: item.title,
                image: item.imageUrl || '',
                price: item.pointsRequired,
                href: `/products/${item._id}`,
                userName: realItem.uploader.name,
                rating: 4.5 // Default rating
              })) : 
              userProducts
            }
            favorites={favorites}
            onFavoriteToggle={onFavoriteToggle}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;