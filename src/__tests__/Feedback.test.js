import React from 'react';
import { render } from '@testing-library/react';
import Feedback from '../components/Feedback';

describe('Feedback component when passed list of objects and empty list', () => {

  // testing for sentiment data displayed
  test('renders sentiment text', () => {
    const mockItem = [
      { id: 1, rating: 1, comment: "Great article!" },
      { id: 2, rating: 2, comment: "Not helpful" }
    ];
    const { getByTestId } = render(<Feedback item={mockItem} />);
    const sentimentText = getByTestId('sentimenttxt');
    expect(sentimentText).toBeInTheDocument();
  });

  // testing that feedback is hidden
  test('renders no text', () => {
    const mockItem = [];
    const { getByTestId } = render(<Feedback item={mockItem} />);
    const noText = getByTestId('notxt');
    expect(noText).toBeInTheDocument();
  });
});
