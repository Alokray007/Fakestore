import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";


describe('Footer Component', () => {
    test('renders the footer with all sections', () => {
        render(
          <BrowserRouter>
            <Footer />
          </BrowserRouter>
        );

        expect(screen.getByAltText('Logo')).toBeInTheDocument();

        const date = new Date();
        const currentYear = date.getFullYear();
        expect(screen.getByText(`© ${currentYear} — Alok Suman. All rights reserved`)).toBeInTheDocument();

        expect(screen.getByText(/pages/i)).toBeInTheDocument();
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/Products/i)).toBeInTheDocument();
        expect(screen.getByText(/collections/i)).toBeInTheDocument();
        expect(screen.getByText(/contact us/i)).toBeInTheDocument();

        expect(screen.getByText(/categories/i)).toBeInTheDocument();
        expect(screen.getByText(/electronics/i)).toBeInTheDocument();
        expect(screen.getByText(/jewelery/i)).toBeInTheDocument();
        expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
        expect(screen.getByText(/women's clothing/i)).toBeInTheDocument();

        expect(screen.getByLabelText(/To Newsletter/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Subscribe/i})).toBeInTheDocument();

        
    })
});
