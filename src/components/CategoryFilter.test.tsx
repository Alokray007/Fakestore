import { render, screen, waitFor } from '@testing-library/react';
import axios from '../services/axios';
import MockAdapter from 'axios-mock-adapter';
import CategoryFilter from './CategoryFilter';
import userEvent from '@testing-library/user-event';

// Mock axios
const mockAxios = new MockAdapter(axios);

const mockCategories = ['Electronics', 'Jewelery', 'Men\'s clothing', 'Women\'s clothing'];

describe('CategoryFilter Component', () => {
    beforeEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    test('fetches and displays categories correctly', async() => {
        mockAxios.onGet('/products/categories').reply(200, mockCategories);
        render(<CategoryFilter onCategoryChange={jest.fn()}/>);

        await waitFor(() => {
            mockCategories.forEach(category => {
              expect(screen.getByText(category)).toBeInTheDocument();
            });
        });
    });

    test('displays error message on fetch failure', async () => {
        mockAxios.onGet('/products/categories').reply(500);
        render(<CategoryFilter onCategoryChange={jest.fn()}/>);

        await waitFor(() => {
          expect(screen.getByText(/Request failed with status code/i)).toBeInTheDocument();
        });
    });

    



});
