import type { FC } from 'react';
import CategoryCard from './CategoryCard';

export interface Category {
    id: string;
    name: string;
    image: string;
    href: string;
}

const categories: Category[] = [
    { 
        id: '1', 
        name: 'Women', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/1_women.png?format=webp',
        href: '/categories/1/women'
    },
    { 
        id: '2', 
        name: 'Men', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/2_men.png?format=webp',
        href: '/categories/2/men'
    },
    { 
        id: '3', 
        name: 'Beauty', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/5_beauty.png?format=webp',
        href: '/categories/5/beauty'
    },
    { 
        id: '4', 
        name: 'Food & drinks', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/251_food_drinks.png?format=webp',
        href: '/categories/251/food-drinks'
    },
    { 
        id: '5', 
        name: 'Baby & toddler', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/209_baby_toddler.png?format=webp',
        href: '/categories/209/baby-toddler'
    },
    { 
        id: '6', 
        name: 'Home', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/6_home.png?format=webp',
        href: '/categories/6/home'
    },
    { 
        id: '7', 
        name: 'Fitness & nutrition', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/69_fitness_nutrition.png?format=webp',
        href: '/categories/69/fitness-nutrition'
    },
    { 
        id: '8', 
        name: 'Accessories', 
        image: 'https://cdn.shopify.com/shop-assets/static_uploads/shop-categories/3_accessories.png?format=webp',
        href: '/categories/3/accessories'
    },
];

const CategoryGrid: FC = () => {
    return (
        <div data-testid="feed-section">
            <div>
                <div data-testid="feed-section-container" className="relative flex flex-col mb-9 md:mb-12">
                    <div data-testid="feed-section-container-content">
                        <div className="mx-[-6px] px-4 md:-mx-2" style={{"--consistent-card-text-height": "0px"} as React.CSSProperties}>
                            <div className="flex flex-wrap gap-y-3 md:gap-y-4 justify-center">
                                {categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </div>
                        {/* <div data-testid="pagination-footer" className="mt-5 flex w-full justify-center">
                            <button className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-base font-medium rounded-xl px-3 py-3 transition active:scale-[0.99] relative">
                                <span>More</span>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryGrid;