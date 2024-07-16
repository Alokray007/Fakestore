import { render, screen, waitFor } from "@testing-library/react";
import Hero from "./Hero";
import { Pdct } from "@/types/Products";
import axios from "../../services/axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockAxios = new MockAdapter(axios);

const mockProducts: Pdct = {
  id: 1,
  title: "Product 1",
  price: 100,
  category: "Category 1",
  description: "Description 1",
  image: "image1.jpg",
  rating: {
    rate: 4.5,
    count: 10,
  },
};

describe("Hero Component", () => {
  beforeEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
    render(
      <Router>
        <Hero />
      </Router>
    );
  });

  test("renders the spinner while fetching data", () => {
    mockAxios.onGet("/products?limit=15").reply(200, []);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    mockAxios.onGet("/products?limit=15").reply(500);
    await waitFor(() => {
      expect(
        screen.getByText(/Request failed with status code/i)
      ).toBeInTheDocument();
    });
  });

  test("displays product information when fetched successfully", async () => {
    mockAxios.onGet("/products?limit=15").reply(200, [mockProducts]);
    render(
      <Router>
        <Hero />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Before they sold out")).toBeInTheDocument();
      expect(screen.getByText(mockProducts.title)).toBeInTheDocument();
    });
  });

  test("adds product to cart and shows success toast", async () => {
    mockAxios.onGet("/products?limit=15").reply(200, [mockProducts]);
    render(
      <Router>
        <Hero />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(mockProducts.title)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    user.click(screen.getByText("Add To Cart"));

    await waitFor(() => {
      expect(localStorage.getItem("cart")).toContain(JSON.stringify({ ...mockProducts, quantity: 1 }));
      expect(toast.success).toHaveBeenCalledWith("Product Added to cart");
    });
    localStorage.clear();
  });

  test('navigates to cart on "Buy Now" click', async() => {
    mockAxios.onGet("/products?limit=15").reply(200, [mockProducts]);
    render(
        <Router>
          <Hero />
        </Router>
    );

    await waitFor(() => {
        expect(screen.getByText(mockProducts.title)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    user.click(screen.getByText("Buy Now"));

    await waitFor(() =>{
        expect(localStorage.getItem('cart')).toContain(JSON.stringify({...mockProducts, quantity: 1}));
        expect(toast.success).toHaveBeenCalledWith("Product Added to cart");
        expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
    localStorage.clear();
  });

});
