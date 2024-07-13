import { render, screen } from "@testing-library/react"
import Contact from "./Contact"


describe('Contact Component', () => {
    test('renders the contact form and map', () => {
        render(<Contact />)

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

        expect(screen.getByTitle(/map/i)).toBeInTheDocument();
    });
})
