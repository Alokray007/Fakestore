import { fireEvent, render, screen } from '@testing-library/react';
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

  test('renders the FAQ component with the correct number of items', () => {
    render(<Faq />);

    const faqItems = screen.getAllByRole('group');
    expect(faqItems).toHaveLength(QA.length);
  });

  test('toggle Faq Answers correctly', () => {
    render(<Faq />);

    // Initially, no answer should be visible
    QA.forEach((faq) => {
      expect(screen.getByText(faq.answer)).not.toBeVisible();
    });

    // Click on the first question to open it
    fireEvent.click(screen.getByText(QA[0].question));
    expect(screen.getByText(QA[0].answer)).toBeVisible();

    // Click on the first question again to close it
    fireEvent.click(screen.getByText(QA[0].question));
    expect(screen.queryByText(QA[0].answer)).not.toBeVisible();
  });

  test('only one FAQ answer is open at a time', () => {
    render(<Faq />);

    // Open the first question
    fireEvent.click(screen.getByText(QA[0].question));
    expect(screen.getByText(QA[0].answer)).toBeVisible();

    // Open the second question
    fireEvent.click(screen.getByText(QA[1].question));
    expect(screen.getByText(QA[1].answer)).toBeVisible();

    // The first answer should now be hidden
    expect(screen.getByText(QA[0].answer)).not.toBeVisible();
  });

});
