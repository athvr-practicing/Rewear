import type { FC } from 'react';
import type { Category } from '../types';

interface CategoryGridProps {
    categories: Category[];
}

const CategoryGrid: FC<CategoryGridProps> = ({ categories }) => {
    return (
        <div data-testid="feed-section">
            <div data-testid="feed-section-container" className="relative flex flex-col mb-9 md:mb-12">
                <div data-testid="feed-section-container-content">
                    <div className="mx-[-6px] px-4 md:-mx-2" style={{"--consistent-card-text-height": "0px"} as React.CSSProperties}>
                        <div className="flex flex-wrap gap-y-3 md:gap-y-4 justify-center">
                            {categories.map((category) => (
                                <div key={category.id} data-testid="FeedCard" className="px-[6px] md:px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4">
                                    <a data-testid="url-link" href={category.href} data-discover="true">
                                        <div className="flex h-[72px] overflow-hidden rounded-2xl border border-solid border-gray-200 md:h-[84px] lg:h-[100px] xl:h-[112px]" data-testid="tile">
                                            <div className="group relative flex flex-1">
                                                <div className="absolute inset-0 z-10 flex items-center justify-center p-2 text-center">
                                                    <p className="text-sm font-semibold text-white md:hidden">
                                                        {category.name}
                                                    </p>
                                                    <p className="text-lg font-semibold hidden text-white md:block">
                                                        {category.name}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 bg-gray-100"></div>
                                                <div className="absolute inset-0 transition-transform group-hover:scale-105">
                                                    <img 
                                                        data-testid="image" 
                                                        className="w-full h-full object-cover" 
                                                        alt={category.name} 
                                                        src={category.image}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryGrid;