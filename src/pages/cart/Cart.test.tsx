import Cart from "./Cart";
import { CartPdct } from "@/types/Products";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { toast } from 'react-toastify';

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
      price: 300,
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

    describe('Rendering the Cart' ,() => {
        test('renders empty cart message when no items are in the cart', () => {
            localStorage.setItem('cart', '[]');

            render(
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            );

            expect(screen.getByText('Cart is Empty')).toBeInTheDocument();
        });

        test('renders cart items correctly', () => {
            render(
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            );
            mockCart.forEach(item => {
                expect(screen.getByText(item.title)).toBeInTheDocument();
                expect(screen.getByAltText(item.title)).toHaveAttribute('src', item.image);
            })
        });
    });

    describe('Cart Operations', () => {
        test('increases quantity of cart item', async() => {
            render(
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            );
            const incrementButton = screen.getAllByLabelText('incrementBtn')[0];
            const user = userEvent.setup();
            await user.click(incrementButton);

            await waitFor(() => {
                expect(screen.getAllByLabelText('cartitem')[0]).toBeInTheDocument();
            });
            expect(localStorage.getItem('cart')).toContain(JSON.stringify({ ...mockCart[0], quantity: 3 }));
        });

        test('decreases quantity of cart item', async() => {
            render(
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            );
            const decrementButton = screen.getAllByLabelText('decrementBtn')[0];
            const user = userEvent.setup();
            await user.click(decrementButton);

            await waitFor(() => {
                expect(screen.getAllByLabelText('cartitem')[0]).toBeInTheDocument();
            });
            expect(localStorage.getItem('cart')).toContain(JSON.stringify({ ...mockCart[0], quantity: 1 }));
        });

        test('does not decrease quantity below 1 and shows info toast', async() => {
            render(
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            );
            const decrementButton = screen.getAllByLabelText('decrementBtn')[0];
            const user = userEvent.setup();
            await user.dblClick(decrementButton);

            await waitFor(() => {
                expect(toast.info).toHaveBeenCalledWith('Remove item instead of decreasing!');
            });
            expect(localStorage.getItem('cart') || '[]').toContain(JSON.stringify({ ...mockCart[0], quantity: 1 }));
        })

    });
});
