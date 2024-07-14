import { render, screen } from "@testing-library/react"
import Search from "./Search"


describe('SearchInput Component', () => {
    beforeEach(() => {
        render(<Search handleSearch={jest.fn()}/>)
    })

    test('render search input and icon', () => {
        const input = screen.getByPlaceholderText('Search');
        expect(input).toBeInTheDocument();

        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();
    })

})
