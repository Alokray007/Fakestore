import { render, screen } from "@testing-library/react";
import Sort from "./Sort";
import { SortProps } from "../../types/Products";

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
        expect(screen.getByRole('combobox', {name : /Sort By/i})).toBeInTheDocument();
    });

});
