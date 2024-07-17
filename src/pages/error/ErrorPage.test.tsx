import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";


describe('Error Page', () => {
    test('renders error page component', () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );
        expect(screen.getByText('Uh-oh!')).toBeInTheDocument();
        expect(screen.getByText('Go Back Home')).toBeInTheDocument();
    });
});
