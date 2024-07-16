import { render, screen } from "@testing-library/react";
import Sort from "./Sort";
import { SortProps } from "../../types/Products";
import userEvent from "@testing-library/user-event";

const mockHandleSortChange = jest.fn();

const renderComponent = () => {
    const props : SortProps  = {handleSortChange: mockHandleSortChange};
    render(<Sort {...props}/>);
};

describe('Sort Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        renderComponent();
    });

    test('renders all components correctly', () => {
        expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /sort by/i })).toBeInTheDocument();
    });

    test('should correctly set default option', () => {
        expect((screen.getByRole('option', { name: 'Sort By' })as HTMLOptionElement).selected).toBe(true)
    })

    test('should display the correct number of options', () => {
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(8);
    });

    test ('should allow user to change Sort filter', async() => {
        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', { name: /sort by/i });

        expect((screen.getByRole('option', { name: 'Sort By' }) as HTMLOptionElement).selected).toBe(true);

        await user.selectOptions(dropdown, 'Price: High to Low');

        expect((screen.getByRole('option', { name: 'Price: High to Low' }) as HTMLOptionElement).selected).toBe(true);
    });


});
