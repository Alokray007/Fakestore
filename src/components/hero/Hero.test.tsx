import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { Pdct } from "@/types/Products";
import axios from "../../services/axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";


// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
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

  test('renders the spinner while fetching data', () => {
    mockAxios.onGet('/products?limit=15').reply(200,[]);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })

});
