import { render, screen } from "@testing-library/react"
import Search from "./Search"
import userEvent from "@testing-library/user-event"


describe('SearchInput Component', () => {
    test('render search input and icon', () => {
        render(<Search handleSearch={jest.fn()} />)

        const input = screen.getByPlaceholderText('Search');
        expect(input).toBeInTheDocument();

        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();
    })

    test('calls handleSearch on input change', async () => {
        userEvent.setup();
        const mockHandleSearch = jest.fn();
        render(<Search handleSearch={mockHandleSearch} />)

        const input = screen.getByPlaceholderText('Search');
        await userEvent.type(input, 'test');

        expect(mockHandleSearch).toHaveBeenCalled();
        expect(mockHandleSearch).toHaveBeenCalledTimes(4); // 't', 'e', 's', 't'
    })
})
