import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import MockAdapter from 'axios-mock-adapter';
import ProductDetails from './ProductDetails';
import { Pdct } from '../../types/Products';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock useParams to return the id
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
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
  const mockAxios = new MockAdapter(axios);

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

});
