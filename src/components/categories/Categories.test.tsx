import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../services/axios';
import MockAdapter from 'axios-mock-adapter';
import Category from './Categories';
import { CategoryFilterProps } from '../../types/Products';
import userEvent from '@testing-library/user-event';

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

    test('handles errors properly', async() => {
        mockAxios.onGet('/products/categories').reply(500);

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('Request failed with status code 500')).toBeInTheDocument();
        });
    });

    test('calls onCategoryClick with the correct category', async() => {
        mockAxios.onGet('/products/categories').reply(200, mockCategories)

        renderComponent();

        const user = userEvent.setup();

        await waitFor(() => {
            mockCategories.forEach(category => {
                expect(screen.getByText(category)).toBeInTheDocument();
            });
        });

        const caterogyItem = screen.getByText(mockCategories[0]);
        await user.click(caterogyItem);
        expect(mockOnCategoryClick).toHaveBeenCalledWith(mockCategories[0]);
    });

    
});
