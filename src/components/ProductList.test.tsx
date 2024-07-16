import { ProductListProps } from "../types/Products";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "./ProductList";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const mockProducts: ProductListProps['products'] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      category: 'Category 1',
      description: 'Description 1',
      image: 'image1.jpg',
      rating: {
        rate: 4.5,
        count: 10,
      },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      category: 'Category 2',
      description: 'Description 2',
      image: 'image2.jpg',
      rating: {
        rate: 4.0,
        count: 20,
      },
    },
];

describe('ProductList Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders spinner when no products are available', () => {
        render(
        <Router>
            <ProductList products={[]} />
            </Router>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('display all products correctly', () => {
        render(
            <Router>
                <ProductList products={mockProducts} />
            </Router>
        );
        mockProducts.forEach(product => {
            expect(screen.getByText(product.title)).toBeInTheDocument();
            expect(screen.getByText(`Price: $${product.price}`)).toBeInTheDocument();
            expect(screen.getByText(product.rating.rate.toString())).toBeInTheDocument();
            expect(screen.getByText(`(${product.rating.count})`)).toBeInTheDocument();
            const image = screen.getByAltText(product.title);
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', product.image);
        });
    });

    test('redirects to product detail page on product click', async() => {
        const { container } = render(
        <Router>
            <ProductList products={mockProducts} />
        </Router>
        );

        const productLink = container.querySelector('a[href="/products/1"]');
        const user = userEvent.setup();
        if (productLink) {
            user.click(productLink);
            await waitFor(() => {
            expect(window.location.pathname).toBe(`/products/1`);
            });
        } else {
            throw new Error('Product link not found');
        }

        waitFor(() => {
        expect(window.location.pathname).toBe(`/products/1`);
        });
    });

});
