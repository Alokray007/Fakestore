import { fireEvent, render, screen } from "@testing-library/react"
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

    test('allows users to fill out the form', () => {
        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Name/i), {target: {value: 'John Doe'}});
        fireEvent.change(screen.getByLabelText(/Email/i), {target: {value: 'johndoe@example.com'}});
        fireEvent.change(screen.getByLabelText(/Message/i), {target: {value: 'Hello, I need help with my project.'}});

        expect(screen.getByLabelText(/Name/i)).toHaveValue('John Doe');
        expect(screen.getByLabelText(/Email/i)).toHaveValue('johndoe@example.com');
        expect(screen.getByLabelText(/Message/i)).toHaveValue('Hello, I need help with my project.');
    });
})
