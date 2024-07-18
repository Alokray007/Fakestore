import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import MockAdapter from 'axios-mock-adapter';
import ProductDetails from './ProductDetails';
import { Pdct } from '../../types/Products';
import userEvent from '@testing-library/user-event';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
const mockAxios = new MockAdapter(axios);

// Mock useParams to return the id
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

const mockProduct: Pdct = {
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
};

const renderComponent = () =>
  render(
    <Router>
      <ProductDetails />
    </Router>
);

describe('ProductDetails Page', () => {


  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
    localStorage.clear();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  test('renders spinner when no products are available', () => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })

  test('fetches and displays product details correctly', async () => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);

    renderComponent();

    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
      expect(screen.getByText(`${mockProduct.rating.rate}`)).toBeInTheDocument();
      expect(screen.getByText(`(${mockProduct.rating.count} reviews)`)).toBeInTheDocument();
    });
  });

  test('handles error Properly', async() => {
    mockAxios.onGet('/products/1').reply(500);
    renderComponent();

    await waitFor(() => {
        expect(screen.getByText('Request failed with status code 500')).toBeInTheDocument()
    });
  });

  test('adds product to the cart', async() => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByText('Add to Cart'));

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(mockProduct.id);
    expect(cart[0].quantity).toBe(1);

    expect(toast.success).toHaveBeenCalledWith('Product Added to cart');
  });

  test('navigates to cart on "Buy Now" click', async() => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByText('Buy Now'));

    await waitFor(() =>{
        expect(toast.success).toHaveBeenCalledWith("Product Added to cart");
        expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(mockProduct.id);
    expect(cart[0].quantity).toBe(1);
  });

});
