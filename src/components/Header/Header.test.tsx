import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { BrowserRouter as Router } from "react-router-dom";
import Logo from "../../assets/images/favicon.png";

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

})
