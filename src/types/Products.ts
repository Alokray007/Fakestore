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
  }
}

// Define the props interface for the ProductList component
interface ProductListProps {
  products: Pdct[];
}

interface RatingStarsProps {
  rating: number;
}

export type { Pdct, ProductListProps, RatingStarsProps };
