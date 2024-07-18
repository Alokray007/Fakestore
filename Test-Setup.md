# Testing Documentation

## Overview

The FakeStore project uses Jest and React Testing Library (RTL) for testing. Jest is a robust testing framework that works well with React applications, while RTL provides utilities to test React components in a user-centric manner. This documentation provides a detailed guide on how to write, run, and generate reports for tests in the FakeStore project.

## Prerequisites

Ensure you have the necessary dependencies installed. The relevant dependencies for testing are:

* jest
* @testing-library/react
* @testing-library/jest-dom
* @testing-library/user-event
* jest-environment-jsdom
* ts-jest
* axios-mock-adapter
* msw
* jest-html-reporter (for generating HTML reports)

These should already be included in your package.json under devDependencies.

## Writing Tests

Tests are typically located in the same directory as the component they are testing, with a .test.tsx or .test.ts extension.

Example: Component Test
Here’s an example test for a ProductDetails component:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import MockAdapter from 'axios-mock-adapter';
import ProductDetails from './ProductDetails';
import { Pdct } from '../../types/Products';
import userEvent from '@testing-library/user-event';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
const mockAxios = new MockAdapter(axios);

// Mock useParams to return the id
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

const mockProduct: Pdct = {
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
};

const renderComponent = () => render(<Router><ProductDetails /></Router>);

describe('ProductDetails Page', () => {


  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
    localStorage.clear();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  test('renders spinner when no products are available', () => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  })

  test('handles error Properly', async() => {
    mockAxios.onGet('/products/1').reply(500);
    renderComponent();

    await waitFor(() => {
        expect(screen.getByText('Request failed with status code 500')).toBeInTheDocument()
    });
  });

  test('adds product to the cart', async() => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByText('Add to Cart'));

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(mockProduct.id);
    expect(cart[0].quantity).toBe(1);

    expect(toast.success).toHaveBeenCalledWith('Product Added to cart');
  });

  test('navigates to cart on "Buy Now" click', async() => {
    mockAxios.onGet('/products/1').reply(200, mockProduct);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByText('Buy Now'));

    await waitFor(() =>{
        expect(toast.success).toHaveBeenCalledWith("Product Added to cart");
        expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(mockProduct.id);
    expect(cart[0].quantity).toBe(1);
  });
});
```
## Running Tests

To run the test suite, execute the following command:

```bash
npm test
```

This will run all tests and provide output in the terminal.

## Generating Code Coverage Reports

You can generate code coverage reports to see how much of your code is covered by tests. Use the following command:

```bash
npm run coverage
```

This will generate a code coverage report in the coverage directory. You can open the index.html file in this directory to view the report in your browser.

## Generating Test Reports

To generate HTML test reports, you can use jest-html-reporter. First, install the package:

```bash
npm install jest-html-reporter --save-dev
```

Then, add the following configuration to your package.json under the jest key:

```json
"jest": {
  "reporters": [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "./test-report.html",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ]
}
```

Now, when you run your tests using npm test, an HTML report will be generated at the specified outputPath (e.g., ./test-report.html). You can open this file in your browser to view the detailed test report.

## Mocking HTTP Requests

The project uses axios-mock-adapter and msw (Mock Service Worker) for mocking HTTP requests in tests.

Example: Mocking with axios-mock-adapter
```typescript
import axios from '../../services/axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

// Mock a GET request to /products/1
mockAxios.onGet('/products/1').reply(200, {
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
});
```

Example: Mocking with msw

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/products/1', (req, res, ctx) => {
    return res(
      ctx.json({
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
      })
    );
  })
);
```

// Start the server before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Stop the server after all tests
afterAll(() => server.close());

## Conclusion

This documentation covers the basics of writing, running, and generating reports for tests in the FakeStore project. For more advanced usage and configuration, refer to the official documentation of Jest and React Testing Library. Happy testing!
