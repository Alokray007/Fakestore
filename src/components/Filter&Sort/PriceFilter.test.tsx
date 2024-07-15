import { render, screen } from "@testing-library/react";
import { PriceFilterProps } from "../../types/Products";
import { Pdct } from "../../types/Products";
import PriceFilter from "./PriceFilter";
import userEvent from "@testing-library/user-event";

const mockFinalFilter:Pdct[] = [
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
    }
]
const mockHandleResetPrice = jest.fn();
const mockHandleMaxPrice = jest.fn();
const mockHandleMinPrice = jest.fn();

const defaultProps: PriceFilterProps = {
    FinalFilter: mockFinalFilter,
    handleResetPrice: mockHandleResetPrice,
    handleMinPriceChange: mockHandleMinPrice,
    handleMaxPriceChange: mockHandleMaxPrice,
    minPrice: 0,
    maxPrice: 300,
};

const renderComponent = (props = defaultProps) => {
    render(<PriceFilter {...props} />);
}

describe('PriceFilter Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all components correctly' ,() => {
        renderComponent();
        expect(screen.getByText("Price")).toBeInTheDocument();
        expect(screen.getByText(/The highest price is/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        const inputs = screen.getAllByRole('spinbutton')
        inputs.forEach(input => {
            expect(input).toBeInTheDocument();
        });
    });

    test('displays the correct highest price', () => {
        renderComponent();
        const highestPrice = Math.max(...mockFinalFilter.map((product) => product.price))
        expect(screen.getByText(`The highest price is $${highestPrice}`)).toBeInTheDocument();
    });

    test('calls handleResetPrice when reset button is clicked', async() => {
        renderComponent();
        const resetButton = screen.getByRole('button', { name: /Reset/i });

        const user = userEvent.setup();
        await user.click(resetButton);

        expect(mockHandleResetPrice).toHaveBeenCalled();
    });

    test('calls mockHandleMinPrice when From input box value changes', async() => {
        renderComponent();
        const fromInput = screen.getByPlaceholderText(/From/i);

        const user = userEvent.setup();
        await user.type(fromInput, '100');

        expect(mockHandleMinPrice).toHaveBeenCalled();
    });
});
