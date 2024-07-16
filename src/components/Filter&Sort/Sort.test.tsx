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
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('should correctly set default option', () => {
        const defaultOption = screen.getAllByRole('option');
        expect(defaultOption[0]).toHaveTextContent('Sort By');
    })

    test('should display the correct number of options', () => {
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(8);
    });

});
