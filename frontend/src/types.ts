export interface Brand {
    name: string;
    logo: string;
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

export interface Category {
    id: string;
    name: string;
    image: string;
    href: string;
}

export interface Product {
    id: string | number;
    name: string;
    href: string;
    image: string;
    price?: number;
    brand?: Brand;
    rating?: number;
    originalPrice?: number;
    description?: string;
    sizes?: string[];
    colors?: string[];
    images?: string[];
    features?: string[];
    userName?: string;
} 