import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Footer Component", () => {
  test("renders the footer with all sections", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    const date = new Date();
    const currentYear = date.getFullYear();
    expect(
      screen.getByText(`© ${currentYear} — Alok Suman. All rights reserved`)
    ).toBeInTheDocument();

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
    expect(
      screen.getByRole("button", { name: /Subscribe/i })
    ).toBeInTheDocument();
  });

  test("handles Subscription input", async () => {
    userEvent.setup();
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  test('navigates to correct pages when links are clicked', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    const productsLink = screen.getByText('Products');
    const collectionsLink = screen.getByText('Collections');
    const contactUsLink = screen.getByText('Contact Us');

    const electronicsLink = screen.getByText(/electronics/i)
    const jeweleryLink = screen.getByText(/jewelery/i)
    const mensclothingLink = screen.getByText("Men's Clothing")
    const womensclothingLink = screen.getByText(/women's clothing/i)

    // Verify the links have correct href attributes
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(productsLink.closest('a')).toHaveAttribute('href', '/products');
    expect(collectionsLink.closest('a')).toHaveAttribute('href', '/');
    expect(contactUsLink.closest('a')).toHaveAttribute('href', '/contactus');

    expect(electronicsLink.closest('a')).toHaveAttribute('href', '/products');
    expect(jeweleryLink.closest('a')).toHaveAttribute('href', '/products');
    expect(mensclothingLink.closest('a')).toHaveAttribute('href', '/products');
    expect(womensclothingLink.closest('a')).toHaveAttribute('href', '/products');
  });
});
