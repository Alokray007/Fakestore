import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../services/axios';
import MockAdapter from 'axios-mock-adapter';
import Category from './Categories';
import { CategoryFilterProps } from '../../types/Products';

const mockAxios = new MockAdapter(axios)
const mockCategories = ['Electronics', 'Jewelery', 'Men\'s clothing', 'Women\'s clothing'];
const mockOnCategoryClick = jest.fn();

const renderComponent = () => {
    const props: CategoryFilterProps = {onCategoryClick: mockOnCategoryClick};
    render(<Category {...props} />);
};

describe('Categories Component', () => {
    beforeEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    test('fetches and displays categories correctly', async() => {
        mockAxios.onGet('/products/categories').reply(200, mockCategories);

        renderComponent();

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            mockCategories.forEach(category => {
                expect(screen.getByText(category)).toBeInTheDocument();
            });
        });
    });
});
