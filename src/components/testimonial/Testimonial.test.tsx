import { render, screen } from "@testing-library/react";
import Testimonial from "./Testimonial";

describe("Testimonial Component", () => {
  beforeEach(() => {
    render(<Testimonial />);
  });

  test("renders all testimonial Element", () => {
    const testimonials = [
      {
        name: "Smitha Gowda",
        location: "Chennai",
        text: "I recently bought a few items from Fakestore, and I couldn't be happier with my purchase! The product quality exceeded my expectations, and the customer service was outstanding. I highly recommend this store to anyone looking for great deals.",
      },
      {
        name: "Niraj Kumar",
        location: "Bangalore",
        text: "Fakestore has become my go-to place for online shopping. The website is easy to navigate, the prices are unbeatable, and the shipping is always fast. I especially appreciate the wide range of products available. Keep up the excellent work!",
      },
      {
        name: "Manoj Singh",
        location: "Delhi",
        text: "Shopping at Fakestore has been a fantastic experience. The product descriptions are accurate, the images are clear, and the checkout process is smooth. I've recommended this store to all my friends and family, and they love it too!",
      },
    ];

    testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(screen.getByText(testimonial.location)).toBeInTheDocument();
      expect(screen.getByText(testimonial.text)).toBeInTheDocument();
    });
  });

  test('renders testimonial images', () => {
    const images = screen.getAllByAltText('testimonial')
    expect(images).toHaveLength(3);
    images.forEach(img => {
      expect(img).toBeInTheDocument();
    })
  })
});
