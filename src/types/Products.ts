interface Pdct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };

}

// Define the props interface for the ProductList component
interface ProductListProps {
  products: Pdct[];
}

interface ProductSearchListProps {
  products: Pdct[];
  search: string | number ;
}

interface handleSearchProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RatingStarsProps {
  rating: number;
}

interface CategoryFilterProps {
  onCategoryClick: (category: string) => void;
}

interface CategoriesFilterProps {
  onCategoryChange: (category: string) => void;
}

interface PriceFilterProps {
  FinalFilter: Pdct[];
  handleResetPrice: () => void;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minPrice: string | number;
  maxPrice: string | number;
}

interface RateFilterProps {
  selectedRatings: {
    fourStar: boolean;
    threeStar: boolean;
    twoStar: boolean;
    oneStar: boolean;
  };
  handleResetRating: () => void;
  handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SortProps {
  handleSortChange : (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type { Pdct, ProductListProps, ProductSearchListProps, handleSearchProps, RatingStarsProps, CategoryFilterProps, CategoriesFilterProps, PriceFilterProps, SortProps, RateFilterProps };
