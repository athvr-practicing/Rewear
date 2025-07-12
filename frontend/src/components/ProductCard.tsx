import { useState, type FC } from 'react';
import type { Product, Store } from './ProductSection';

interface ProductCardProps {
    product: Product;
    store: Store;
    isFirst?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, store, isFirst = false }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDots, setShowDots] = useState(false);

    // Mock additional product images for carousel effect
    const productImages = [product.image, product.image, product.image, product.image];

    return (
        <div data-testid="FeedCard" className="px-[6px] md:px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <div>
                <div className="flex flex-col gap-2" data-testid="product-focused-merchant-card">
                    {/* Product Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                        {/* Desktop Carousel */}
                        <div 
                            className="scrollbar-hide group relative size-full max-lg:hidden"
                            onMouseEnter={() => setShowDots(true)}
                            onMouseLeave={() => setShowDots(false)}
                        >
                            {/* Product Images */}
                            {productImages.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 transition-opacity z-10 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                                    data-testid="product-item"
                                >
                                    <div>
                                        <a 
                                            data-testid="product-link" 
                                            aria-label={`View ${product.name} details`} 
                                            href={product.href} 
                                            data-discover="true"
                                        >
                                            <div 
                                                data-testid="product-card-image" 
                                                role="presentation" 
                                                className="relative flex aspect-square flex-col items-center justify-center overflow-hidden bg-gray-100"
                                            >
                                                <img 
                                                    data-testid="image" 
                                                    className="size-full object-cover transition group-hover:scale-105" 
                                                    alt={product.name} 
                                                    src={image}
                                                    style={{backgroundSize: "cover"}}
                                                />
                                                <div 
                                                    className="absolute inset-0 bg-black bg-opacity-5" 
                                                    aria-label={`View ${product.name} details`}
                                                ></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}

                            {/* Store Bookend (for first product) */}
                            {isFirst && (
                                <div className="absolute inset-0 transition-opacity pointer-events-none opacity-0" data-testid="bookend-item">
                                    <div className="size-full max-lg:absolute max-lg:inset-0">
                                        <a 
                                            id={`Visit ${store.name} shop`} 
                                            tabIndex={0} 
                                            data-testid="bookend-link" 
                                            aria-label={`Visit ${store.name} shop`} 
                                            href={store.href} 
                                            data-discover="true"
                                        >
                                            <div 
                                                className="absolute inset-0 z-10 flex transform-gpu items-center justify-center transition-all duration-500 lg:-translate-y-s opacity-0" 
                                                data-testid="logo-container" 
                                                aria-label={`Visit ${store.name} shop`}
                                            >
                                                <img 
                                                    data-testid="store-data-wordmark" 
                                                    className="max-h-16 min-h-10 max-w-[60%] object-contain md:max-w-[140px]" 
                                                    alt={store.name} 
                                                    src={store.wordmark || store.logo}
                                                    style={{backgroundSize: "cover"}}
                                                />
                                                <div className="absolute bottom-8 z-10 hidden w-full transform-gpu justify-center pt-3 transition-all duration-700 lg:flex opacity-0" data-testid="visit-store">
                                                    <p className="text-sm font-medium text-white">Visit store</p>
                                                </div>
                                            </div>
                                            <div className="size-full">
                                                <div className="ml-auto flex h-full md:h-full lg:h-full transition-transform group-hover:scale-105" data-testid="store-media-background">
                                                    <div className="relative flex w-full md:overflow-hidden">
                                                        <img 
                                                            data-testid="image" 
                                                            className="absolute size-full object-cover" 
                                                            alt="" 
                                                            src={store.heroMedia}
                                                            style={{backgroundSize: "cover"}}
                                                        />
                                                        <div data-testid="store-media-scrim" className="absolute size-full transform-gpu bg-black bg-opacity-40"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="pointer-events-none absolute inset-y-0 left-4 z-20 flex items-center">
                                <button 
                                    type="button" 
                                    className="rounded-full relative flex items-center justify-center active:scale-[0.96] p-2 text-gray-700 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 pointer-events-auto bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-70" 
                                    aria-label="View previous product" 
                                    data-testid="prev-button"
                                    onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : productImages.length - 1)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" data-testid="icon-left-chevron" stroke="none" style={{width: "16px", height: "16px"}}>
                                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="pointer-events-none absolute inset-y-0 right-4 z-20 flex items-center">
                                <button 
                                    type="button" 
                                    className="rounded-full relative flex items-center justify-center active:scale-[0.96] p-2 text-gray-700 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 pointer-events-auto bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-70" 
                                    aria-label="View next product" 
                                    data-testid="next-button"
                                    onClick={() => setCurrentImageIndex(prev => prev < productImages.length - 1 ? prev + 1 : 0)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" data-testid="icon-right-chevron" stroke="none" style={{width: "16px", height: "16px"}}>
                                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Carousel */}
                        <div className="scrollbar-hide relative size-full lg:hidden snap-x snap-mandatory overflow-x-auto overflow-y-hidden whitespace-nowrap">
                            {productImages.map((image, index) => (
                                <div key={index} className="inline-block w-full snap-center">
                                    <div>
                                        <div>
                                            <a 
                                                data-testid="product-link" 
                                                aria-label={`View ${product.name} details`} 
                                                href={product.href} 
                                                data-discover="true"
                                            >
                                                <div 
                                                    data-testid="product-card-image" 
                                                    role="presentation" 
                                                    className="relative flex aspect-square flex-col items-center justify-center overflow-hidden bg-gray-100"
                                                >
                                                    <img 
                                                        data-testid="image" 
                                                        className="size-full object-cover transition group-hover:scale-105" 
                                                        alt={product.name} 
                                                        src={image}
                                                        style={{backgroundSize: "cover"}}
                                                    />
                                                    <div 
                                                        className="absolute inset-0 bg-black bg-opacity-5" 
                                                        aria-label={`View ${product.name} details`}
                                                    ></div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dots Indicator */}
                        {(showDots || window.innerWidth < 1024) && (
                            <div className="absolute bottom-4 z-10 flex w-full transform-gpu justify-center">
                                <div className="flex gap-1">
                                    {productImages.map((_, index) => (
                                        <div 
                                            key={index}
                                            className={`size-[6px] rounded-full transition-all ${
                                                index === currentImageIndex 
                                                    ? 'bg-white bg-opacity-75' 
                                                    : 'bg-white bg-opacity-40'
                                            }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Store Details */}
                    <a 
                        data-testid="store-details" 
                        aria-label={`View ${store.name} store details`} 
                        href={store.href} 
                        data-discover="true"
                    >
                        <div className="flex items-center gap-2 px-1">
                            <div className="relative flex items-center overflow-hidden w-8 h-8 rounded-lg" data-testid="merchant-logo-container">
                                <img 
                                    data-testid="merchant-logo" 
                                    className="object-contain" 
                                    alt="" 
                                    src={store.logo}
                                    style={{backgroundSize: "cover"}}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-5" aria-label="Shop logo image"></div>
                            </div>
                            <div className="flex max-w-[calc(100%-40px)] flex-1 justify-between max-lg:flex-col lg:items-center lg:gap-1">
                                <p className="text-sm font-medium line-clamp-2 break-words max-lg:hidden">{store.name}</p>
                                <p className="text-xs font-bold line-clamp-2 break-words lg:hidden" aria-label={store.name}>{store.name}</p>
                                <div className="hidden lg:block" data-testid="review-details" aria-label={`Rated ${store.rating} out of 5 stars`}>
                                    <button disabled className="flex" aria-label="Click to see all reviews">
                                        <p className="text-sm font-medium flex items-center gap-1 text-gray-700" aria-label={`Rated ${store.rating} out of 5 stars`}>
                                            {store.rating}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" data-testid="icon-star-filled" stroke="none" style={{width: "12px", height: "12px"}}>
                                                <path d="M12.9019 1.56798C12.7356 1.22088 12.3849 1 12 1C11.6152 1 11.2644 1.22088 11.0982 1.56798L8.45542 7.08482L2.36984 7.8839C1.98727 7.93413 1.66773 8.2 1.54875 8.56705C1.42978 8.93411 1.5326 9.33687 1.81297 9.60198L6.26237 13.8093L5.14555 19.8172C5.07514 20.196 5.22857 20.5815 5.53998 20.8083C5.85139 21.0351 6.2654 21.0629 6.60429 20.8797L12 17.9625L17.3958 20.8797C17.7347 21.0629 18.1487 21.0351 18.4601 20.8083C18.7715 20.5815 18.9249 20.196 18.8545 19.8172L17.7377 13.8093L22.1871 9.60198C22.4675 9.33687 22.5703 8.93411 22.4513 8.56705C22.3323 8.2 22.0128 7.93413 21.6302 7.8839L15.5446 7.08482L12.9019 1.56798Z" fill="currentColor"></path>
                                            </svg>
                                        </p>
                                    </button>
                                </div>
                                <div className="lg:hidden">
                                    <button disabled className="flex" aria-label="Click to see all reviews">
                                        <p className="text-xs font-bold flex items-center gap-1 text-gray-700" aria-label={`Rated ${store.rating} out of 5 stars`}>
                                            {store.rating}
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" data-testid="icon-star-filled" stroke="none" style={{width: "12px", height: "12px"}}>
                                                <path d="M12.9019 1.56798C12.7356 1.22088 12.3849 1 12 1C11.6152 1 11.2644 1.22088 11.0982 1.56798L8.45542 7.08482L2.36984 7.8839C1.98727 7.93413 1.66773 8.2 1.54875 8.56705C1.42978 8.93411 1.5326 9.33687 1.81297 9.60198L6.26237 13.8093L5.14555 19.8172C5.07514 20.196 5.22857 20.5815 5.53998 20.8083C5.85139 21.0351 6.2654 21.0629 6.60429 20.8797L12 17.9625L17.3958 20.8797C17.7347 21.0629 18.1487 21.0351 18.4601 20.8083C18.7715 20.5815 18.9249 20.196 18.8545 19.8172L17.7377 13.8093L22.1871 9.60198C22.4675 9.33687 22.5703 8.93411 22.4513 8.56705C22.3323 8.2 22.0128 7.93413 21.6302 7.8839L15.5446 7.08482L12.9019 1.56798Z" fill="currentColor"></path>
                                            </svg>
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;