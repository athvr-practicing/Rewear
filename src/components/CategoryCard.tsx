import type { FC } from 'react';
import { type Category } from './CategoryGrid';

interface CategoryCardProps {
    category: Category;
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
    return (
        <div data-testid="FeedCard" className="px-[6px] md:px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div>
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
                                    className="z-0 size-full object-cover" 
                                    alt={category.name} 
                                    src={category.image}
                                    style={{ backgroundSize: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default CategoryCard;