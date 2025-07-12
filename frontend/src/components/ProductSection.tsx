import type { FC } from 'react';
import ProductCard from './ProductCard';

export interface Product {
    id: string;
    name: string;
    brand: {
        name: string;
        logo: string;
    };
    image: string;
    rating: number;
    href: string;
}

export interface Store {
    id: string;
    name: string;
    logo: string;
    wordmark?: string;
    heroMedia: string;
    rating: number;
    href: string;
}

interface ProductSectionProps {
    title: string;
    products: Product[];
    store?: Store; // Made optional to handle cases where no store is provided
}

const ProductSection: FC<ProductSectionProps> = ({ title, products, store }) => {
    // Default store fallback if none provided
    const defaultStore: Store = {
        id: 'default-store',
        name: 'Shop Collection',
        logo: '/images/default-store-logo.png',
        heroMedia: '/images/default-hero.jpg',
        rating: 4.5,
        href: '/stores/default'
    };

    const currentStore = store || defaultStore;

    return (
        <div data-testid="feed-section">
            <div>
                <div data-testid="feed-section-container" className="relative flex flex-col mb-9 md:mb-12">
                    <div data-testid="feed-section-container-content">
                        {/* Section Header */}
                        <div className="mb-4 md:mb-6">
                            <div className="flex w-full px-4 cursor-pointer">
                                <div className="flex w-full items-center justify-between">
                                    <a 
                                        id={title} 
                                        tabIndex={0} 
                                        data-testid={`section-header-${title}`} 
                                        aria-label={title} 
                                        href={`/categories/${title.toLowerCase()}`} 
                                        data-discover="true"
                                    >
                                        <div className="flex flex-1 items-center justify-between">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
                                                    <div 
                                                        data-testid="arrow-right-circle" 
                                                        className="flex aspect-square w-6 items-center justify-center overflow-hidden rounded-full bg-gray-100" 
                                                        aria-hidden="true"
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700" data-testid="icon-bold-right-chevron" stroke="none" style={{width: "20px", height: "20px"}}>
                                                            <path d="M10 16L14 12L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="mx-[-6px] px-4 md:-mx-2" style={{"--consistent-card-text-height": "0px"} as React.CSSProperties}>
                            <div className="flex flex-wrap gap-y-6 md:gap-y-9">
                                {products.map((product, index) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        store={currentStore}
                                        isFirst={index === 0}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
