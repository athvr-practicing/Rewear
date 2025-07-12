import type { FC, MouseEvent } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
    isFavorite: boolean;
    onFavoriteToggle: (productId: string | number) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, isFavorite, onFavoriteToggle }) => {
    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteToggle(product.id);
    };

    const availableSize = product.sizes?.[0];

    return (
        <div data-testid="FeedCard" className="px-[6px] md:px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <div className="group flex flex-col gap-2" data-testid="product-card">
                <div className="relative" aria-labelledby={`product-card-image-${product.id}`}>
                    <a
                        id={`product-card-image-${product.id}`}
                        data-testid="product-link-test-id"
                        aria-label={product.name}
                        href={product.href}
                        data-discover="true"
                    >
                        <div
                            data-testid="product-card-image"
                            className="relative aspect-square overflow-hidden bg-gray-100 rounded-2xl"
                        >
                            <img
                                data-testid="image"
                                className="w-full h-full object-cover transition group-hover:scale-105"
                                alt={product.name}
                                src={product.image}
                            />
                        </div>
                    </a>

                    <div className="absolute bottom-3 right-3 z-10">
                        <button
                            type="button"
                            className="rounded-full transition relative flex items-center justify-center active:scale-[0.96] p-2 bg-black bg-opacity-50 stroke-white text-white backdrop-blur-xl hover:bg-opacity-70 focus-visible:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2"
                            aria-label="Add to saved items"
                            data-testid="favorite-overlay-item"
                            onClick={handleFavoriteClick}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} xmlns="http://www.w3.org/2000/svg" className="text-white" data-testid="icon-favorites" stroke="currentColor" strokeWidth="2">
                                <path d="M10.7966 4.30255L11.9999 5.53674L13.2034 4.30255C15.3006 2.15177 18.6827 2.1219 20.8156 4.21294L20.905 4.30255C23.0021 6.45334 23.0313 9.92188 20.9923 12.1093L20.905 12.2009L12 21.3334L3.09505 12.2009C0.968317 10.0199 0.968317 6.48363 3.09505 4.30255C5.22178 2.12148 8.6699 2.12148 10.7966 4.30255Z" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <a
                    data-testid="product-link-test-id"
                    className="flex flex-col gap-2 leading-4"
                    aria-label={product.name}
                    href={product.href}
                    data-discover="true"
                >
                    <div className="_FeedCardText_q8s4i_1">
                        <h3 className="font-medium text-sm line-clamp-2 text-black" data-testid="product-title">
                            {product.name}
                        </h3>
                        
                        {product.userName && (
                            <div className="mt-1">
                                <a 
                                    href={`/profile/${product.userName}`}
                                    className="text-gray-600 text-xs hover:text-gray-800 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    from {product.userName}'s closet
                                </a>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-1">
                            {product.price != null && (
                                <div data-testid="product-card-price">
                                    <span className="text-black font-bold text-sm" data-testid="salePrice">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            )}
                            
                            {availableSize && (
                                <div className="text-xs text-gray-500">
                                    Size {availableSize}
                                </div>
                            )}
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ProductCard;