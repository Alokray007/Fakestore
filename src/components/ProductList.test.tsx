import { ProductListProps } from "../types/Products";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "./ProductList";
import { render, screen } from "@testing-library/react";

const mockProducts: ProductListProps['products'] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      category: 'Category 1',
      description: 'Description 1',
      image: 'image1.jpg',
      rating: {
        rate: 4.5,
        count: 10,
      },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      category: 'Category 2',
      description: 'Description 2',
      image: 'image2.jpg',
      rating: {
        rate: 4.0,
        count: 20,
      },
    },
];

describe('ProductList Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders spinner when no products are available', () => {
        render(
        <Router>
            <ProductList products={[]} />
            </Router>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });


});
