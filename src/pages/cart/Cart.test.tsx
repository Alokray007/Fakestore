import Cart from "./Cart";
import { CartPdct } from "@/types/Products";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import { toast } from 'react-toastify';

// Mock toast
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
    },
}));

const mockCart: CartPdct[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      category: 'Category 1',
      quantity: 2,
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
      quantity: 1,
      description: 'Description 2',
      image: 'image2.jpg',
      rating: {
        rate: 4.0,
        count: 20,
      },
    },
];

describe('Cart Page', () => {
    beforeEach(() => {
        localStorage.setItem('cart', JSON.stringify(mockCart));
      });

      afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
      });

      test('renders empty cart message when no items are in the cart', () => {
        localStorage.setItem('cart', '[]');

        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        expect(screen.getByText('Cart is Empty')).toBeInTheDocument();
      });
});
