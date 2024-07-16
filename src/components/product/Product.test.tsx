import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Product from "./Product";
import { Pdct } from "@/types/Products";
import userEvent from "@testing-library/user-event";
import {toast} from 'react-toastify'

// Mock toast
jest.mock("react-toastify", () => ({
    toast: {
      success: jest.fn(),
    },
}));

const mockHandleCart = jest.fn();

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

    test('display all products when search is empty', () => {
        render(
            <Router>
                <Product search="" products={mockProducts} />
            </Router>
        );
        const products = screen.getAllByText(/product/i)
        products.forEach(product => {
            expect(product).toBeInTheDocument();
        });
    });

    test('adds product to cart and shows success toast', async() => {
        render(
            <Router>
                <Product search="" products={mockProducts} />
            </Router>
        );
        const addButton = screen.getAllByRole("button", {name : /Add to Cart/i})[0];
        const user = userEvent.setup();
        await user.click(addButton);

        await waitFor(() => {
            expect(localStorage.getItem('cart')).toContain(JSON.stringify({...mockProducts[0], quantity: 1}));
            expect(toast.success).toHaveBeenCalledWith("Product Added to cart")
        });
    });


});
