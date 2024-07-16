import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Product from "./Product";
import { Pdct } from "@/types/Products";
// import {toast} from 'react-toastify'

// Mock toast
jest.mock("react-toastify", () => ({
    toast: {
      success: jest.fn(),
    },
}));

const mockProducts: Pdct[] = [
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


describe('Product Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('renders spinner when no products are available', () => {
        render(
        <Router>
            <Product search="" products={[]} />
            </Router>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('filters products based on search input', () => {
        render(
            <Router>
                <Product search="Product 1" products={mockProducts} />
            </Router>
        );
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Product 2')).toBeNull();
    });


});
