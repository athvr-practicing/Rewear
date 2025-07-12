import { type FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Product } from '../types';

interface UserData {
  _id: string;
  name: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  points: number;
  location?: string;
}

interface UserItem {
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
  };
}

interface UserProfileProps {
  products: Product[];
  favorites: Array<string | number>;
  onFavoriteToggle: (productId: string | number) => void;
  currentUser?: string;
}

interface ListingFormData {
  title: string;
  description: string;
  category: string;
  type: 'men' | 'women' | 'unisex' | 'kids' | '';
  size: string;
  condition: 'new' | 'like new' | 'good' | 'fair' | 'poor' | '';
  pointsRequired: number;
  swapPreference: 'points' | 'swap' | 'both';
  image: File | null;
}

const ListingModal: FC<{ isOpen: boolean; onClose: () => void; onSubmit: (data: ListingFormData) => void }> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    pointsRequired: 0,
    swapPreference: 'both',
    image: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/categories', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        size: '',
        condition: '',
        pointsRequired: 0,
        swapPreference: 'both',
        image: null
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">List New Item</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Photo *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Upload Photo
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Vintage Leather Jacket"
              />
              <p className="text-sm text-gray-500 mt-1">{formData.title.length}/100 characters</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                maxLength={500}
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your item's style, fit, and any special features..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="unisex">Unisex</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>

            {/* Size and Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <select
                  required
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            {/* Points and Swap Preference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points Required
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.pointsRequired}
                  onChange={(e) => setFormData(prev => ({ ...prev, pointsRequired: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Swap Preference
                </label>
                <select
                  value={formData.swapPreference}
                  onChange={(e) => setFormData(prev => ({ ...prev, swapPreference: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="both">Both Points & Swap</option>
                  <option value="points">Points Only</option>
                  <option value="swap">Swap Only</option>
                </select>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Listing...' : 'List Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UserProfile: FC<UserProfileProps> = ({ 
  products, 
  favorites, 
  onFavoriteToggle,
  currentUser 
}) => {
  const { username } = useParams<{ username: string }>();
  const { user: currentAuthUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userItems, setUserItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch user items when component mounts or username changes
  useEffect(() => {
    if (username) {
      fetchUserItems();
    }
  }, [username]);

  const fetchUserItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Fetching items for user:', username);
      console.log('🔍 Current authenticated user:', currentAuthUser?.name);
      console.log('🔍 Is own profile:', isOwnProfile);
      
      // Use backend filtering by uploader name for better performance
      const url = new URL('http://localhost:4000/api/items');
      url.searchParams.append('uploaderName', username || '');
      url.searchParams.append('status', 'available');
      
      console.log('🔍 Fetching from URL:', url.toString());
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Fetched items response:', data);
        if (data.success) {
          setUserItems(data.data);
          console.log('✅ Set user items:', data.data.length, 'items');
        }
      } else {
        console.error('❌ Failed to fetch user items:', response.status, response.statusText);
        setError('Failed to fetch user items');
      }
    } catch (error) {
      console.error('❌ Error fetching user items:', error);
      setError('Error loading user items');
    } finally {
      setLoading(false);
    }
  };

  const handleListingSubmit = async (data: ListingFormData) => {
    try {
      setError(null);
      
      // Create the item first
      const itemData = {
        title: data.title,
        description: data.description,
        category: data.category,
        type: data.type,
        size: data.size,
        condition: data.condition,
        pointsRequired: data.pointsRequired,
        swapPreference: data.swapPreference,
      };

      const response = await fetch('http://localhost:4000/api/upload/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create listing');
      }

      const result = await response.json();
      
      if (result.success) {
        // Upload image to S3 if provided
        if (data.image && result.data.uploadUrl) {
          await uploadImageToS3(data.image, result.data.uploadUrl);
        }
        
        // Show success notification
        setNotification({ type: 'success', message: 'Item listed successfully!' });
        
        // Refresh user items to show the new listing
        await fetchUserItems();
        
        // Auto-hide notification after 5 seconds
        setTimeout(() => setNotification(null), 5000);
      } else {
        throw new Error(result.message || 'Failed to create listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      setNotification({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Error creating listing. Please try again.' 
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const uploadImageToS3 = async (file: File, uploadUrl: string) => {
    try {
      console.log('🔧 Uploading image to S3...');
      console.log('🔧 File name:', file.name);
      console.log('🔧 File type:', file.type);
      console.log('🔧 File size:', file.size, 'bytes');
      console.log('🔧 Upload URL preview:', uploadUrl.substring(0, 100) + '...');
      
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      console.log('🔧 Upload response status:', uploadResponse.status);
      console.log('🔧 Upload response headers:', Object.fromEntries(uploadResponse.headers.entries()));

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('❌ Upload failed with response:', errorText);
        throw new Error(`Failed to upload image: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }
      
      console.log('✅ Image uploaded successfully to S3');
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      throw error;
    }
  };

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

  const isOwnProfile = currentAuthUser?.name === username;

  return (
    <div className="bg-white min-h-screen">
      {/* Success/Error Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-gray-800">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              @{username}
            </h1>
            <p className="text-blue-100 mb-6">
              {userItems.length} {userItems.length === 1 ? 'item' : 'items'} in closet
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                {isOwnProfile ? 'Edit Profile' : 'Follow'}
              </button>
              {isOwnProfile && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  Add New Item
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Closet Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
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

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading closet...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading closet</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchUserItems}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : userItems.length === 0 ? (
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Add Items
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {userItems.map((item) => (
              <div key={item._id} className="group relative">
                <a href={`/products/${item._id}`} className="block">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3 relative">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => console.log('✅ Image loaded successfully:', item.title)}
                        onError={(e) => {
                          console.error('❌ Image failed to load:', item.title);
                          console.error('❌ Image URL:', item.imageUrl);
                          console.error('❌ Error event:', e);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        {(() => {
                          console.log('🔧 No image URL for item:', item.title, 'imageUrl:', item.imageUrl);
                          return null;
                        })()}
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="text-xs text-gray-500 mt-2">
                          No Image
                        </div>
                      </div>
                    )}
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onFavoriteToggle(item._id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={favorites.includes(item._id) ? "red" : "none"} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="text-gray-700" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M10.7966 4.30255L11.9999 5.53674L13.2034 4.30255C15.3006 2.15177 18.6827 2.1219 20.8156 4.21294L20.905 4.30255C23.0021 6.45334 23.0313 9.92188 20.9923 12.1093L20.905 12.2009L12 21.3334L3.09505 12.2009C0.968317 10.0199 0.968317 6.48363 3.09505 4.30255C5.22178 2.12148 8.6699 2.12148 10.7966 4.30255Z" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">
                        {item.pointsRequired} pts
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Size {item.size}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 capitalize">
                      {item.condition} • {item.category.name}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Listing Modal */}
      <ListingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleListingSubmit}
      />
    </div>
  );
};

export default UserProfile; 