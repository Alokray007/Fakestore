import { render, screen } from "@testing-library/react";
import CustomSpinner from "./Spinner";

describe('CustomSpinner Component', () => {
    test('renders the spinner', () => {
        render(<CustomSpinner />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
