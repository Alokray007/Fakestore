import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { BrowserRouter as Router } from "react-router-dom";
import Logo from "../../assets/images/favicon.png";
import userEvent from "@testing-library/user-event";

describe('Header Component', () => {
    beforeEach(() => {
        render(
          <Router>
            <Header />
          </Router>
        );
      });

    test('renders the logo with correct alt text', () => {
        expect(screen.getByAltText('Logo')).toBeInTheDocument();
        expect(screen.getByAltText('Logo')).toHaveAttribute('src', Logo);
    })

    test('renders navigation links', () => {
        const navLinks = ['Home', 'Products', 'Collections', 'Contact Us'];
        navLinks.forEach(link => {
            expect(screen.getByText(link)).toBeInTheDocument();
        })
    })

    test('renders cart icon', () => {
        const cartIcon = screen.getAllByLabelText(/cart/i);
        expect(cartIcon.length).toBeGreaterThan(0);
    })

    test('opens and closes the mobilemenu', async() => {
        userEvent.setup();
        const menuButton = screen.getByRole('button');
        await userEvent.click(menuButton);

        const mobileMenuLinks = screen.getByTestId('mobile-menu');
        expect(mobileMenuLinks).toBeVisible();

        await userEvent.click(menuButton);
        expect(mobileMenuLinks).not.toBeVisible();
    })

})
