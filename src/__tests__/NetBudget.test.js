import React from 'react';
import { render } from '@testing-library/react';
import NetBudget from '../components/NetBudget';

// test pie chart renders

test('renders pie chart', () => {
  const { getByLabelText } = render(<NetBudget />);
  const pieChart = getByLabelText('pie-chart');
  expect(pieChart).toBeInTheDocument();
});
