import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';

interface UserProfileProps {
  products: Product[];
  favorites: Array<string | number>;
  onFavoriteToggle: (productId: string | number) => void;
  currentUser?: string;
}

const UserProfile: FC<UserProfileProps> = ({ 
  products, 
  favorites, 
  onFavoriteToggle,
  currentUser 
}) => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
          <p className="text-gray-600">The user profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const userListings = products.filter(p => p.userName === username);
  const isOwnProfile = currentUser === username;

  return (
    <div className="bg-white min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-gray-800">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              @{username}
            </h1>
            <p className="text-gray-600 mb-6">
              {userListings.length} {userListings.length === 1 ? 'item' : 'items'} in closet
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                {isOwnProfile ? 'Edit Profile' : 'Follow'}
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Closet Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isOwnProfile ? 'My Closet' : `${username}'s Closet`}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              Filter
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Sort
            </button>
          </div>
        </div>

        {userListings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isOwnProfile ? 'Your closet is empty' : 'No items in closet'}
            </h3>
            <p className="text-gray-600">
              {isOwnProfile 
                ? 'Start adding items to your closet to share with the community.' 
                : 'This user hasn\'t listed any items yet.'
              }
            </p>
            {isOwnProfile && (
              <button className="mt-4 bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Add Items
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {userListings.map((product) => (
              <div key={product.id} className="group relative">
                <a href={product.href} className="block">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onFavoriteToggle(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={favorites.includes(product.id) ? "red" : "none"} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="text-gray-700" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M10.7966 4.30255L11.9999 5.53674L13.2034 4.30255C15.3006 2.15177 18.6827 2.1219 20.8156 4.21294L20.905 4.30255C23.0021 6.45334 23.0313 9.92188 20.9923 12.1093L20.905 12.2009L12 21.3334L3.09505 12.2009C0.968317 10.0199 0.968317 6.48363 3.09505 4.30255C5.22178 2.12148 8.6699 2.12148 10.7966 4.30255Z" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">
                        ${product.price?.toFixed(2)}
                      </p>
                      {product.sizes && product.sizes.length > 0 && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Size {product.sizes[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 