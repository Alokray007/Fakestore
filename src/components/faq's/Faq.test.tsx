import { render, screen } from '@testing-library/react';
import Faq from './Faq';
import { QA } from '../../data/QA';

describe('Faq Component', () => {
  test('renders frequently asked questions', () => {
    render(<Faq />);

    // Check if all questions are rendered
    QA.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });
});
